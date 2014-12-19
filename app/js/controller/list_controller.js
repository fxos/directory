import BaseController from 'js/controller/base_controller';

import ListModel from 'js/model/list_model';
import ListView from 'js/view/list_view';

export default class ListController extends BaseController {
  constructor() {
    this.model = new ListModel();
    this.view = new ListView();
  }

  main() {
    this.view.render();

    var appList = this.model.getAppList();
    this.view.renderAppList(appList);
  }
}
