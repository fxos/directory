import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-list/gaia-list';
import 'components/gaia-button/gaia-button';

function capitalize(string) {
	return string[0].toUpperCase() + string.slice(1);
}

export default class ListView extends View {
	constructor() {
		this.el = document.createElement('gaia-list');
		this.el.id = 'app-list';
	}

	listItemTemplate(name, type) {
		var string = `
			<img class="app-icon" src="/img/app_icons/${name}.png" />
			<gaia-button circular class="app-install">
				<i data-icon="download"></i>
			</gaia-button>
			<span class="app-description">${capitalize(name)}</span>`;
		return string;
	}

	addAppButton(name, type) {
		var item = document.createElement('li');
		item.className = 'app-item';
		item.innerHTML = this.listItemTemplate(name, type);
		this.el.appendChild(item);
		return item.querySelector('.app-install');
	}
}
