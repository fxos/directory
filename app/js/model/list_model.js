import { Model } from 'components/fxos-mvc/dist/mvc';

export default class ListModel extends Model {
  getAppList() {
    return {
      'http://fxos.github.io/sharing/dist/app/manifest.webapp': {
        manifestURL: 'http://fxos.github.io/sharing/dist/app/manifest.webapp',
        name: 'sharing',
        icon: 'https://raw.githubusercontent.com/fxos/sharing/master/app/icons/Icon_P2P_Sharing.png',
        description: 'Share applications with your friends over Wifi.',
        author: 'Doug Sherk',
        type: 'hosted',
        url: 'https://github.com/fxos/sharing',
        revision: 'e908d4eff5799b038fd318084254a8b93709bada'
      },
      'http://fxos.github.io/camera/dist/app/manifest.webapp': {
        manifestURL: 'http://fxos.github.io/camera/dist/app/manifest.webapp',
        name: 'camera',
        icon: 'https://raw.githubusercontent.com/fxos/camera/master/app/icons/icon_128.png',
        description: 'Take pictures and stuff.',
        author: 'Justin D\'Arcangelo',
        type: 'hosted',
        url: 'https://github.com/fxos/camera',
        revision: '8b5a7d9061a0d0210f24ff253110a8ce935104ca'
      },
      'http://fxos.github.io/video/app/manifest.webapp': {
        manifestURL: 'http://fxos.github.io/video/app/manifest.webapp',
        name: 'video',
        icon: 'https://raw.githubusercontent.com/fxos/video/master/app/icons/icon_128.png',
        description: 'Become the next Steven Spielberg.',
        author: 'Justin D\'Arcangelo',
        type: 'hosted',
        url: 'https://github.com/fxos/video',
        revision: 'b3c913669bc7039e980586bd9d319a0ca2ac6003'
      },
      'http://fxos.github.io/dialer/dist/app/manifest.webapp': {
        manifestURL: 'http://fxos.github.io/dialer/dist/app/manifest.webapp',
        name: 'dialer',
        icon: 'https://raw.githubusercontent.com/fxos/dialer/master/app/icons/icon_128.png',
        description: 'A replacement for the built-in dialer app.',
        author: 'Doug Sherk',
        type: 'hosted',
        url: 'https://github.com/fxos/dialer',
        revision: '835af6ccf608a51bc87711d1c40fc4f33a1fc12b'
      },
      'http://fxos.github.io/customizer/app/manifest.webapp': {
        manifestURL: 'http://fxos.github.io/customizer/app/manifest.webapp',
        name: 'customizer',
        description: 'An addon for FirefoxOS which builds customizes application interfaces.',
        author: 'The Gaia Team',
        type: 'addon',
        url: 'https://github.com/fxos/customizer',
        revision: '71d6d9f227d9104c973c813537661ed8bdf291db'
      }
    };
  }
}

