#!/bin/bash

# Script to generate Android keystore for local development/testing
# Usage: ./scripts/create-keystore.sh [alias] [store_password] [key_password]

set -e

KEYSTORE_DIR="android/keystore"
KEYSTORE_FILE="$KEYSTORE_DIR/release.keystore"

# Default values
ALIAS=${1:-"android_key"}
STORE_PASSWORD=${2:-"android_store_password"}
KEY_PASSWORD=${3:-"android_key_password"}

echo "Creating Android keystore..."
echo "Alias: $ALIAS"
echo "Store Password: $STORE_PASSWORD"
echo "Key Password: $KEY_PASSWORD"
echo ""

# Create keystore directory if it doesn't exist
mkdir -p "$KEYSTORE_DIR"

# Check if keystore already exists
if [ -f "$KEYSTORE_FILE" ]; then
    echo "Warning: Keystore file already exists at $KEYSTORE_FILE"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keystore creation cancelled."
        exit 0
    fi
fi

# Generate keystore
keytool -genkeypair \
  -v \
  -keystore "$KEYSTORE_FILE" \
  -storetype PKCS12 \
  -alias "$ALIAS" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass "$STORE_PASSWORD" \
  -keypass "$KEY_PASSWORD" \
  -dname "CN=AI Engineer Simulator, OU=Development, O=AI Engineer, L=City, ST=State, C=US"

echo ""
echo "Keystore created successfully at: $KEYSTORE_FILE"
echo ""
echo "Keystore information:"
echo "===================="
echo "File: $KEYSTORE_FILE"
echo "Alias: $ALIAS"
echo "Store Password: $STORE_PASSWORD"
echo "Key Password: $KEY_PASSWORD"
echo ""
echo "For Android builds, add these to your build.gradle:"
echo "android {"
echo "    signingConfigs {"
echo "        release {"
echo "            storeFile file('$KEYSTORE_FILE')"
echo "            storePassword '$STORE_PASSWORD'"
echo "            keyAlias '$ALIAS'"
echo "            keyPassword '$KEY_PASSWORD'"
echo "        }"
echo "    }"
echo "}"
echo ""
echo "⚠️  IMPORTANT: Never commit keystore files or passwords to version control!"
echo "   Use GitHub Secrets for CI/CD deployments."
