# Deploying to Google Cloud Run

These files provide a simple setup for deploying the monolithic container (which serves both the Express API and React front-end) to **Google Cloud Run** using Cloud Build.

1. Enable Cloud Run and Cloud Build in your Google Cloud project.
2. Set up Artifact Registry or Container Registry permissions so Cloud Build can push images.
3. Trigger a build using the `cloudbuild.yaml` file. This will:
   - Build the Docker image using `docker/Dockerfile`.
   - Push the image to `gcr.io/$PROJECT_ID`.
   - Deploy it to Cloud Run as `learnpro-service` in region `us-central1`.

The service will expose both the API and the front-end on the same endpoint.

To trigger the build manually:

```bash
gcloud builds submit --config deployments/google-cloud/cloudbuild.yaml .
```

After deployment, Cloud Run will output the service URL. Navigate to that URL to access the application.
