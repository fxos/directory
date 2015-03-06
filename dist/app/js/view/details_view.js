define(["exports", "components/fxos-mvc/dist/mvc", "components/gaia-header/dist/gaia-header"], function (exports, _componentsFxosMvcDistMvc, _componentsGaiaHeaderDistGaiaHeader) {
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

  var DetailsView = (function (View) {
    var DetailsView = function DetailsView() {
      this.el = document.createElement("div");
      this.el.id = "app-details";
      this.closeHandlers = [];
      this.installHandlers = [];
    };

    _extends(DetailsView, View);

    DetailsView.prototype.render = function () {
      var _this = this;
      View.prototype.render.call(this);
      this.titleElement = this.el.querySelector("#details-title");
      this.nameElement = this.el.querySelector(".name");
      this.iconElement = this.el.querySelector(".icon");
      this.authorElement = this.el.querySelector(".author");
      this.fullDescription = this.el.querySelector("#full-description");
      this.installButton = this.el.querySelector(".install-button");
      this.installButton.addEventListener("click", function () {
        _this.installHandlers.forEach(function (handler) {
          handler(_this.details);
        });
      });
      this.closeButton = this.el.querySelector("#close-button");
      this.closeButton.addEventListener("click", function () {
        _this.closeHandlers.forEach(function (handler) {
          handler();
        });
      });
    };

    DetailsView.prototype.show = function (details) {
      this.details = details;
      this.titleElement.textContent = capitalize(details.name);
      this.iconElement.src = "./img/app_icons/" + details.name + ".png";
      this.nameElement.textContent = capitalize(details.name);
      this.authorElement.textContent = details.author;
      this.installButton.textContent = details.installed ? "Open" : "Install";
      this.fullDescription.textContent = details.description;
      this.el.classList.add("active");
    };

    DetailsView.prototype.hide = function () {
      this.el.classList.remove("active");
    };

    DetailsView.prototype.onClose = function (handler) {
      if (this.closeHandlers.indexOf(handler) === -1) {
        this.closeHandlers.push(handler);
      }
    };

    DetailsView.prototype.onInstall = function (handler) {
      if (this.installHandlers.indexOf(handler) === -1) {
        this.installHandlers.push(handler);
      }
    };

    DetailsView.prototype.template = function () {
      var string = "\n      <gaia-header>\n        <a id=\"close-button\"><i data-icon=\"close\"></i></a>\n        <h1 id=\"details-title\">App Details</h1>\n      </gaia-header>\n      <gaia-list id=\"info-section\" class=\"install-list\">\n        <li class=\"item\">\n          <img class=\"icon\" src=\"./img/app_icons/" + name + ".png\" />\n          <div flex class=\"description\">\n            <p class=\"name\"></p>\n            <p class=\"author\"></p>\n          </div>\n          <button class=\"install-button\"></button>\n        </li>\n      </gaia-list>\n      <p id=\"full-description\"></p>";
      return string;
    };

    return DetailsView;
  })(View);

  exports["default"] = DetailsView;
});