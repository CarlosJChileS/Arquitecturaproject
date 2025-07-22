# LearnPro

Simple subscription-based learning platform using a modular architecture. The project is a small
Node.js proof of concept that exposes various feature modules and a React front-end.

## Structure

```
api-gateway/
    index.js                # Express entry point
    public/                 # React front-end
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
database/
```

- **api-gateway/** hosts the Express application and serves the different feature modules.
- **public/** inside `api-gateway` contains the Vite React front-end.
- **core/** now holds the domain models and application services used by the feature modules.
- **modules/** groups the feature routes for auth, products, payments and notifications.
- **shared/** holds common middleware, utilities and patterns.
- **docker/** can be used for containerisation files.
- **database/** includes the `supabase-schema.sql` file with the normalized
  PostgreSQL tables used by the project.

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

## Running with Docker

The provided `Dockerfile` builds the React front-end and bundles it with the
Express API so both run in a single container. To build and run:

```bash
docker build -t learnpro -f docker/Dockerfile .
docker run -p 3000:3000 learnpro
```

The application will be available on `http://localhost:3000`.
