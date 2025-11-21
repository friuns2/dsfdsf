# Android Bundle Build Setup

This guide explains how to set up the automated Android App Bundle (AAB) build for Google Play Store.

## How It Works

The GitHub Action workflow automatically:
1. Builds your React app
2. Creates a Capacitor Android project
3. Generates or reuses a signing keystore
4. Builds a signed AAB bundle for Google Play
5. Also builds a debug APK for testing

## First-Time Setup

On the **first build**, the workflow will generate a new keystore and display the secrets in the build logs.

### Steps to Configure:

1. **Trigger the first build** by pushing to main or manually running the workflow
2. **Check the build logs** for warnings showing the generated secrets
3. **Add the secrets to GitHub**:
   - Go to: `Settings` > `Secrets and variables` > `Actions` > `New repository secret`
   - Add these four secrets:
     - `KEYSTORE_BASE64` - The base64-encoded keystore file
     - `KEYSTORE_PASSWORD` - Password for the keystore
     - `KEY_ALIAS` - Alias for the signing key (usually "release")
     - `KEY_PASSWORD` - Password for the signing key

4. **Save the keystore information** from the release artifacts:
   - Download `keystore-info.txt` from the GitHub release
   - Store it securely (password manager, encrypted backup)
   - **NEVER commit this file to your repository**

## Subsequent Builds

Once you've added the secrets to GitHub:
- Every push to `main` will automatically build a signed AAB
- The same keystore will be reused for all builds
- Your app will maintain the same signing identity (required for Play Store updates)

## Output Files

Each successful build creates:
- **`app-release.aab`** - Signed bundle ready for Google Play Console
- **`app-debug.apk`** - Debug build for testing on devices
- **`keystore-info.txt`** - Keystore secrets (only on first build)

## Uploading to Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app (or create a new one)
3. Navigate to `Production` or `Testing` track
4. Click `Create new release`
5. Upload the `app-release.aab` file from the GitHub release
6. Fill in release notes
7. Submit for review

## Security Notes

⚠️ **IMPORTANT:**
- Never commit keystore files or passwords to your repository
- Store the keystore information securely
- If you lose the keystore, you cannot update your app on Play Store
- Keep backups of your keystore in multiple secure locations

## Troubleshooting

### Build fails with "keystore not found"
- Make sure all four secrets are added to GitHub Actions secrets
- Check that secret names match exactly (case-sensitive)

### Play Store rejects the bundle
- Ensure you're incrementing the version code (automatically done by timestamp)
- Verify the app ID matches your Play Console listing
- Check that the bundle is signed with the correct keystore

### Need to regenerate keystore
1. Delete all four secrets from GitHub Actions
2. Trigger a new build
3. Follow the first-time setup steps again
4. **Note:** This will create a new app - you cannot update an existing Play Store listing

## Version Management

The workflow automatically generates a unique version code based on the current timestamp: `YYYYMMDDHH`

Example: `2024112115` = November 21, 2024, 3 PM

To customize versioning, modify the "Get version code" step in the workflow file.

