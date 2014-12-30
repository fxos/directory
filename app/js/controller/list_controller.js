import { Controller } from 'components/fxos-mvc/mvc';

import ListModel from 'js/model/list_model';
import ListView from 'js/view/list_view';

export default class ListController extends Controller {
	constructor() {
		this.model = new ListModel();
		this.view = new ListView();
		document.body.appendChild(this.view.el);
	}

	main() {
		this.view.render();

		this.appList = this.model.getAppList();
		for (let appName in this.appList) {
			let appData = this.appList[appName];
			let btn = this.view.addAppButton(appName, appData.type);
			btn.addEventListener('click',
				this.installApp.bind(this, appData.manifest, appData.type));
		}
	}

	installApp(manifest, type) {
		var installReq;
		if (type === 'hosted') {
			console.log('installing hosted app, ', manifest);
			installReq = navigator.mozApps.install(manifest);
		} else if (type === 'packaged') {
			console.log('installing packaged app, ', manifest);
			installReq = navigator.mozApps.installPackage(manifest);
		} else {
			throw new Error('Could not install app, unrecognized type: ' + type);
		}

		installReq.onerror = function(err) {
			console.log('install error', err);
		};
		installReq.onsuccess = function() {
			console.log('installed');
			// TODO: launch the app?
		};
	}
}
