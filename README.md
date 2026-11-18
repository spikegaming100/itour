# ITour

Сайт о промышленном туризме: научно-исследовательские институты, конструкторские бюро, наукограды, музеи и готовые маршруты.

Проект собран на [Vite](https://vite.dev) + [React](https://react.dev) + [React Router](https://reactrouter.com) + [Tailwind CSS 4](https://tailwindcss.com).

## Запуск

```bash
npm install
npm run dev
```

Откройте адрес, который выведет Vite (по умолчанию http://localhost:5173).

## Сборка

```bash
npm run build    # сборка для GitHub Pages (base /itour/) в dist/
npm run preview  # локальный просмотр собранной версии
npm run lint     # проверка ESLint
```

## Деплой на nginx

Для размещения в корне сайта (например, `https://itour.ru/`):

```bash
npm ci
npm run build:nginx          # сборка с base "/" в dist/
npm run preview:nginx        # проверка собранной версии локально
```

Скопируйте содержимое `dist/` на сервер и используйте конфиг
[`deploy/nginx.conf`](deploy/nginx.conf) (root, try_files, gzip и кэширование
ассетов). Либо используйте готовый установщик [`deploy/deploy.sh`](deploy/deploy.sh):

```bash
# на локальной машине
scp itour-nginx.tar.gz root@<server-ip>:/root/

# на сервере
mkdir -p /opt/itour && tar -xzf /root/itour-nginx.tar.gz -C /opt/itour
cd /opt/itour
DOMAIN=itour.example.com bash deploy.sh
# HTTPS:
DOMAIN=itour.example.com EMAIL=me@example.com bash deploy.sh --tls
```

`deploy.sh` сам ставит nginx (если его нет), публикует `site/` в
`/var/www/itour`, пишет конфиг, проверяет `nginx -t` и перезагружает сервис.
Чужие конфиги nginx, включая selfsteal от remnanode, он не изменяет.

> Важно: сборка `npm run build` предназначена для GitHub Pages и ссылается на
> `/itour/assets/...`. При заливке такой сборки в корень сервера страница будет
> пустой — для своего сервера нужна именно `npm run build:nginx`.

### Если на сервере стоит remnanode

`bash <(curl -Ls .../remnanode.sh) @ install` — это установщик ноды Remnawave
(VPN/Xray в Docker), а не веб-сервер: статический сайт он не раздаёт. Порты
80/443 при этом могут быть заняты selfsteal/Xray. В таком случае:

```bash
# посмотреть, кто занял порты
ss -tlnp | grep -E ':80|:443'
docker ps

# если 80 занят — поднять сайт на свободном порту
PORT=8080 bash deploy.sh
```

## Деплой на GitHub Pages

Пуш в ветку `master` запускает GitHub Actions workflow `.github/workflows/deploy.yml`,
который собирает проект и публикует папку `dist` на GitHub Pages
(https://spikegaming100.github.io/itour/).

Проект использует `HashRouter`, поэтому прямые ссылки вида
`https://spikegaming100.github.io/itour/#/sri` работают без серверных rewrite-правил.
