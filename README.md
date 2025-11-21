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

## Android Build

This project includes automated Android App Bundle (AAB) generation for Google Play Store distribution.

### Automated Builds
- Every push to `main` automatically builds a signed AAB bundle
- Download the latest release from the [Releases page](../../releases)
- See [ANDROID_BUILD_SETUP.md](ANDROID_BUILD_SETUP.md) for detailed setup instructions

### First-Time Setup
1. Push to main or manually trigger the workflow
2. Check the workflow logs for keystore secrets
3. Add the secrets to GitHub Actions (Settings > Secrets and variables > Actions)
4. Subsequent builds will use the same keystore for consistent app signing

See [ANDROID_BUILD_SETUP.md](ANDROID_BUILD_SETUP.md) for complete instructions.
