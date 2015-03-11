import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';
import 'components/gaia-sub-header/gaia-sub-header';
import { IconHelper, AppsHelper, ManifestHelper } from 'js/lib/helpers';

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
    this.addonSection = this.el.querySelector('#addon-section');
    this.affectedApps = this.el.querySelector('#affected-apps');
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

  filterNonAffectedApps(apps, filters) {
    return apps.filter(app => {
      return filters.reduce((prev, cur) => {
        return prev || cur.test(app.manifestURL);
      }, false);
    });
  }

  populateAffectedApps(details) {
    Promise.all([
      AppsHelper.getAllApps(),
      ManifestHelper.getManifest(details.manifestURL)
    ])

    .then(results => {
      var apps = results[0];
      var manifest = results[1];
      var filters = manifest.customizations.map(customization => {
        if (!customization.filter) {
          console.warn('No filter provided in customization', customization);
          customization.filter = '';
        }
        return new RegExp(customization.filter);
      });

      // Test the current manifest against each customization filter
      // and mark the app as affected if it matches at least one.
      var filteredApps = this.filterNonAffectedApps(apps, filters);

      var affectedApps;
      if (apps.length === filteredApps.length) {
        affectedApps = 'All applications.';
      } else {
        affectedApps = filteredApps.reduce((prev, cur) => {
          return (prev ? prev + ', ' : '') + cur.manifest.name;
        }, null);
      }

      this.affectedApps.textContent = affectedApps || 'None';
    })

    .catch((err) => {
      console.warn('Could not populate affected apps', err);
      // Hide affected apps section when undetermined.
      this.addonSection.hidden = true;
    });
  }

  show(details) {
    this.details = details;
    this.titleElement.textContent = capitalize(details.name);
    IconHelper.setImage(this.iconElement, details.icon);
    this.nameElement.textContent = capitalize(details.name);
    this.authorElement.textContent = details.author;
    this.fullDescription.textContent = details.description;
    this.installButton.textContent = details.installed ? 'Open' : 'Install';
    this.installButton.disabled = false;
    this.addonSection.hidden = true;

    // Addons need the affected apps section, and no Open button.
    if (details.type === 'addon') {
      if (details.installed) {
        this.installButton.textContent = 'Installed';
        this.installButton.disabled = true;
      }
      this.addonSection.hidden = false;
      this.populateAffectedApps(details);
    }

    this.el.classList.add('active');
  }

  hide() {
    this.el.classList.remove('active');
  }

  isShowing(manifestURL) {
    return this.el.classList.contains('active') &&
      this.details.manifestURL === manifestURL;
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
          <img class="icon" />
          <div flex class="description">
            <p class="name"></p>
            <p class="author"></p>
          </div>
          <button class="install-button"></button>
        </li>
      </gaia-list>
      <p id="full-description"></p>
      <div id="addon-section">
        <gaia-sub-header>Affected Apps</gaia-sub-header>
        <p id="affected-apps"></div>
      </div>`;
    return string;
  }
}
