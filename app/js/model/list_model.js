import { Model } from 'components/fxos-mvc/dist/mvc';

export default class ListModel extends Model {
	getAppList() {
		return {
			'http://fxos.github.io/video/app/manifest.webapp': {
				manifestURL: 'http://fxos.github.io/video/app/manifest.webapp',
				name: 'video',
				type: 'hosted',
				url: 'https://github.com/fxos/video'
			},
			'http://henretty.us/manifest.webapp': {
				manifestURL: 'http://henretty.us/manifest.webapp',
				name: 'contacts',
				type: 'packaged',
				url: 'https://github.com/fxos/contacts'
			}
		};
	}
}
