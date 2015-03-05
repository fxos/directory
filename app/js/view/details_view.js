import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-component/gaia-component';
import 'components/gaia-header/dist/gaia-header';

export default class DetailsView extends View {
  constructor() {
    this.el = document.createElement('div');
    this.el.id = 'app-details';
  }

  render() {
    super();
    this.titleElement = this.el.querySelector('#details-title');
  }

  show(details) {
    this.titleElement.textContent = details.name;
    this.classList.add('active');
  }

  hide() {
    this.classList.remove('active');
  }

  template() {
    var string = `
      <gaia-header>
        <a id="close-button"><i data-icon="close"></i></a>
        <h1 id="details-title">App Details</h1>
      </gaia-header>`;
    return string;
  }
}
