# LearnPro

Simple subscription-based learning platform built as a **modular monolith**. All
back‑end features live in a single Node.js application but are grouped by module
(auth, products, payments, notifications). This keeps deployment simple while
still enforcing separation of concerns, so a microservices approach is not
required for the current scale.

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

### Running tests

```bash
npm test
```

This executes the Jest test suite.

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

### Running with Docker Compose

For local development the repository also includes a `docker-compose.yml` file
which spins up the application using the same Dockerfile:

```bash
docker compose up --build
```

This exposes the API on port `3000`.

## Using Supabase locally

The project can connect to a Supabase backend. A convenience client is provided in `shared/utils/supabaseClient.js` which reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the environment. You can run a full Supabase stack locally using the [Supabase CLI](https://supabase.com/docs/guides/cli). After installing the CLI, start the services:

```bash
supabase start
```

This command launches a local Postgres instance and prints connection credentials. Set the `SUPABASE_URL` and `SUPABASE_ANON_KEY` variables before starting the API gateway so it connects to your local stack:

```bash
export SUPABASE_URL=http://localhost:54321
export SUPABASE_ANON_KEY=your-local-anon-key
npm start
```

To use a hosted Supabase project instead, set the same environment variables to your project's URL and API key. The server will then connect to the remote backend.

## Environment variables

Create a `.env` file in the project root containing the following keys:

- `SUPABASE_URL` and `SUPABASE_ANON_KEY` – Supabase connection details.
- `SUPABASE_SERVICE_ROLE_KEY` – service role key for privileged operations.
- `ADMIN_EMAILS` – comma-separated list of administrator emails.
- `PORT` – port for the API gateway (defaults to `3000`).
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` – database connection information.
- `ADMIN_ACCOUNTS` – optional `email:password` pairs for initial admin accounts.

See `.env` for an example configuration.

## Design Patterns

The project illustrates several classic design patterns:

- **Singleton** – the Supabase client is created once in
  `shared/utils/supabaseClient.js` and reused across the app.
- **Factory Method** – `PaymentFactory` instantiates the required payment
  processor (Stripe or PayPal) depending on the caller.
- **Strategy** – payment processors implement a common interface and are used
  through `PaymentContext` to allow different checkout strategies.
- **Repository** – all course persistence logic lives inside
  `CourseRepository`, providing a single access point for the service layer.

## Continuous Integration and Deployment

GitHub Actions (`.github/workflows/ci.yml`) runs the Jest tests and builds the
Docker image on every push or pull request. The workflow only verifies that the
application and Docker image build correctly and does not perform any automatic
deployment.

## Cloud Deployment

Applications can be deployed to any provider capable of running a Docker
container. For Google Cloud Run, a simple Cloud Build configuration is provided
under `deployments/google-cloud`.

### Deploying to Google Cloud Run

The directory `deployments/google-cloud` contains a `cloudbuild.yaml` file that
builds the Docker image defined in `docker/Dockerfile`, pushes it to Google
Container Registry and deploys it to **Cloud Run**. Both the Express API and the
React front-end run from the same container.

To deploy using the Google Cloud CLI:

```bash
gcloud builds submit --config deployments/google-cloud/cloudbuild.yaml .
```

Once the build completes, Cloud Run prints the service URL where the application
is available.
