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

- Check if `android/app/release.keystore` exists
- Generate a new keystore if missing using Java's keytool
- Commit the keystore to the repository

### Triggering the Workflow

The workflow runs automatically when:
- You push to the `main` branch and the keystore is missing
- Manually triggered from the GitHub Actions tab

### Security Considerations

⚠️ **Important Security Notes:**

- The keystore contains sensitive signing information
- Default password is `android123` (change this in production)
- Set `KEYSTORE_PASSWORD` as a repository secret for production use
- Consider encrypting the keystore or using a different approach for production builds

To set a custom keystore password, add `KEYSTORE_PASSWORD` as a repository secret in GitHub.
