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

## Android Keystore Management

This project includes a GitHub Action to automatically create and manage the Android keystore for APK signing.

### Automatic Keystore Creation

The workflow `.github/workflows/create-keystore.yml` will:

- Check if `release.keystore` exists in the root directory
- Generate a new keystore if missing using Java's keytool
- Commit the keystore to the repository

### Automatic Execution

The workflow runs automatically on:
- All pushes to the `main` branch
- All pull requests targeting the `main` branch
- Manual trigger from the GitHub Actions tab

This ensures the Android keystore is always available for builds and deployments.

### Security Considerations

⚠️ **Important Security Notes:**

- The keystore contains sensitive signing information
- Default password is `android123` (change this in production)
- Set `KEYSTORE_PASSWORD` as a repository secret for production use
- Consider encrypting the keystore or using a different approach for production builds

**Required Setup:**
- Add `KEYSTORE_PASSWORD` as a repository secret in GitHub (optional - defaults to 'android123')
- The workflow automatically has write permissions to commit the keystore
