import { Controller } from 'components/fxos-mvc/dist/mvc';

import ListModel from 'js/model/list_model';
import TabsView from 'js/view/tabs_view';
import AppListView from 'js/view/app_list_view';
import AddonListView from 'js/view/addon_list_view';
import DetailsView from 'js/view/details_view';

export default class ListController extends Controller {
  constructor() {
    this.installedApps = Object.create(null);

    this.model = new ListModel();
    this.tabsView = new TabsView();
    this.appView = new AppListView();
    this.addonView = new AddonListView();
    this.detailsView = new DetailsView();

    this.tabsView.onTabChange(this.handleTabChange.bind(this));
    document.addEventListener('visibilitychange',
      this.refreshInstalledList.bind(this));
  }

  main() {
    let hash = window.location.hash;
    let tab = hash && hash.slice(1);

    if (!this.alreadyCreated) {
      this.createList(tab);
    }
    this.activateTab(tab);
  }

  showAlertDialog(msg) {
    this.alertDialog.textContent = msg;
    this.alertDialog.open();
  }

  createList(tab) {
    this.tabsView.render(tab);
    document.body.appendChild(this.tabsView.el);
    this.appView.render();
    document.body.appendChild(this.appView.el);
    this.addonView.render();
    document.body.appendChild(this.addonView.el);
    this.detailsView.render();
    document.body.appendChild(this.detailsView.el);
    this.alertDialog = document.querySelector('#alert-dialog');

    this.list = this.model.getAppList();
    this.appView.update(this.list);
    this.addonView.update(this.list);
    this.appView.onInstall(this.handleInstall.bind(this));
    this.addonView.onInstall(this.handleInstall.bind(this));
    this.appView.onDetails(this.handleDetails.bind(this));
    this.addonView.onDetails(this.handleDetails.bind(this));
    this.detailsView.onClose(this.handleCloseDetails.bind(this));
    this.detailsView.onInstall(this.handleInstall.bind(this));
    this.refreshInstalledList();

    this.alreadyCreated = true;
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
        if (this.detailsView.isShowing(manifestURL)) {
          // If it's showing, repopulate the details view with new app data.
          this.detailsView.show(this.list[manifestURL]);
        }
      }
      this.appView.update(this.list);
      this.addonView.update(this.list);
    };

    req.onerror = e => {
      this.showAlertDialog('error fetching install apps: ' + e.message);
      console.log('error fetching installed apps: ', e);
    };
  }

  handleTabChange(activeTab) {
    // Changing the hash will eventually invoke activateTab, however we
    // call it here directly to make the switch animation happen faster.
    this.activateTab(activeTab);
    window.location.hash = '#' + activeTab;
  }

  activateTab(activeTab) {
    if (this.activeTab === activeTab) {
      return;
    }
    this.activeTab = activeTab;

    if (activeTab === 'apps') {
      this.appView.activate();
      this.addonView.deactivate();
    } else {
      this.addonView.activate();
      this.appView.deactivate();
    }
  }

  handleInstall(data) {
    var manifestURL = data.manifestURL;
    if (this.list[manifestURL].mozApp) {
      // Addons cannot be launched so do nothing on button click.
      if (data.type !== 'addon') {
        this.list[manifestURL].mozApp.launch();
      }
    } else {
      this.install(data);
    }
  }

  handleDetails(data) {
    this.detailsView.show(data);
  }

  handleCloseDetails() {
    this.detailsView.hide();
    this.refreshInstalledList();
  }

  install(appData) {
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
    } else if (type === 'packaged' || type === 'addon') {
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
      var errorMsg;
      var errorType = err.target.error.name;
      switch(errorType) {
        case 'DENIED':
          // If the user cancelled the install, we do nothing.
          return;

        case 'NETWORK_ERROR':
          errorMsg = 'No network';
          break;

        case 'MANIFEST_URL_ERROR':
          errorMsg = 'Invalid manifest url';
          break;

        case 'INVALID_SECURITY_LEVEL':
          errorMsg = 'Invalid permissions, try enabling developer mode';
          break;

        default:
          errorMsg = errorType;
          break;
      }

      this.showAlertDialog('INSTALL ERROR: ' + errorMsg);
    };

    installReq.onsuccess = () => {
      this.refreshInstalledList();
    };
  }
}
