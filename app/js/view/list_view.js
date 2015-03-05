import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-list/gaia-list';
import 'components/gaia-button/gaia-button';

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default class ListView extends View {
  constructor() {
    this.el = document.createElement('gaia-list');
    this.el.className = 'install-list';

    this.elements = Object.create(null);
    this.installHandlers = [];
    this.detailsHandlers = [];
  }

  showAlertDialog(msg) {
    if (!this.alertDialog) {
      this.alertDialog = document.querySelector('#alert-dialog');
    }
    this.alertDialog.textContent = msg;
    this.alertDialog.open();
  }

  update(list) {
    for (let manifestURL in list) {
      let data = list[manifestURL];
      if (!this.elements[manifestURL]) {
        this.elements[manifestURL] = this.addElement(data);
      }
      this.updateElements(this.elements[manifestURL], data);
    }
  }

  onInstall(handler) {
    if (this.installHandlers.indexOf(handler) === -1) {
      this.installHandlers.push(handler);
    }
  }

  offInstall(handler) {
    var index = this.installHandlers.indexOf(handler);
    if (index !== -1) {
      this.installHandlers.splice(index, 1);
    }
  }

  onDetails(handler) {
    if (this.detailsHandlers.indexOf(handler) === -1) {
      this.detailsHandlers.push(handler);
    }
  }

  offDetails(handler) {
    var index = this.detailsHandlers.indexOf(handler);
    if (index !== -1) {
      this.detailsHandlers.splice(index, 1);
    }
  }

  addElement(data) {
    var item = document.createElement('li');
    item.className = 'item';
    item.innerHTML = this.listItemTemplate(data);
    this.el.appendChild(item);

    item.addEventListener('click', function(data) {
      this.detailsHandlers.forEach(handler => {
        handler(data);
      });
    }.bind(this, data));

    item.querySelector('.install-button').addEventListener('click',
      function(data) {
        this.installHandlers.forEach(handler => {
          handler(data);
        });
      }.bind(this, data));

    return item;
  }

  updateElements(element, data) {
    var button = element.querySelector('.install-button');
    if (data.installed === true) {
      button.textContent = 'Launch';
    } else {
      button.textContent = 'Install';
    }
  }

  activate() {
    this.el.classList.add('active');
  }

  deactivate() {
    this.el.classList.remove('active');
  }

  listItemTemplate({ name, author }) {
    var string = `
      <img class="icon" src="./img/app_icons/${name}.png" />
      <div flex class="description">
        <p class="name">${capitalize(name)}</p>
        <p class="author">${author}</p>
      </div>
      <button class="install-button">Loading...</button>`;
    return string;
  }

}
