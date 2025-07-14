import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.tum.sg.momentum',
  appName: 'momenTUM',
  webDir: 'www',
  bundledWebRuntime: true,

  version: '1.0.0',     
  android: {
    versionCode: 2       
  },
  ios: {
    buildNumber: '2'     
  },

  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'beep.wav',
    },
    SplashScreen: {
      launchAutoHide: false,
    },
  },
};

export default config;