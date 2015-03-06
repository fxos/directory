define(["exports", "components/fxos-mvc/dist/mvc", "components/gaia-list/gaia-list"], function (exports, _componentsFxosMvcDistMvc, _componentsGaiaListGaiaList) {
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

  var View = _componentsFxosMvcDistMvc.View;


  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  var ListView = (function (View) {
    var ListView = function ListView() {
      this.el = document.createElement("gaia-list");
      this.el.className = "install-list";

      this.elements = Object.create(null);
      this.installHandlers = [];
      this.detailsHandlers = [];
    };

    _extends(ListView, View);

    ListView.prototype.showAlertDialog = function (msg) {
      if (!this.alertDialog) {
        this.alertDialog = document.querySelector("#alert-dialog");
      }
      this.alertDialog.textContent = msg;
      this.alertDialog.open();
    };

    ListView.prototype.update = function (list) {
      for (var manifestURL in list) {
        var data = list[manifestURL];
        if (!this.elements[manifestURL]) {
          this.elements[manifestURL] = this.addElement(data);
        }
        this.updateElements(this.elements[manifestURL], data);
      }
    };

    ListView.prototype.onInstall = function (handler) {
      if (this.installHandlers.indexOf(handler) === -1) {
        this.installHandlers.push(handler);
      }
    };

    ListView.prototype.offInstall = function (handler) {
      var index = this.installHandlers.indexOf(handler);
      if (index !== -1) {
        this.installHandlers.splice(index, 1);
      }
    };

    ListView.prototype.onDetails = function (handler) {
      if (this.detailsHandlers.indexOf(handler) === -1) {
        this.detailsHandlers.push(handler);
      }
    };

    ListView.prototype.offDetails = function (handler) {
      var index = this.detailsHandlers.indexOf(handler);
      if (index !== -1) {
        this.detailsHandlers.splice(index, 1);
      }
    };

    ListView.prototype.addElement = function (data) {
      var item = document.createElement("li");
      item.className = "item";
      item.innerHTML = this.listItemTemplate(data);
      this.el.appendChild(item);

      item.addEventListener("click", function (data, evt) {
        if (evt.target.classList.contains("install-button")) {
          return;
        }
        this.detailsHandlers.forEach(function (handler) {
          handler(data);
        });
      }.bind(this, data));

      item.querySelector(".install-button").addEventListener("click", function (data) {
        this.installHandlers.forEach(function (handler) {
          handler(data);
        });
      }.bind(this, data));

      return item;
    };

    ListView.prototype.updateElements = function (element, data) {
      var button = element.querySelector(".install-button");
      if (data.installed === true) {
        button.textContent = "Open";
      } else {
        button.textContent = "Install";
      }
    };

    ListView.prototype.activate = function () {
      this.el.classList.add("active");
    };

    ListView.prototype.deactivate = function () {
      this.el.classList.remove("active");
    };

    ListView.prototype.listItemTemplate = function (_ref) {
      var name = _ref.name;
      var author = _ref.author;
      var string = "\n      <img class=\"icon\" src=\"./img/app_icons/" + name + ".png\" />\n      <div flex class=\"description\">\n        <p class=\"name\">" + capitalize(name) + "</p>\n        <p class=\"author\">" + author + "</p>\n      </div>\n      <button class=\"install-button\">Loading...</button>";
      return string;
    };

    return ListView;
  })(View);

  exports["default"] = ListView;
});