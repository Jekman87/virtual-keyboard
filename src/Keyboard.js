/* eslint-disable import/extensions */
import Button from './Button.js';

export default class Keyboard {
  constructor() {
    this.keyboard = null;
    this.keyKodes = [];
  }

  renderKeyboard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Виртуальная клавиатура';

    const textarea = document.createElement('textarea');
    textarea.classList.add('textarea');

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');

    const buttons = this.addButtonsToKeyboard(this.keyboard);

    const helpText = document.createElement('p');
    helpText.classList.add('help-text');
    helpText.textContent = 'Клавиатура создана в ОС Windows. Для переключения языка используйте alt + shift. Хорошего дня! ;)';

    wrapper.append(title, textarea, this.keyboard, helpText);

    document.body.prepend(wrapper);
  }

  addButtonsToKeyboard(keyboard) {

  }
}


