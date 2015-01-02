import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-list/gaia-list';

export default class ListView extends View {
	constructor() {
		this.el = document.createElement('gaia-list');
	}

	listItemTemplate(name, type) {
		var string = `
			<div>
				${name}, ${type}
				<button>Install</button>
			</div>`;
		return string;
	}

	addAppButton(name, type) {
		var item = document.createElement('a');
		item.innerHTML = this.listItemTemplate(name, type);
		this.el.appendChild(item);
		return item;
	}
}
