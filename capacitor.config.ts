import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Demo_App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
