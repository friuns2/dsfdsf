# Android APK Build Instructions

This guide explains how to build an Android APK that contains a WebView pointing to your GitHub Pages deployed React app.

## Prerequisites

- Linux/macOS/Windows with Bash
- Java 8 or higher
- Internet connection for downloading Android SDK (if not already installed)

## Quick Build

Simply run the build script:

```bash
./build-apk.sh
```

The script will:
1. Check for Android SDK installation
2. Download and set up Android SDK if needed
3. Build the release APK
4. Copy the APK to `ai-engineer-simulator.apk` in the project root

## Manual Build

If you prefer to build manually:

1. **Install Android SDK** (if not already installed):
   ```bash
   # Download command line tools
   wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip
   unzip commandlinetools-linux-10406996_latest.zip

   # Set up SDK
   mkdir -p android-sdk/cmdline-tools
   mv cmdline-tools android-sdk/cmdline-tools/latest
   export ANDROID_HOME=$(pwd)/android-sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

   # Accept licenses and install packages
   yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
   $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
   ```

2. **Build the APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Find the APK**:
   - Release APK: `android/app/build/outputs/apk/release/app-release.apk`
   - Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`

## App Features

The Android app includes:
- **WebView** that loads your GitHub Pages site
- **Back button support** (navigates web history or exits app)
- **JavaScript enabled** for full functionality
- **Responsive design support**
- **Zoom controls** for better usability
- **Network permissions** for web content

## Customization

To modify the app:

1. **Change the URL**: Edit `MainActivity.java` and update the URL in `webView.loadUrl()`
2. **App name**: Edit `strings.xml`
3. **App icon**: Replace `drawable/ic_launcher.xml` with your icon
4. **Theme colors**: Modify `styles.xml`

## Testing

To test on a device:
1. Enable USB debugging on your Android device
2. Connect via USB
3. Install the APK: `adb install ai-engineer-simulator.apk`
4. Launch the app

## Troubleshooting

- **Build fails**: Ensure Java 8+ is installed and ANDROID_HOME is set
- **App won't load**: Check internet connection and GitHub Pages URL
- **Permissions denied**: Ensure device allows installation from unknown sources

## File Structure

```
android/
├── app/
│   ├── build.gradle          # App configuration
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/example/dsfdsf/MainActivity.java
│       └── res/
│           ├── drawable/ic_launcher.xml
│           ├── layout/activity_main.xml
│           ├── values/strings.xml
│           └── values/styles.xml
├── build.gradle              # Project configuration
├── settings.gradle           # Project settings
└── gradle.properties         # Gradle properties
```
