import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';

export default class MainView extends View {
	template() {
		var string = `
		  <gaia-header>
				<h1>Hacker Marketplace</h1>
        <a id="upload-link" href="https://github.com/fxos/directory"></a>
			</gaia-header>`;
		return string;
	}
}
