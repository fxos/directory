import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-list/gaia-list';
import 'components/gaia-button/gaia-button';
import 'components/gaia-dialog/gaia-dialog-alert';

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default class ListView extends View {
  constructor() {
    this.el = document.createElement('gaia-list');
    this.el.className = 'install-list';

    this.elements = Object.create(null);
    this.clickHandlers = [];
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

  onAppClick(handler) {
    if (this.clickHandlers.indexOf(handler) === -1) {
      this.clickHandlers.push(handler);
    }
  }

  offAppClick(handler) {
    var index = this.clickHandlers.indexOf(handler);
    if (index !== -1) {
      this.clickHandlers.splice(index, 1);
    }
  }

  addElement(data) {
    var item = document.createElement('li');
    item.className = 'item';
    item.innerHTML = this.listItemTemplate(data);
    this.el.appendChild(item);

    item.querySelector('.install-button').addEventListener('click',
      function(data) {
        this.clickHandlers.forEach(handler => {
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
