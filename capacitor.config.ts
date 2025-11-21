import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ai.engineer.simulator',
  appName: 'AI Engineer Job Simulator',
  webDir: 'dist',
  server: {
    url: process.env.CAPACITOR_SERVER_URL || 'http://localhost:3000',
    cleartext: true
  }
};

export default config;
