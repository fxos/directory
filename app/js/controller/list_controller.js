import BaseController from 'dist/controller/base_controller';

import ListModel from 'dist/model/list_model';
import ListView from 'dist/view/list_view';

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
