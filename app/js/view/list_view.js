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
    // this.clickHandlers = [];
  }

  template() {
    return `<gaia-dialog-alert id="alert-dialog">Placeholder</gaia-dialog-alert>`;
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

  /* XXX: disabling app clicks from here
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
  */

  addElement(data) {
    var item = document.createElement('li');
    item.className = 'item';
    item.innerHTML = this.listItemTemplate(data);
    this.el.appendChild(item);
    return item;
  }

  updateElements(element, data) {
    // XXX: disabling for now, but we should revisit when we
    //      want the list page to display if apps are install

    // var button = element.querySelector('.app-install');
    // var icon = button.querySelector('.action-icon');

    // if (data.installed === true) {
    //   button.disabled = false;
    //   icon.dataset.icon = 'play';
    // } else if (data.installed === false) {
    //   button.disabled = false;
    //   icon.dataset.icon = 'download';
    // } else {
    //   button.disabled = true;
    //   icon.dataset.icon = 'repeat';
    // }
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
      <i class="details" data-icon="forward"></i>`;
    return string;
  }

}
