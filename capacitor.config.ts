import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.tum.sg.momentum',
  appName: 'momenTUM',
  webDir: 'www',
  bundledWebRuntime: true,

  version: '1.1.2',     
  android: {
    versionCode: 3       
  },
  ios: {
    buildNumber: '7'     
  },

  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'beep.wav',
    },
    SplashScreen: {
      launchAutoHide: true,
    },
  },
};

export default config;