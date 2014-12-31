import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';

export default class MainView extends View {
	template() {
		var string = `
		  <gaia-header>
				<h1>Apps</h1>
			</gaia-header>`;
		return string;
	}
}
