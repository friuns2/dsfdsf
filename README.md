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

This project includes a GitHub Action to create and distribute Android keystores via GitHub Releases.

### Keystore Release Creation

The workflow `.github/workflows/create-keystore.yml` creates secure keystore releases:

- Generates a new RSA 2048-bit keystore using Java's keytool
- Creates a compressed archive of the keystore
- Publishes it as a GitHub Release with download links
- Includes detailed usage instructions in the release notes

### Manual Trigger

The workflow runs only on manual trigger from the GitHub Actions tab:

- Go to **Actions** → **Create Android Keystore Release**
- Click **"Run workflow"**
- Optionally customize the release tag and keystore password
- The keystore will be created and uploaded to a new GitHub release

### Security Benefits

✅ **Better Security Approach:**
- Keystore is not committed to source code repository
- No sensitive files in git history
- Downloadable only when needed via GitHub releases
- Release management provides version control for keystores

### Setup

**Optional Configuration:**
- Add `KEYSTORE_PASSWORD` as a repository secret in GitHub for custom password
- Default password is `'android123'` if no secret is set
- Workflow has permissions to create releases automatically
