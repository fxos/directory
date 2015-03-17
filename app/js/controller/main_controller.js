import { RoutingController } from 'components/fxos-mvc/dist/mvc';
import 'gaia-component';
import 'gaia-dialog';
import MainView from 'js/view/main_view';
import ListController from 'js/controller/list_controller';

import { ActivityHelper } from 'js/lib/helpers';

export default class MainController extends RoutingController {

  constructor() {
    this.view = new MainView({ el: document.body });
    this.activityHelper = new ActivityHelper();
    this.listController = new ListController();
    super({
      apps: this.listController,
      addons: this.listController
    });
  }

  main() {
    this.activityHelper.ready.then(route => {
      document.body.classList.remove('loading');
      this.view.render(this.activityHelper.isActivity);

      // If current hash does not match current route, change the hash
      // to invoke routing function, otherwise invoke route explicitly.
      if (window.location.hash.slice(1) !== route) {
        window.location.hash = '#' + route;
      } else {
        this.route();
      }
    });
  }
}
