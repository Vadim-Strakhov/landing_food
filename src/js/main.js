//_ Auto-polyfill

// require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

//_ Для ES6 Modules

import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  //_ Для CommonJS
  // const tabs = require('./modules/tabs');
  // const calc = require('./modules/calc');
  // const cards = require('./modules/cards');
  // const forms = require('./modules/forms');
  // const modal = require('./modules/modal');
  // const slider = require('./modules/slider');
  // const timer = require('./modules/timer');
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); //_ Открытие модального окна через 50 секунд на сайте

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  calc();
  // cards(); //_ Для формирования карточек через db.json необходимо отредактировать верстку и запустить 'npm run server'
  modal('[data-modal]', '.modal', modalTimerId);
  forms('form', modalTimerId);
  timer('.timer');
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    totalCounter: '#total',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
});
