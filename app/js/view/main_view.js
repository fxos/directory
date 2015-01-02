import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';
import 'components/gaia-theme/lib/gaia-theme-selector';

export default class MainView extends View {
	template() {
		var string = `
		  <gaia-theme-selector></gaia-theme-selector>
		  <gaia-header>
				<h1>Apps</h1>
			</gaia-header>`;
		return string;
	}
}
