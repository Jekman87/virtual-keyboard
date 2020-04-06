export default class Button {
  constructor(code) {
    this.code = code;
  }

  createButton() {
    this.button = document.createElement('div');
    this.button.classList.add('button');
  }

}
