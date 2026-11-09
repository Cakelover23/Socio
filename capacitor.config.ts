import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.streamliner.app',
  appName: 'Streamliner',
  webDir: 'dist',
  plugins: {
    SystemBars: {
      hidden: true
    }
  }
};

export default config;
