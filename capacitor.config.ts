import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.tum.sg.momentum',
  appName: 'momenTUM',
  webDir: 'www',
  bundledWebRuntime: true,
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
