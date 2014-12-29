import { Model } from 'components/fxos-mvc/mvc';

export default class ListModel extends Model {
	getAppList() {
		return {
			'contacts': {
				zip: 'https://github.com/fxos/contacts/blob/master/app.zip',
				url: 'https://github.com/fxos/'
			}
		};
	}
}
