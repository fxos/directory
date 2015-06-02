import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';
import 'components/gaia-dialog/gaia-dialog-alert';

export default class MainView extends View {

  render(isActivity) {
    super([isActivity]);

    if (isActivity) {
      this.el.querySelector('gaia-header').addEventListener('action', event => {
        if (event.detail.type === 'back') {
          // Back from activity should close it via ActivityHelper.
          window.dispatchEvent(new CustomEvent('request-activity-finish'));
        }
      });
    }
  }

  template(isActivity) {
    var action = isActivity ? 'action="back"' : '';
    var string = `
      <gaia-header ${action}>
        <h1>Hackerplace</h1>
        <a id="upload-link" target="_blank"
           href="https://github.com/fxos/directory/blob/master/README.md#submission-process"></a>
      </gaia-header>
      <gaia-dialog-alert id="alert-dialog">Placeholder</gaia-dialog-alert>`;
    return string;
  }
}
