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
		this.el.id = 'app-list';
		this.appElements = Object.create(null);
		this.clickHandlers = [];
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

	update(appList) {
		for (let manifestURL in appList) {
			let appData = appList[manifestURL];
			if (!this.appElements[manifestURL]) {
				this.appElements[manifestURL] = this.addAppElement(appData);
			}
			this.updateAppElement(this.appElements[manifestURL], appData);
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

	addAppElement(appData) {
		var item = document.createElement('li');
		item.className = 'app-item';
		item.innerHTML = this.listItemTemplate(appData);
		this.el.appendChild(item);

		item.querySelector('.app-install').addEventListener('click',
		function(appData) {
			this.clickHandlers.forEach((handler) => {
				handler(appData);
			});
		}.bind(this, appData));
		return item;
	}

	updateAppElement(appElement, appData) {
		var button = appElement.querySelector('.app-install');
		var icon = button.querySelector('.action-icon');

		if (appData.installed === true) {
			button.disabled = false;
			icon.dataset.icon = 'play';
		} else if (appData.installed === false) {
			button.disabled = false;
			icon.dataset.icon = 'download';
		} else {
			button.disabled = true;
			icon.dataset.icon = 'repeat';
		}
	}

	listItemTemplate({ name, type }) {
		var string = `
			<img class="app-icon" src="./img/app_icons/${name}.png" />
			<gaia-button circular disabled class="app-install">
				<i class="action-icon" data-icon="repeat"></i>
			</gaia-button>
			<span class="app-description">${capitalize(name)}</span>`;
		return string;
	}

}
