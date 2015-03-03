import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';
import 'components/gaia-tabs/gaia-tabs';

export default class MainView extends View {
  template() {
    var string = `
      <gaia-header>
        <h1>Hackerplace</h1>
        <a id="upload-link" target="_blank" href="https://github.com/fxos/directory"></a>
      </gaia-header>
      <gaia-dialog-alert id="alert-dialog">Placeholder</gaia-dialog-alert>`;
    return string;
  }
}
