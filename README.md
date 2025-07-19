# LearnPro

Simple subscription-based learning platform using a modular architecture. The project is a small
Node.js proof of concept that exposes various feature modules and a React front-end.

## Structure

```
api-gateway/
    index.js                # Express entry point
    public/                 # React front-end (moved from `frontend`)
core/
    domain/
    application/
    infrastructure/
modules/
    auth/
    products/
    payments/
    notifications/
shared/
    middleware/
    utils/
    patterns/
docker/
```

- **api-gateway/** hosts the Express application and serves the different feature modules.
- **public/** inside `api-gateway` contains the Vite React front-end that was previously in `frontend`.
- **core/** lays out the domain, application and infrastructure layers (currently empty).
- **modules/** groups the feature routes for auth, products, payments and notifications.
- **shared/** holds common middleware, utilities and patterns.
- **docker/** can be used for containerisation files.

## Running the backend

Install dependencies and start the API gateway:

```bash
npm install
npm start
```

The server runs on port `3000` by default.

## Running the front-end

The React client lives inside `api-gateway/public`. To run it in development mode:

```bash
cd api-gateway/public
npm install
npm run dev
```

This launches the Vite dev server.
