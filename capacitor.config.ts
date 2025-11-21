import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ai.engineer.simulator',
  appName: 'AI Engineer Job Simulator',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://friuns2.github.io/dsfdsf/',
    cleartext: true
  }
};

export default config;
