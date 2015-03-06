define(["exports", "components/fxos-mvc/dist/mvc", "js/model/list_model", "js/view/tabs_view", "js/view/app_list_view", "js/view/addon_list_view", "js/view/details_view"], function (exports, _componentsFxosMvcDistMvc, _jsModelListModel, _jsViewTabsView, _jsViewAppListView, _jsViewAddonListView, _jsViewDetailsView) {
  "use strict";

  var _extends = function (child, parent) {
    child.prototype = Object.create(parent.prototype, {
      constructor: {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    child.__proto__ = parent;
  };

  var Controller = _componentsFxosMvcDistMvc.Controller;
  var ListModel = _jsModelListModel["default"];
  var TabsView = _jsViewTabsView["default"];
  var AppListView = _jsViewAppListView["default"];
  var AddonListView = _jsViewAddonListView["default"];
  var DetailsView = _jsViewDetailsView["default"];
  var ListController = (function (Controller) {
    var ListController = function ListController() {
      this.installedApps = Object.create(null);

      this.model = new ListModel();
      this.tabsView = new TabsView();
      this.appView = new AppListView();
      this.addonView = new AddonListView();
      this.detailsView = new DetailsView();

      this.tabsView.onTabChange(this.handleTabChange.bind(this));
      document.addEventListener("visibilitychange", this.refreshInstalledList.bind(this));
    };

    _extends(ListController, Controller);

    ListController.prototype.main = function () {
      this.createListIfNeeded();
      this.refreshInstalledList();
    };

    ListController.prototype.createListIfNeeded = function () {
      if (!this.alreadyCreated) {
        this.tabsView.render();
        document.body.appendChild(this.tabsView.el);
        this.appView.render();
        document.body.appendChild(this.appView.el);
        this.addonView.render();
        document.body.appendChild(this.addonView.el);
        this.detailsView.render();
        document.body.appendChild(this.detailsView.el);

        this.list = this.model.getAppList();
        this.appView.update(this.list);
        this.addonView.update(this.list);
        this.appView.onInstall(this.handleInstall.bind(this));
        this.addonView.onInstall(this.handleInstall.bind(this));
        this.appView.onDetails(this.handleDetails.bind(this));
        this.addonView.onDetails(this.handleDetails.bind(this));
        this.appView.activate();
        this.detailsView.onClose(this.handleCloseDetails.bind(this));
        this.detailsView.onInstall(this.handleInstall.bind(this));

        this.alreadyCreated = true;
      }
    };

    ListController.prototype.refreshInstalledList = function () {
      var _this = this;
      this.installedApps = Object.create(null);

      // Use mgmt.getAll if available to fetch apps,
      // otherwise use mozApp.getInstalled.
      var req;
      if (navigator.mozApps.mgmt && navigator.mozApps.mgmt.getAll) {
        req = navigator.mozApps.mgmt.getAll();
      } else {
        req = navigator.mozApps.getInstalled();
      }

      req.onsuccess = function () {
        var apps = req.result;
        var installedApps = Object.create(null);
        apps.forEach(function (app) {
          installedApps[app.manifestURL] = app;
        });
        for (var manifestURL in _this.list) {
          _this.list[manifestURL].installed = !!installedApps[manifestURL];
          _this.list[manifestURL].mozApp = installedApps[manifestURL] || false;
        }
        _this.appView.update(_this.list);
        _this.addonView.update(_this.list);
      };

      req.onerror = function (e) {
        _this.appView.showAlertDialog("error fetching install apps: " + e.message);
        console.log("error fetching installed apps: ", e);
      };
    };

    ListController.prototype.handleTabChange = function (activeTab) {
      if (activeTab === "Apps") {
        this.appView.activate();
        this.addonView.deactivate();
      } else {
        this.addonView.activate();
        this.appView.deactivate();
      }
    };

    ListController.prototype.handleInstall = function (data) {
      var manifestURL = data.manifestURL;
      if (this.list[manifestURL].mozApp) {
        this.list[manifestURL].mozApp.launch();
      } else {
        this.install(data);
      }
    };

    ListController.prototype.handleDetails = function (data) {
      this.detailsView.show(data);
    };

    ListController.prototype.handleCloseDetails = function () {
      this.detailsView.hide();
      this.refreshInstalledList();
    };

    ListController.prototype.install = function (appData) {
      var _this2 = this;
      var manifest = appData.manifestURL;
      var type = appData.type;
      var installReq;
      if (type === "hosted") {
        console.log("installing hosted app, ", manifest);
        installReq = navigator.mozApps.install(manifest, {
          installMetaData: {
            url: appData.url,
            revision: appData.revision
          }
        });
      } else if (type === "packaged" || type === "addon") {
        console.log("installing packaged app, ", manifest);
        installReq = navigator.mozApps.installPackage(manifest, {
          installMetaData: {
            url: appData.url,
            revision: appData.revision
          }
        });
      } else {
        throw new Error("Could not install app, unrecognized type: " + type);
      }

      installReq.onerror = function (err) {
        _this2.appView.showAlertDialog("Error installing: " + err.target.error.name);
        console.log("install error", err);
      };
      installReq.onsuccess = function () {
        _this2.refreshInstalledList();
      };
    };

    return ListController;
  })(Controller);

  exports["default"] = ListController;
});