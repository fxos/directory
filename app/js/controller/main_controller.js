import BaseController from 'js/controller/base_controller';
import ListController from 'js/controller/list_controller';

export default class MainController extends BaseController {

  constructor() {
    this.controllers = {
      'list': new ListController()
    };
  }

  main() {
    window.addEventListener('hashchanged', this.route.bind(this));
    this.route();
    document.body.classList.remove('loading');
  }

  route() {
    var controller;

    var route = this.getRoute();
    switch (route) {
      default:
        controller = this.controllers.list;
        break;
    }

    controller.main();
  }
}
