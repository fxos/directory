import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';
import 'components/gaia-list/gaia-list';
import 'gaia-icons';
import 'components/gaia-text-input/gaia-text-input';
import 'components/gaia-text-input/gaia-text-input-multiline';
import { IconHelper } from 'js/lib/helpers';

export default class UploadView extends View {
  constructor() {
    this.el = document.createElement('div');
    this.el.id = 'uploads';
    this.el.classList.add('popup');
    this.currentApp = null;
  }

  render() {
    super();
    this.closeButton = this.el.querySelector('.close');
    this.cancelButton = this.el.querySelector('#upload-cancel');
    this.submitButton = this.el.querySelector('#upload-submit');
    this.list = this.el.querySelector('#upload-list');
    this.displayName = this.el.querySelector('#display-name');
    this.displayIcon = this.el.querySelector('#display-icon');
    this.nameInput = this.el.querySelector('#upload-name');
    this.descriptionInput = this.el.querySelector('#upload-description');
    this.alertDialog = document.body.querySelector('#alert-dialog');

    this.closeButton.addEventListener('click', this.hide.bind(this));
    this.cancelButton.addEventListener('click', this.hideForm.bind(this));
    this.submitButton.addEventListener('click', this.upload.bind(this));
    this.createList();
  }

  showAlertDialog(msg) {
    this.alertDialog.textContent = msg;
    this.alertDialog.open();
  }

  createList() {
    var req;
    if (navigator.mozApps.mgmt) {
      req = navigator.mozApps.mgmt.getAll();
    } else {
      req = navigator.mozApps.getInstalled();
    }
    req.onsuccess = () => {
      var apps = req.result;
      apps.forEach(app => {
        if (app.manifest.type !== 'certified') {
          var item = document.createElement('li');
          var icon = this.getIconUrl(app.manifest, app.origin);
          item.classList.add('item');
          item.innerHTML = this.itemTemplate(app.manifest);
          IconHelper.setImage(item.querySelector('.icon'), icon);
          this.list.appendChild(item);
          item.addEventListener('click', this.showForm.bind(this, app));
        }
      });
    };
    req.onerror = e => {
      console.log('Unable to fetch installed apps.', e);
    };
  }

  getIconUrl(manifest, origin) {
    if (!manifest || !manifest.icons) {
      return null;
    }
    var url;
    for (var size in manifest.icons) {
      url = manifest.icons[size];
    }
    if (url.startsWith('/')) {
      url = origin + url;
    }
    return url;
  }

  showForm(app) {
    this.nameInput.value = '';
    this.descriptionInput.value = '';
    this.currentApp = app;
    this.displayName.textContent = app.manifest.name;
    IconHelper.setImage(this.displayIcon, this.getIconUrl(app.manifest, app.origin));
    this.el.classList.add('form');
  }

  hideForm(app) {
    this.currentApp = null;
    this.el.classList.remove('form');
  }

  show() {
    this.el.classList.add('active');
  }

  hide() {
    this.el.classList.remove('active');
  }

  upload() {
    if (!this.currentApp) {
      this.showAlertDialog('Error: current app not found');
      this.hideForm();
      return;
    }

    if (this.nameInput.value === '') {
      this.showAlertDialog('You must fill out a name');
      return;
    }

    this.currentApp.export().then((blob) => {
      console.log('got an app blob!');
      var ajax = new XMLHttpRequest();
      ajax.open('POST', 'http://104.236.138.217/upload', true);
      ajax.onload = () => {
        this.showAlertDialog('Upload success, thank you!');
      };
      ajax.error = (e) => {
        this.showAlertDialog('App upload failed, ' + e);
        console.log('Upload failed', e);
      };
      ajax.send(blob);
    });
  }

  itemTemplate({ name }) {
    var string = `
      <img class="icon" />
      <div flex class="description">
        <p class="name">${name}</p>
      </div>
      <i data-icon="forward"></i>`;
    return string;
  }

  template() {
    var string = `
      <gaia-header>
        <a class="close"><i data-icon="close"></i></a>
        <h1 id="upload-title">Upload</h1>
      </gaia-header>
      <gaia-list id="upload-list" class="install-list"></gaia-list>
      <div id="upload-form">
        <gaia-list class="info-list install-list">
          <li class="item">
            <img id="display-icon" class="icon" />
            <div flex class="description">
              <p id="display-name" class="name"></p>
            </div>
          </li>
        </gaia-list>
        <div id="form-fields">
          <label>Tell us your name&nbsp;<span class="red">*</span></label>
          <gaia-text-input id="upload-name"></gaia-text-input>
          <label>App Description (optional)</label>
          <gaia-text-input-multiline id="upload-description">
          </gaia-text-input-multiline>
          <section id="upload-buttons">
            <gaia-button id="upload-cancel">Cancel</gaia-button>
            <gaia-button id="upload-submit">Upload</gaia-button>
          </section>
        </div>
      </div>`;
    return string;
  }
}
