# rentrax

The project is built with Vue 3 and Vite, and all the core logic is implemented in JavaScript.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 🧪 Mock API (MSW)

This project uses [MSW (Mock Service Worker)](https://mswjs.io/) to simulate backend APIs during development.

- ✅ No need to set up or run a separate mock server.
- 🚀 The mock service worker starts **automatically** when the app runs in development mode.

### Available Endpoints

#### `/taxes`

RESTful API for a list of tax objects.

- `GET /taxes` – Get all tax items
- `POST /taxes` – Add a new tax item
- `PUT /taxes/:id` – Update a tax item
- `DELETE /taxes/:id` – Delete a tax item

#### `/price-names`

RESTful API for a list of primitive string values.

- `GET /price-names` – Get all price names
- `POST /price-names` – Add a new price name
- `DELETE /price-names/:index` – Delete a price name by index
