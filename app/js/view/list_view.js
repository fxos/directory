import { View } from 'components/fxos-mvc/mvc';

export default class ListView extends View {

	addAppButton(name, type) {
		let installButton = document.createElement('button');
		installButton.textContent = name + ', ' + type;
		this.el.appendChild(installButton);
		return installButton;
	}
}
