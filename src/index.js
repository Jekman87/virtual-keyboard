/* eslint-disable import/extensions */
import Keyboard from './Keyboard.js';

function initialize() {
  const keyboard = new Keyboard();
  keyboard.renderKeyboard();
  keyboard.addListeners();
}

document.addEventListener('DOMContentLoaded', initialize);
