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

    const enSet = this.createLangSet('En');
    const ruSet = this.createLangSet('Ru');

    this.button.append(enSet, ruSet);

    return this.button;
  }

  createLangSet(lang) {
    const langSet = document.createElement('span');
    langSet.classList.add(lang.toLowerCase());

    const configProps = ['lower', 'shift', 'caps', 'capsShift'];

    for (let i = 0; i < configProps.length; i += 1) {
      const langChar = document.createElement('span');
      langChar.classList.add(configProps[i]);

      const propOfConfig = `${configProps[i]}${lang}`;
      langChar.textContent = buttonConfig[propOfConfig][this.row][this.col];

      langSet.append(langChar);
    }

    return langSet;
  }
}
