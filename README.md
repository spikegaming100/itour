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
npm run build    # сборка в dist/
npm run preview  # локальный просмотр собранной версии
npm run lint     # проверка ESLint
```

## Деплой

Пуш в ветку `master` запускает GitHub Actions workflow `.github/workflows/deploy.yml`,
который собирает проект и публикует папку `dist` на GitHub Pages
(https://spikegaming100.github.io/itour/).

Проект использует `HashRouter`, поэтому прямые ссылки вида
`https://spikegaming100.github.io/itour/#/sri` работают без серверных rewrite-правил.
