define(["exports", "components/fxos-mvc/dist/mvc", "gaia-component", "gaia-dialog", "js/view/main_view", "js/controller/list_controller"], function (exports, _componentsFxosMvcDistMvc, _gaiaComponent, _gaiaDialog, _jsViewMainView, _jsControllerListController) {
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
  var MainView = _jsViewMainView["default"];
  var ListController = _jsControllerListController["default"];
  var MainController = (function (Controller) {
    var MainController = function MainController() {
      this.view = new MainView({ el: document.body });
      this.controllers = {
        list: new ListController()
      };
      this.activeController = null;
    };

    _extends(MainController, Controller);

    MainController.prototype.main = function () {
      this.view.render();
      window.addEventListener("hashchanged", this.route.bind(this));
      this.route();
      document.body.classList.remove("loading");
    };

    MainController.prototype.route = function () {
      var route = window.location.hash;
      switch (route) {
        default:
          this.activeController = this.controllers.list;
          break;
      }

      this.activeController.main();
    };

    return MainController;
  })(Controller);

  exports["default"] = MainController;
});