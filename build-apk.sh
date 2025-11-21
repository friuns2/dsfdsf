#!/bin/bash

# Build APK script for AI Engineer Job Simulator

echo "🔧 Setting up Android build environment..."

# Check if we're in the right directory
if [ ! -d "android" ]; then
    echo "❌ Error: android directory not found. Please run this script from the project root."
    exit 1
fi

cd android

# Check if Android SDK is available (common locations)
ANDROID_SDK_PATHS=(
    "$ANDROID_HOME"
    "$HOME/Android/Sdk"
    "/opt/android-sdk"
    "/usr/local/android-sdk"
)

ANDROID_SDK=""
for path in "${ANDROID_SDK_PATHS[@]}"; do
    if [ -d "$path" ]; then
        ANDROID_SDK="$path"
        break
    fi
done

if [ -z "$ANDROID_SDK" ]; then
    echo "⚠️  Android SDK not found. Installing Android SDK..."

    # Install Android SDK using command line tools
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O cmdline-tools.zip
    unzip -q cmdline-tools.zip
    mkdir -p android-sdk/cmdline-tools
    mv cmdline-tools android-sdk/cmdline-tools/latest
    export ANDROID_HOME=$(pwd)/android-sdk
    export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

    # Accept licenses and install required packages
    yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
    $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
else
    export ANDROID_HOME="$ANDROID_SDK"
    export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools/bin
    echo "✅ Found Android SDK at: $ANDROID_SDK"
fi

# Build the APK
echo "🏗️  Building APK..."
./gradlew assembleRelease

if [ $? -eq 0 ]; then
    echo "✅ APK built successfully!"
    echo "📱 APK location: $(pwd)/app/build/outputs/apk/release/app-release.apk"

    # Copy APK to project root for easy access
    cp app/build/outputs/apk/release/app-release.apk ../ai-engineer-simulator.apk
    echo "📦 APK copied to project root: ai-engineer-simulator.apk"
else
    echo "❌ Build failed!"
    exit 1
fi
