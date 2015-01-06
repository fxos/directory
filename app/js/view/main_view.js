import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-component-utils/index';
import 'components/gaia-header/dist/gaia-header';
import 'components/gaia-confirm/script';

export default class MainView extends View {
	template() {
		var string = `
			<gaia-header><h1>Apps</h1></gaia-header>
			<gaia-confirm id="confirm-dialog">
				<h1 id="confirm-title">Title</h1>
				<p id="confirm-description">Description goes something like this.</p>
				<gaia-buttons>
					<button id="dialog-cancel">Cancel</button>
					<button id="dialog-submit" id="recommend">Confirm</button>
				</gaia-button>
			</gaia-confirm>`;
		return string;
	}
}
