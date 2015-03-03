import { Controller } from 'components/fxos-mvc/dist/mvc';

import ListModel from 'js/model/list_model';
import TabsView from 'js/view/tabs_view';
import AppListView from 'js/view/app_list_view';
import AddonListView from 'js/view/addon_list_view';

export default class ListController extends Controller {
  constructor() {
    this.installedApps = Object.create(null);

    this.model = new ListModel();
    this.tabsView = new TabsView();
    this.appView = new AppListView();
    this.addonView = new AddonListView();

    this.tabsView.onTabChange(this.handleTabChange.bind(this));
    document.addEventListener('visibilitychange',
      this.refreshInstalledList.bind(this));
  }

  main() {
    this.showList();
  }

  showList() {
    this.tabsView.render();
    document.body.appendChild(this.tabsView.el);
    this.appView.render();
    document.body.appendChild(this.appView.el);
    this.addonView.render();
    document.body.appendChild(this.addonView.el);

    this.list = this.model.getAppList();
    this.appView.update(this.list);
    this.addonView.update(this.list);
    this.appView.onAppClick(this.handleAppClick.bind(this));
    this.addonView.onAppClick(this.handleAppClick.bind(this));

    this.refreshInstalledList();
    this.appView.activate();
  }

  refreshInstalledList() {
    this.installedApps = Object.create(null);

    // Use mgmt.getAll if available to fetch apps,
    // otherwise use mozApp.getInstalled.
    var req;
    if (navigator.mozApps.mgmt && navigator.mozApps.mgmt.getAll) {
      req = navigator.mozApps.mgmt.getAll();
    } else {
      req = navigator.mozApps.getInstalled();
    }

    req.onsuccess = () => {
      var apps = req.result;
      var installedApps = Object.create(null);
      apps.forEach(app => {
        installedApps[app.manifestURL] = app;
      });
      for (let manifestURL in this.list) {
        this.list[manifestURL].installed = !!installedApps[manifestURL];
        this.list[manifestURL].mozApp = installedApps[manifestURL] || false;
      }
      this.appView.update(this.list);
      this.addonView.update(this.list);
    };

    req.onerror = e => {
      this.appView.showAlertDialog('error fetching install apps: ' + e.message);
      console.log('error fetching installed apps: ', e);
    };
  }

  handleTabChange(activeTab) {
    if (activeTab === 'Apps') {
      this.appView.activate();
      this.addonView.deactivate();
    } else {
      this.addonView.activate();
      this.appView.deactivate();
    }
  }

  handleAppClick(appData) {
    var manifestURL = appData.manifestURL;
    if (this.list[manifestURL].mozApp) {
      this.list[manifestURL].mozApp.launch();
    } else {
      this.installApp(appData);
    }
  }

  installApp(appData) {
    var manifest = appData.manifestURL;
    var type = appData.type;
    var installReq;
    if (type === 'hosted') {
      console.log('installing hosted app, ', manifest);
      installReq = navigator.mozApps.install(manifest, {
        installMetaData: {
          url: appData.url,
          revision: appData.revision
        }
      });
    } else if (type === 'packaged') {
      console.log('installing packaged app, ', manifest);
      installReq = navigator.mozApps.installPackage(manifest, {
        installMetaData: {
          url: appData.url,
          revision: appData.revision
        }
      });
    } else {
      throw new Error('Could not install app, unrecognized type: ' + type);
    }

    installReq.onerror = (err) => {
      this.appView.showAlertDialog('Error installing: ' + err.target.error.name);
      console.log('install error', err);
    };
    installReq.onsuccess = () => {
      this.refreshInstalledList();
    };
  }
}
