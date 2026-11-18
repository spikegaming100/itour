#!/usr/bin/env bash
# ITour — публикация статического сайта на nginx.
#
# Запуск на сервере от root из распакованного архива:
#   bash deploy.sh
#   DOMAIN=itour.example.com bash deploy.sh
#   DOMAIN=itour.example.com EMAIL=me@example.com bash deploy.sh --tls
#   PORT=8080 bash deploy.sh
#
# Переменные:
#   DOMAIN  — домен сайта (по умолчанию "_" — доступ по IP)
#   PORT    — порт nginx (по умолчанию 80)
#   WWW_DIR — каталог сайта (по умолчанию /var/www/itour)
#   EMAIL   — почта для Let's Encrypt (нужна с --tls)
#
# Скрипт идемпотентен: сайт перезаписывается, конфиг nginx обновляется,
# чужие site-конфиги (в том числе remnanode/selfsteal) не трогаются.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="${SITE_DIR:-$HERE/site}"
WWW_DIR="${WWW_DIR:-/var/www/itour}"
PORT="${PORT:-80}"
DOMAIN="${DOMAIN:-_}"
EMAIL="${EMAIL:-}"
ENABLE_TLS=0

for arg in "$@"; do
  case "$arg" in
    --tls)
      ENABLE_TLS=1
      ;;
    -h|--help)
      sed -n '2,20p' "$0"
      exit 0
      ;;
    *)
      echo "Неизвестный аргумент: $arg (см. --help)" >&2
      exit 1
      ;;
  esac
done

log() { printf '\033[1;32m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33mWARN:\033[0m %s\n' "$*"; }
die() { printf '\033[1;31mERROR:\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "запустите от root: sudo bash deploy.sh"
[ -f "$SITE_DIR/index.html" ] || die "не найден $SITE_DIR/index.html — распакуйте архив целиком (site/ должен лежать рядом с deploy.sh)"

pkg_install() {
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update -qq
    DEBIAN_FRONTEND=noninteractive apt-get install -y -qq "$@"
  elif command -v dnf >/dev/null 2>&1; then
    dnf install -y -q "$@"
  elif command -v yum >/dev/null 2>&1; then
    yum install -y -q "$@"
  elif command -v apk >/dev/null 2>&1; then
    apk add --no-cache "$@"
  else
    die "не удалось определить пакетный менеджер (apt/dnf/yum/apk)"
  fi
}

# --- nginx -----------------------------------------------------------------
if ! command -v nginx >/dev/null 2>&1; then
  log "nginx не найден — устанавливаю"
  pkg_install nginx
fi
command -v nginx >/dev/null 2>&1 || die "nginx не установился"

# Дефолтную страницу дистрибутива убираем, иначе по IP будет открываться она,
# а не сайт. Чужие конфиги (remnanode/selfsteal и т.п.) не трогаем.
for stock in /etc/nginx/sites-enabled/default /etc/nginx/conf.d/default.conf; do
  if [ -f "$stock" ] && grep -qE 'root[[:space:]]+/var/www/html' "$stock" 2>/dev/null; then
    rm -f "$stock"
    log "отключил стандартную страницу nginx: $stock"
  fi
done

if [ -d /etc/nginx/sites-available ] && grep -q 'sites-enabled' /etc/nginx/nginx.conf 2>/dev/null; then
  CONF_FILE="/etc/nginx/sites-available/itour.conf"
  mkdir -p /etc/nginx/sites-enabled
  ln -sf "$CONF_FILE" /etc/nginx/sites-enabled/itour.conf
else
  mkdir -p /etc/nginx/conf.d
  CONF_FILE="/etc/nginx/conf.d/itour.conf"
fi

# Если на этом порту уже есть чужой default_server, не добавляем второй
# (nginx -t упадёт). Тогда сайт будет доступен по DOMAIN, а не по IP.
has_default=0
for conf in /etc/nginx/nginx.conf /etc/nginx/conf.d/*.conf /etc/nginx/sites-enabled/*; do
  [ -f "$conf" ] || continue
  [ "$conf" = "$CONF_FILE" ] && continue
  case "$conf" in
    */itour.conf) continue ;;
  esac
  if grep -qE "listen[^;]*[^0-9]${PORT}([^0-9]|;)[^;]*default_server" "$conf" 2>/dev/null; then
    has_default=1
    break
  fi
done

if [ "$has_default" -eq 1 ]; then
  LISTEN="listen ${PORT};"
  warn "на порту ${PORT} уже есть default_server — отдаю сайт по имени '${DOMAIN}'"
else
  LISTEN="listen ${PORT} default_server;"
fi

# --- файлы сайта -----------------------------------------------------------
log "публикую сайт в $WWW_DIR"
mkdir -p "$WWW_DIR"
find "$WWW_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
cp -a "$SITE_DIR"/. "$WWW_DIR"/
chown -R root:root "$WWW_DIR" 2>/dev/null || true
chmod -R a+rX "$WWW_DIR"

# --- конфиг nginx ----------------------------------------------------------
log "пишу конфиг $CONF_FILE"
cat > "$CONF_FILE" <<EOF
# ITour — сгенерировано deploy.sh
server {
    ${LISTEN}
    server_name ${DOMAIN};

    root ${WWW_DIR};
    index index.html;
    charset utf-8;

    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        application/javascript
        application/json
        image/svg+xml
        font/ttf;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
EOF

# --- проверка и перезапуск -------------------------------------------------
if command -v ss >/dev/null 2>&1; then
  busy="$(ss -tlnp 2>/dev/null | awk -v p=":${PORT}" '$4 ~ (p "$")' | head -1 || true)"
  if [ -n "$busy" ] && ! printf '%s' "$busy" | grep -q nginx; then
    warn "порт ${PORT} занят не nginx: ${busy}"
    warn "если это remnanode/selfsteal — он обычно уже работает через nginx, продолжаю"
    warn "иначе выберите другой порт: PORT=8080 bash deploy.sh"
  fi
fi

nginx -t || die "конфиг nginx не прошёл проверку (см. ошибку выше)"

if command -v systemctl >/dev/null 2>&1 && systemctl list-unit-files 2>/dev/null | grep -q '^nginx\.service'; then
  systemctl enable nginx >/dev/null 2>&1 || true
  systemctl reload nginx 2>/dev/null || systemctl restart nginx || die "не удалось перезапустить nginx (порт ${PORT} занят?)"
else
  nginx -s reload 2>/dev/null || nginx || die "не удалось запустить nginx"
fi
log "nginx перезагружен"

# --- firewall --------------------------------------------------------------
if command -v ufw >/dev/null 2>&1 && ufw status 2>/dev/null | grep -q 'Status: active'; then
  ufw allow "${PORT}/tcp" >/dev/null 2>&1 || true
  if [ "$ENABLE_TLS" -eq 1 ]; then
    ufw allow 80/tcp >/dev/null 2>&1 || true
    ufw allow 443/tcp >/dev/null 2>&1 || true
  fi
  log "правила ufw для порта ${PORT} добавлены"
fi

# --- TLS -------------------------------------------------------------------
if [ "$ENABLE_TLS" -eq 1 ]; then
  [ "$DOMAIN" != "_" ] || die "для --tls нужен DOMAIN, например: DOMAIN=itour.example.com bash deploy.sh --tls"
  if ! command -v certbot >/dev/null 2>&1; then
    log "устанавливаю certbot"
    if command -v apt-get >/dev/null 2>&1 || command -v dnf >/dev/null 2>&1 || command -v yum >/dev/null 2>&1; then
      pkg_install certbot python3-certbot-nginx
    else
      pkg_install certbot certbot-nginx
    fi
  fi
  log "выпускаю сертификат Let's Encrypt для $DOMAIN"
  if [ -n "$EMAIL" ]; then
    certbot --nginx -d "$DOMAIN" -m "$EMAIL" --agree-tos --non-interactive --redirect
  else
    certbot --nginx -d "$DOMAIN" --register-unsafely-without-email --agree-tos --non-interactive --redirect
  fi
fi

# --- итог ------------------------------------------------------------------
IP="$(curl -4 -s --max-time 5 ifconfig.io 2>/dev/null || true)"
if [ "$ENABLE_TLS" -eq 1 ]; then
  URL="https://${DOMAIN}"
elif [ "$DOMAIN" != "_" ]; then
  URL="http://${DOMAIN}"
else
  URL="http://${IP:-<ip-сервера>}"
fi
if [ "$PORT" != "80" ] && [ "$ENABLE_TLS" -eq 0 ]; then
  URL="${URL}:${PORT}"
fi

if command -v curl >/dev/null 2>&1; then
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 8 -H "Host: ${DOMAIN}" "http://127.0.0.1:${PORT}/" 2>/dev/null || true)"
  log "локальная проверка: HTTP ${code:-нет ответа}"
  [ "$code" = "200" ] || warn "локальная проверка вернула не 200 — проверьте: nginx -t; ss -tlnp | grep ${PORT}; tail -n 50 /var/log/nginx/error.log"
fi

log "готово: $URL"
