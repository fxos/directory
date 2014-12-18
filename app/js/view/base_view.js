export default class BaseView {

  constructor() {
    this.container = document.body;
  }

  render() {
    this.clear();
  }

  clear() {
    document.body.innerHTML = '';
  }
}
