# Портфолио Сергея Рудакова

Сайт-портфолио продуктового дизайнера на Next.js 15 + Tailwind. Готов к статическому экспорту и публикации на GitHub Pages.

## Быстрый старт

```bash
# 1. Установить зависимости (Node 20+ или 22 LTS)
npm install

# 2. Сжать тяжёлые скрины (один раз — снижает 360 MB до десятков MB)
npm run optimize-images

# 3. Локальная разработка
npm run dev
# → открой http://localhost:3000

# 4. Собрать статику для GitHub Pages
npm run build
# результат в /out
```

## Структура

```
app/                       — App Router
  page.tsx                 — главная (Hero, проекты, About, контакты)
  projects/[slug]/page.tsx — динамический шаблон кейсов
  layout.tsx               — корневой layout, шрифты, метаданные
  globals.css              — глобальные стили, анимации
components/                — переиспользуемые блоки
lib/projects.ts            — данные кейсов (HealthFit, ProVino, View, Славянка, Place Bureau)
lib/site.ts                — общие данные (имя, контакты, ссылки)
public/                    — статика
  CV_RudakovSA.pdf         — CV (CTA «Скачать CV»)
  projects/<slug>/*.png    — скриншоты кейсов
scripts/optimize-images.mjs — sharp-скрипт для in-place оптимизации PNG
next.config.mjs            — output: 'export', basePath из ENV
```

## CTA

На главной и на странице каждого кейса — две кнопки:

- **Telegram** → `https://t.me/rudakov_sa`
- **Скачать CV** → `/CV_RudakovSA.pdf`

Меняются в `lib/site.ts`.

## Деплой на GitHub Pages

### Вариант А — кастомный домен (с reg.ru) — рекомендуется
1. `npm run build` → получится папка `out/`.
2. В корне `public/` создай файл `CNAME` с одной строкой: `твойдомен.ru`.
3. Запушь `out/` на ветку `gh-pages` (или используй GitHub Action — см. ниже).
4. В настройках репозитория: Pages → Source: `gh-pages`, кастомный домен.
5. В reg.ru пропиши DNS-запись (A или CNAME) согласно [инструкции GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

`basePath` оставить пустым (по умолчанию).

### Вариант Б — `username.github.io/portfolio` (без своего домена)
Запускай билд с переменной:
```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

### GitHub Action для автодеплоя
Опционально создай `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Контент

Чтобы добавить или поменять кейс — открой `lib/projects.ts`:
- `slug` — URL (например `/projects/healthfit`)
- `sections` — массив блоков: `text`, `list`, `hypotheses`, `gallery`
- картинки лежат в `public/projects/<slug>/N.png`

## Технологии

- Next.js 15 (App Router, `output: 'export'`)
- React 19
- TypeScript (strict)
- Tailwind CSS 3
- next/font (Inter + Manrope + JetBrains Mono, локально инлайнятся при билде)
- sharp для оптимизации изображений
