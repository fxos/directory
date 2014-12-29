import { View } from 'components/fxos-mvc/mvc';

export default class ListView extends View {

	render(appList) {
		if (!appList) {
			throw new Error('No application list found to render');
		}
		super(); // clear the list
		this.renderAppList(appList);
	}

	renderAppList(appList) {
		this.installButtons = [];
		for (var appName in appList) {
			let appData = appList[appName];

			let installButton = document.createElement('button');
			installButton.textContent = appName;
			this.installButtons.push({
				el: installButton,
				zip: appData.zip
			});

			this.el.appendChild(installButton);
		}
	}

	getInstallButtons() {
		return this.installButtons;
	}
}
