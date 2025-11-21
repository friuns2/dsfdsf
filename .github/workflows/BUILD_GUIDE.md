# Android Build Guide

This guide explains how to use the automated Android build workflows.

## Quick Start

### Step 1: Create Keystore (One-time setup)

1. Go to **Actions** tab in GitHub
2. Select **"Create Android Keystore Release"** workflow
3. Click **"Run workflow"**
4. Wait for completion (~2 minutes)

This creates a secure keystore and stores it as a GitHub release.

### Step 2: Build APK & AAB

The build workflow runs automatically on every push to `main`, or you can trigger it manually:

1. Go to **Actions** tab
2. Select **"Build APK & Bundle"** workflow
3. Click **"Run workflow"**
4. Wait for completion (~5-10 minutes)

### Step 3: Download Build Artifacts

1. Go to **Releases** tab
2. Find the latest release (tagged with date/time)
3. Download:
   - `app-release.apk` - For direct installation/testing
   - `app-release.aab` - For Google Play Store submission

## Publishing to Google Play

### Prerequisites

- Google Play Developer account ($25 one-time fee)
- App listing created in Google Play Console

### Steps

1. Download `app-release.aab` from GitHub releases
2. Go to [Google Play Console](https://play.google.com/console)
3. Select your app
4. Navigate to **Production** → **Create new release**
5. Upload the `app-release.aab` file
6. Fill in release notes
7. Review and roll out

## Keystore Management

### Security Best Practices

✅ **DO:**
- Keep keystore password in GitHub Secrets
- Download keystore only when needed
- Store keystore backup securely offline

❌ **DON'T:**
- Commit keystore to repository
- Share keystore publicly
- Lose the keystore (can't update app without it!)

### Setting Custom Keystore Password

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `KEYSTORE_PASSWORD`
4. Value: Your secure password
5. Click **"Add secret"**

The workflows will automatically use this password instead of the default.

## Troubleshooting

### "No keystore release found" Error

**Solution:** Run the "Create Android Keystore Release" workflow first.

### Build Fails with Signing Error

**Possible causes:**
1. Keystore password mismatch
2. Keystore file corrupted

**Solution:**
1. Check `KEYSTORE_PASSWORD` secret is set correctly
2. Re-run "Create Android Keystore Release" workflow

### AAB Upload Rejected by Google Play

**Common issues:**
1. Version code not incremented
2. Signing key mismatch (if updating existing app)

**Solution:**
1. Check `versionCode` in `android/app/build.gradle`
2. Ensure using same keystore for updates

## Workflow Details

### Build APK & Bundle Workflow

**File:** `.github/workflows/build-apk.yml`

**Steps:**
1. Setup Node.js, Java, Android SDK
2. Install dependencies and build web app
3. Initialize Capacitor and add Android platform
4. Download keystore from releases
5. Configure signing with keystore
6. Build signed release APK
7. Build signed AAB for Google Play
8. Create GitHub release with artifacts

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Outputs:**
- `app-release.apk` (~10-50 MB)
- `app-release.aab` (~10-50 MB)

### Create Keystore Workflow

**File:** `.github/workflows/create-keystore.yml`

**Steps:**
1. Check if keystore already exists
2. Generate RSA 2048-bit keystore
3. Create compressed archive
4. Create GitHub release
5. Upload keystore to release

**Triggers:**
- Manual workflow dispatch
- Weekly schedule (Mondays at 9 AM UTC)
- Changes to Android files

**Outputs:**
- `keystore-*.tar.gz` (~2 KB)

## Version Management

### Automatic Versioning

Releases are automatically tagged with timestamp: `v2025.11.21-1430`

### Manual Version Control

To set custom version for Google Play:

1. Edit `android/app/build.gradle`
2. Update `versionCode` and `versionName`:

```gradle
android {
    defaultConfig {
        versionCode 2
        versionName "1.1.0"
    }
}
```

3. Commit and push changes
4. Build workflow runs automatically

## Additional Resources

- [Android App Bundle Documentation](https://developer.android.com/guide/app-bundle)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)

---

*For issues or questions, please open a GitHub issue.*

