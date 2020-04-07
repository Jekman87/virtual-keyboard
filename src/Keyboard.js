/* eslint-disable import/extensions */
import Button from './Button.js';
import buttonConfig from './buttonConfig.js';
import { caseConfig, specialBtn } from './constants.js';

export default class Keyboard {
  constructor() {
    this.keyboard = null;
    this.textarea = null;
    this.container = null;
    this.lang = localStorage.getItem('lang') || 'En';
    this.case = caseConfig.lower;
    this.pressedCtrlAlt = new Set();
  }

  renderKeyboard() {
    this.container = document.createElement('div');
    this.container.id = 'container';
    this.container.classList.add(this.lang);

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Виртуальная клавиатура';

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');

    this.keyboard = document.createElement('div');
    this.keyboard.id = 'keyboard';
    this.keyboard.classList.add(this.case);

    this.addButtonsToKeyboard();

    const helpText = document.createElement('p');
    helpText.classList.add('help-text');

    const helpSpanEn = document.createElement('span');
    helpSpanEn.classList.add('En');
    helpSpanEn.textContent = 'The keyboard is created in Windows. To switch the language, use Ctrl + Shift. Have a nice day! ;)';

    const helpSpanRu = document.createElement('span');
    helpSpanRu.classList.add('Ru');
    helpSpanRu.textContent = 'Клавиатура создана в ОС Windows. Для переключения языка используйте Ctrl + Shift. Хорошего дня! ;)';

    helpText.append(helpSpanEn, helpSpanRu);

    this.container.append(title, this.textarea, this.keyboard, helpText);

    document.body.prepend(this.container);
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

    this.shiftUpHandler(buttonCode);
    this.pressedCtrlAlt.clear();
    this.removeAnimateFromButton(buttonCode);
  }

  mousedownHandler(event) {
    const button = event.target.closest('.button');

    if (button) {
      const buttonCode = button.classList[1];
      this.addAnimateToButton(buttonCode);

      button.addEventListener('mouseleave', this.mouseleaveHandler.bind(this), { once: true });

      this.handleClickedButton(buttonCode);
    }
  }

  mouseleaveHandler(event) {
    const buttonCode = event.target.classList[1];
    this.removeAnimateFromButton(buttonCode);
  }

  mouseupHandler(event) {
    const button = event.target.closest('.button');

    if (button) {
      const buttonCode = button.classList[1];
      this.shiftUpHandler(buttonCode);
      this.removeAnimateFromButton(buttonCode);
    }
  }

  addAnimateToButton(code) {
    const button = this.keyboard.querySelector(`.${code}`);

    if (button) {
      button.classList.add('animated');
    }
  }

  removeAnimateFromButton(code) {
    if (code === specialBtn.capsLock && this.case === caseConfig.caps) {
      return;
    }

    const button = this.keyboard.querySelector(`.${code}`);

    if (button) {
      button.classList.remove('animated');
    }
  }

  handleClickedButton(buttonCode) {
    const buttonText = this.findButtonText(buttonCode);

    if (buttonText === null) {
      return;
    }

    switch (buttonText) {
      case specialBtn.tab:
        this.handleTab();

        break;

      case specialBtn.capsLock:
        this.handleCapsLock();

        break;

      case specialBtn.shift:
        this.handleShift();

        break;

      case specialBtn.ctrl:
        this.handleCtrlAlt(buttonText);

        break;

      case specialBtn.win:
        this.handleWin();

        break;

      case specialBtn.alt:
        this.handleCtrlAlt(buttonText);

        break;

      case specialBtn.backspace:
        this.handleBackspace();

        break;
      case specialBtn.del:
        this.handleDel();

        break;
      case specialBtn.enter:
        this.handleEnter();

        break;
      case specialBtn.arrowLeft:
        this.handleArrowLeft();

        break;
      case specialBtn.arrowDown:
        this.handleArrowDown();

        break;
      case specialBtn.arrowRight:
        this.handleArrowRight();

        break;
      case specialBtn.arrowUp:
        this.handleArrowUp();

        break;

      default:
        this.handleText(buttonText);

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

    return null;
  }

  handleTab() {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = `${value.slice(0, selectionStart)}\t${value.slice(selectionStart)}`;
    } else {
      this.textarea.value = `${value.slice(0, selectionStart)}\t${value.slice(selectionEnd)}`;
    }

    this.changeCursorPosition(selectionStart + 1);
  }

  handleCapsLock() {
    if (this.case === caseConfig.lower) {
      this.case = caseConfig.caps;
      this.keyboard.className = caseConfig.caps;
    } else {
      this.case = caseConfig.lower;
      this.keyboard.className = caseConfig.lower;
    }
  }

  handleShift() {
    if (this.case === caseConfig.lower) {
      this.case = caseConfig.shift;
      this.keyboard.className = caseConfig.shift;
    } else if (this.case === caseConfig.caps) {
      this.case = caseConfig.capsShift;
      this.keyboard.className = caseConfig.capsShift;
    }
  }

  shiftUpHandler(buttonCode) {
    if (buttonCode === specialBtn.shiftLeft || buttonCode === specialBtn.shiftRight) {
      if (this.case === caseConfig.shift) {
        this.case = caseConfig.lower;
        this.keyboard.className = caseConfig.lower;
      } else if (this.case === caseConfig.capsShift) {
        this.case = caseConfig.caps;
        this.keyboard.className = caseConfig.caps;
      }
    }
  }

  handleCtrlAlt(buttonText) {
    this.pressedCtrlAlt.add(buttonText);

    if (this.pressedCtrlAlt.size === 2) {
      this.changeLanguage();
      this.pressedCtrlAlt.clear();
    }
  }

  changeLanguage() {
    if (this.lang === 'En') {
      this.lang = 'Ru';
      localStorage.setItem('lang', this.lang);
      this.container.className = this.lang;
    } else {
      this.lang = 'En';
      localStorage.setItem('lang', this.lang);
      this.container.className = this.lang;
    }
  }

  handleBackspace() {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = value.slice(0, selectionStart - 1) + value.slice(selectionStart);
      this.changeCursorPosition(selectionStart - 1);
    } else {
      this.textarea.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
      this.changeCursorPosition(selectionStart);
    }
  }

  handleDel() {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = value.slice(0, selectionStart) + value.slice(selectionStart + 1);
    } else {
      this.textarea.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
    }

    this.changeCursorPosition(selectionStart);
  }

  handleEnter() {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = `${value.slice(0, selectionStart)}\n${value.slice(selectionStart)}`;
    } else {
      this.textarea.value = `${value.slice(0, selectionStart)}\n${value.slice(selectionEnd)}`;
    }

    this.changeCursorPosition(selectionStart + 1);
  }

  handleArrowLeft() {
    this.changeCursorPosition(this.textarea.selectionStart - 1);
  }

  handleArrowDown() {
    this.changeCursorPosition(this.textarea.textLength);
  }

  handleArrowRight() {
    this.changeCursorPosition(this.textarea.selectionStart + 1);
  }

  handleArrowUp() {
    this.changeCursorPosition(0);
  }

  changeCursorPosition(position) {
    this.textarea.selectionStart = position;
    this.textarea.selectionEnd = position;
  }

  handleText(text) {
    const { selectionStart, selectionEnd, value } = this.textarea;

    if (selectionStart === selectionEnd) {
      this.textarea.value = value.slice(0, selectionStart) + text + value.slice(selectionStart);
    } else {
      this.textarea.value = value.slice(0, selectionStart) + text + value.slice(selectionEnd);
    }

    this.changeCursorPosition(selectionStart + 1);
  }

  handleWin() {
    window.addEventListener('blur', () => this.removeAnimateFromButton(specialBtn.metaLeft), { once: true });
  }
}
