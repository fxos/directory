import { View } from 'components/fxos-mvc/dist/mvc';

export default class ListView extends View {

	addAppButton(name, type) {
		let installButton = document.createElement('button');
		installButton.textContent = name + ', ' + type;
		this.el.appendChild(installButton);
		return installButton;
	}
}
