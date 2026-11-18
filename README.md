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
ассетов). Пример:

```bash
rsync -av --delete dist/ user@server:/var/www/itour/
```

## Деплой на GitHub Pages

Пуш в ветку `master` запускает GitHub Actions workflow `.github/workflows/deploy.yml`,
который собирает проект и публикует папку `dist` на GitHub Pages
(https://spikegaming100.github.io/itour/).

Проект использует `HashRouter`, поэтому прямые ссылки вида
`https://spikegaming100.github.io/itour/#/sri` работают без серверных rewrite-правил.
