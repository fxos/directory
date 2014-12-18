import BaseView from 'dist/view/base_view';

export default class ListView extends BaseView {

  render() {
    this.clear();
  }

  renderAppList(appList) {
    for (var appName in appList) {
      let appData = appList[appName];
      let appNode = document.createElement('div');
      appNode.innerHTML = appName + ' ' + appData + '<br />';
      this.container.appendChild(appNode);
    }
  }
}
