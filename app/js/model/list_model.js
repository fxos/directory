import { Model } from 'components/fxos-mvc/mvc';

export default class ListModel extends Model {
	getAppList() {
		return {
			video: {
				type: 'hosted',
				manifest: 'http://fxos.github.io/video/app/manifest.webapp',
				url: 'https://github.com/fxos/video'
			},
			contacts: {
				type: 'packaged',
				manifest: 'http://static.henretty.us/manifest.webapp',
				url: 'https://github.com/fxos/contacts'
			}
		};
	}
}
