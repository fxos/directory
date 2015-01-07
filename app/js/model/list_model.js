import { Model } from 'components/fxos-mvc/dist/mvc';

export default class ListModel extends Model {
	getAppList() {
		return {
			'http://fxos.github.io/camera/dist/app/manifest.webapp': {
				manifestURL: 'http://fxos.github.io/camera/dist/app/manifest.webapp',
				name: 'camera',
				type: 'hosted',
				url: 'https://github.com/fxos/camera'
			},
			'http://fxos.github.io/video/app/manifest.webapp': {
				manifestURL: 'http://fxos.github.io/video/app/manifest.webapp',
				name: 'video',
				type: 'hosted',
				url: 'https://github.com/fxos/video'
			},
			'http://henretty.us/manifest.webapp': {
				manifestURL: 'http://henretty.us/manifest.webapp',
				name: 'clock',
				type: 'packaged',
				url: 'https://github.com/mozilla-b2g/gaia/tree/apps/clock/'
			}
		};
	}
}
