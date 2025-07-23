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

The server runs on port `8080` by default.

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
Express API using a multi-stage build so the final image only contains the
production files. Ensure you build from the repository root so the Docker
context includes the frontend sources. To build and run:

```bash
docker build -t learnpro .
docker run -p 8080:8080 learnpro
```

The Dockerfile copies `.env.example` by default. Provide a custom file with
`--build-arg ENV_FILE=.env` if needed.

The application will be available on `http://localhost:8080`.

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

Create a `.env` file in the project root containing the following keys when running locally. You can use `.env.example` as a starting point:

- `SUPABASE_URL` and `SUPABASE_ANON_KEY` – Supabase connection details.
- `SUPABASE_SERVICE_ROLE_KEY` – service role key for privileged operations.
- `ADMIN_EMAILS` – comma-separated list of administrator emails.
- `PORT` – port for the API gateway (defaults to `8080`).
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` – database connection information.
- `ADMIN_ACCOUNTS` – optional `email:password` pairs for initial admin accounts.
- `STRIPE_SECRET_KEY` – secret key used to create checkout sessions.
- `STRIPE_WEBHOOK_SECRET` – signing secret to verify Stripe webhooks.


See `.env.example` for an example configuration. When running the Docker container in production you can provide these variables using your orchestrator (for example Cloud Run or `docker run -e`).

## Course management

Administrators can create and manage courses. To perform `POST`, `PUT` or `DELETE`
requests on `/products` endpoints the client must include the header
`x-user-role: admin`. Each course is linked to a subscription plan through the
`plan` field so users only see courses available for the plan from their active
subscription.

Admins can now manage user subscriptions through the `/subscriptions` API.  The
following endpoints require an `x-user-role: admin` header:

```
PUT /subscriptions/:id     # update plan, status or dates
DELETE /subscriptions/:id  # remove a subscription
```

All users (including admins) can retrieve subscriptions with:

```
GET /subscriptions/:id
```

These changes ensure admins share the same subscriptions as regular users and
any modifications are immediately visible through the API.

## Stripe payments

The `/payments/stripe` endpoint now delegates checkout session creation to a
Supabase Edge Function. Stripe will call `/payments/stripe/webhook` for events
using the signing secret defined in `STRIPE_WEBHOOK_SECRET`.
