<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1pbt4C7cz5i32KVfZCavqF9tKEvjlersl

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Android Deployment

This app can be built as an Android app using Capacitor.

### Prerequisites for Android builds:
- Android Studio installed
- Android SDK configured
- Java JDK 17+

### Building for Android:

1. Build the web app:
   ```bash
   npm run build
   ```

2. Add Android platform:
   ```bash
   npx cap add android
   ```

3. Sync with Android:
   ```bash
   npx cap sync android
   ```

4. Open in Android Studio:
   ```bash
   npx cap open android
   ```

### Keystore Management

For publishing Android apps, you need a signing keystore. This repository includes automated keystore creation:

#### Option 1: GitHub Actions (Recommended for CI/CD)
- Go to GitHub Actions → "Create and Publish Keystore"
- Click "Run workflow" and fill in the required parameters
- The keystore will be created and uploaded to a GitHub release

#### Option 2: Local Keystore Generation
```bash
# Generate keystore locally (for development/testing)
./scripts/create-keystore.sh [alias] [store_password] [key_password]

# Or with default values:
./scripts/create-keystore.sh
```

**⚠️ Security Warning:** Never commit keystore files or passwords to version control. Use GitHub Secrets for production deployments.
