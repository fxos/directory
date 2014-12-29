import { Controller } from 'components/fxos-mvc/mvc';

import ListModel from 'js/model/list_model';
import ListView from 'js/view/list_view';

export default class ListController extends Controller {
	constructor() {
		this.model = new ListModel();
		this.view = new ListView();
		document.body.appendChild(this.view.el);
	}

	main() {
		this.appList = this.model.getAppList();
		this.view.render(this.appList);

		var buttons = this.view.getInstallButtons();
		buttons.forEach((button) => {
			button.el.addEventListener('click',
			  this.installApp.bind(this, button.zip));
		});
	}

	installApp(zip) {
		console.log('installing ...' + zip);
	}
}
