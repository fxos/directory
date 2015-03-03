import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-tabs/gaia-tabs';

export default class TabsView extends View {
  constructor() {
    this.el = document.createElement('div');
    this.el.id = 'tabs-container';
    this.changeHandlers = [];
  }

  onTabChange(handler) {
    if (this.changeHandlers.indexOf(handler) === -1) {
      this.changeHandlers.push(handler);
    }
  }

  onChange(evt) {
    var selected = this.tabs.selected === 0 ? 'Apps' : 'Add-ons';
    this.changeHandlers.forEach(handler => {
      handler(selected);
    });
  }

  render() {
    super();
    // We can't create gaia-tabs with document.createElement
    // so we need to put gaia-tabs in template, and add event listeners
    // here, see https://github.com/gaia-components/gaia-tabs/issues/4
    this.tabs = this.el.querySelector('gaia-tabs');
    this.tabs.addEventListener('change', this.onChange.bind(this));
  }

  template() {
    var string = `
      <gaia-tabs>
        <a select>Apps</a>
        <a>Add-Ons</a>
      </gaia-tabs>`;
    return string;
  }
}
