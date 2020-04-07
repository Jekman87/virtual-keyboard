/* eslint-disable import/extensions */
import Button from './Button.js';
import buttonConfig from './buttonConfig.js';

export default class Keyboard {
  constructor() {
    this.keyboard = null;
    this.textarea = null;
    this.lang = localStorage.getItem('lang') || 'En';
    this.case = 'lower';
  }

  renderKeyboard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Виртуальная клавиатура';

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');

    this.keyboard = document.createElement('div');
    this.keyboard.id = 'keyboard';
    this.keyboard.classList.add('keyboard');
    this.keyboard.classList.add(this.lang);
    this.keyboard.classList.add(this.case);

    this.addButtonsToKeyboard();

    const helpText = document.createElement('p');
    helpText.classList.add('help-text');
    helpText.textContent = 'Клавиатура создана в ОС Windows. Для переключения языка используйте Ctrl + Shift. Хорошего дня! ;)';

    wrapper.append(title, this.textarea, this.keyboard, helpText);

    document.body.prepend(wrapper);
  }

  addButtonsToKeyboard() {
    for (let i = 0; i < buttonConfig.lowerEn.length; i += 1) {
      const row = document.createElement('div');
      row.classList.add('row');

      for (let j = 0; j < buttonConfig.lowerEn[i].length; j += 1) {
        const button = new Button(i, j).createButton();

        row.append(button);
      }

      this.keyboard.append(row);
    }
  }

  addListeners() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    document.addEventListener('keyup', this.keyupHandler.bind(this));

    this.keyboard.addEventListener('mousedown', this.mousedownHandler.bind(this));
    this.keyboard.addEventListener('mouseup', this.mouseupHandler.bind(this));

    this.textarea.addEventListener('blur', this.textarea.focus);
    this.textarea.focus();
  }

  keydownHandler(event) {
    event.preventDefault();

    const buttonCode = event.code;
    this.addAnimateToButton(buttonCode);
    this.handleClickedButton(buttonCode);
  }

  keyupHandler(event) {
    const buttonCode = event.code;
    this.removeAnimateFromButton(buttonCode);
  }

  mousedownHandler(event) {
    const button = event.target.closest('.button');

    if (button) {
      button.classList.add('animated');
      button.addEventListener('mouseleave', this.mouseleaveHandler, {once: true});

      const buttonCode = button.classList[1];

      this.handleClickedButton(buttonCode);

    }
  }

  mouseleaveHandler(event) {
    const button = event.target;
    button.classList.remove('animated');
  }

  mouseupHandler(event) {
    const button = event.target.closest('.button');

    if (button) {
      button.classList.remove('animated');
    }
  }

  addAnimateToButton(code) {
    const button = this.keyboard.querySelector(`.${code}`);

    if (button) {
      button.classList.add('animated');
    }
  }

  removeAnimateFromButton(code) {
    const button = this.keyboard.querySelector(`.${code}`);

    if (button) {
      button.classList.remove('animated');
    }
  }

  handleClickedButton(buttonCode) {
    const buttonText = this.findButtonText(buttonCode);

    if (buttonText === undefined) {
      return;
    }

    console.log(buttonText);

    switch (buttonText) {
      case 'Tab':
        //console.log('Tab');

        break;

      case 'CapsLock':

        break;

      case 'Shift':

        break;

      case 'Control':

        break;

      case 'Win':

        break;

      case 'Alt':

        break;

      case 'Backspace':

        break;
      case 'Del':

        break;
      case 'Enter':

        break;
      case '◄':

        break;
      case '▼':

        break;
      case '►':

        break;
      case '▲':

        break;

      default:
        this.textarea.value += buttonText;

        break;
    }
  }


  findButtonText(buttonCode) {
    for (let row = 0; row < buttonConfig.code.length; row += 1) {

      const col = buttonConfig.code[row].indexOf(buttonCode);

      if (col !== -1) {
        const propOfConfig = `${this.case}${this.lang}`;

        return buttonConfig[propOfConfig][row][col];
      }
    }
  }

}
