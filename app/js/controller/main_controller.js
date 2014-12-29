import { Controller } from 'components/fxos-mvc/mvc';
import ListController from 'js/controller/list_controller';

export default class MainController extends Controller {

	constructor() {
		this.controllers = {
			'list': new ListController()
		};

		this.activeController = null;
	}

	main() {
		window.addEventListener('hashchanged', this.route.bind(this));
		this.route();
		document.body.classList.remove('loading');
	}

	route() {
		var route = window.location.hash;
		switch (route) {
			default:
				this.activeController = this.controllers.list;
				break;
		}

		this.activeController.main();
	}
}
