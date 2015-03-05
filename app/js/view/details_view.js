import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default class DetailsView extends View {
  constructor() {
    this.el = document.createElement('div');
    this.el.id = 'app-details';
    this.closeHandlers = [];
    this.installHandlers = [];
  }

  render() {
    super();
    this.titleElement = this.el.querySelector('#details-title');
    this.nameElement = this.el.querySelector('.name');
    this.iconElement = this.el.querySelector('.icon');
    this.authorElement = this.el.querySelector('.author');
    this.fullDescription = this.el.querySelector('#full-description');
    this.installButton = this.el.querySelector('.install-button');
    this.installButton.addEventListener('click', () => {
      this.installHandlers.forEach(handler => {
        handler(this.details);
      });
    });
    this.closeButton = this.el.querySelector('#close-button');
    this.closeButton.addEventListener('click', () => {
      this.closeHandlers.forEach(handler => {
        handler();
      });
    });
  }

  show(details) {
    this.details = details;
    this.titleElement.textContent = capitalize(details.name);
    this.iconElement.src = `./img/app_icons/${details.name}.png`;
    this.nameElement.textContent = capitalize(details.name);
    this.authorElement.textContent = details.author;
    this.installButton.textContent = details.installed ? 'Open' : 'Install';
    this.fullDescription.textContent = details.description;
    this.el.classList.add('active');
  }

  hide() {
    this.el.classList.remove('active');
  }

  onClose(handler) {
    if (this.closeHandlers.indexOf(handler) === -1) {
      this.closeHandlers.push(handler);
    }
  }

  onInstall(handler) {
    if (this.installHandlers.indexOf(handler) === -1) {
      this.installHandlers.push(handler);
    }
  }

  template() {
    var string = `
      <gaia-header>
        <a id="close-button"><i data-icon="close"></i></a>
        <h1 id="details-title">App Details</h1>
      </gaia-header>
      <gaia-list id="info-section" class="install-list">
        <li class="item">
          <img class="icon" src="./img/app_icons/${name}.png" />
          <div flex class="description">
            <p class="name"></p>
            <p class="author"></p>
          </div>
          <button class="install-button"></button>
        </li>
      </gaia-list>
      <p id="full-description"></p>`;
    return string;
  }
}
