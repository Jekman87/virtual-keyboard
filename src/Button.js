/* eslint-disable import/extensions */
import buttonConfig from './buttonConfig.js';

export default class Button {
  constructor(row, col) {
    this.button = null;
    this.row = row;
    this.col = col;
  }

  createButton() {
    const buttonCode = buttonConfig.code[this.row][this.col];

    this.button = document.createElement('button');
    this.button.classList.add('button', buttonCode);

    const enSet = this._createLangSet('En');
    const ruSet = this._createLangSet('Ru');

    this.button.append(enSet, ruSet);

    return this.button;
  }

  _createLangSet(lang) {
    const langSet = document.createElement('span');
    langSet.classList.add(lang.toLowerCase());

    const configProps = ['lower', 'shift', 'caps', 'capsShift'];

    for (let i = 0; i < props.length; i += 1) {
      const langChar = document.createElement('span');
      langChar.classList.add(configProps[i]);

      const propOfConfig = `${configProps[i]}${lang}`;
      langChar.textContent = buttonConfig[propOfConfig][this.row][this.col];

      langSet.append(langChar);
    }

    return langSet;
  }
}
