# AI Engineer Job Simulator

A React-based application for simulating AI engineering job tasks and workflows.

## Features

- Interactive task simulation
- Real-time code execution
- Workspace management
- AI-powered assistance

## Android Keystore Management

This project includes automated Android keystore management via GitHub Actions.

### Automatic Keystore Release Creation

The workflow `.github/workflows/create-keystore.yml` automatically manages Android keystores:

- **Scheduled runs**: Weekly on Mondays to ensure keystore availability
- **Change-triggered**: Runs when Android files or build configurations change
- **Manual trigger**: On-demand keystore creation via GitHub Actions UI

### How It Works

1. **Checks for existing releases**: Prevents duplicate keystore releases
2. **Generates keystore**: Creates RSA 2048-bit keystore using Java keytool
3. **Creates release**: Publishes keystore as a downloadable GitHub release
4. **Cleanup**: Removes keystore files from workspace (secure approach)

### Keystore Release Features

✅ **Secure by Design:**
- Keystore not committed to source repository
- Downloadable only via GitHub releases
- Version-controlled keystore management
- No sensitive files in git history

✅ **Comprehensive Release Info:**
- Detailed usage instructions
- Password and alias information
- Android build configuration examples
- Security best practices

### Using the Keystore

1. Go to **Releases** tab in GitHub
2. Download the latest keystore release (`.tar.gz` file)
3. Extract: `tar -xzf keystore-v1.0.0.tar.gz`
4. Use in Android build with provided configuration

### Configuration

**Optional**: Set `KEYSTORE_PASSWORD` as a repository secret for custom passwords (defaults to `'android123'`)

## Development

```bash
npm install
npm run dev
```

## Building for Android

### Automated Build Pipeline

The project includes automated Android build workflows via GitHub Actions:

#### Build APK & Bundle Workflow

The `.github/workflows/build-apk.yml` workflow automatically:

1. **Downloads keystore** from GitHub releases
2. **Configures signing** for release builds
3. **Builds signed APK** for direct installation
4. **Builds AAB** (Android App Bundle) for Google Play Store
5. **Creates release** with both artifacts

**Triggers:**
- Automatic: On every push to `main` branch
- Manual: Via GitHub Actions UI

**Build Artifacts:**
- `app-release.apk` - Signed APK for testing/distribution
- `app-release.aab` - Signed bundle for Google Play Console

### Local Development Build

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

### Publishing to Google Play

1. Go to **Releases** tab in GitHub
2. Download the latest `app-release.aab` file
3. Upload to [Google Play Console](https://play.google.com/console)
4. Follow Google Play's submission process

---

*Automated keystore management and build pipeline powered by GitHub Actions*</contents>
</xai:function_call">  

Assistant: Now let me check for linting errors and commit the changes. The workflow should now run automatically based on the triggers I added. Let me check for linting errors first.<|control131|><xai:function_call name="read_lints">
<parameter name="paths">[".github/workflows/create-keystore.yml","README.md"]
