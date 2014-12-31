import { Controller } from 'components/fxos-mvc/dist/mvc';
import MainView from 'js/view/main_view';
import ListController from 'js/controller/list_controller';

export default class MainController extends Controller {

	constructor() {
		this.view = new MainView({ el: document.body });
		this.controllers = {
			'list': new ListController()
		};
		this.activeController = null;
	}

	main() {
		this.view.render();
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
