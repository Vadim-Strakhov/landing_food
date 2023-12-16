import { getResource } from '../services/services';

function cards() {
  // // Cards

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes; //_ Для добавления классов
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (!this.classes.length) {
        //_ Условие для добавление класса по умолчанию, если он не задан в параметрах
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  //_ Формирование карточек через fetch

  //! Для работы сервера необходимо запустить проект на OpenServer и ввести команду 'npm run server' которая задана в package.json
  //_ Способ формирования карточек через классы

  getResource('http://localhost:3000/menu').then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });

  //_ Способ формирования карточек без классов

  // getResource('http://localhost:3000/menu').then((data) => createCard(data));

  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const element = document.createElement('div');
  //     price = price * 27; //! Умножение по курсу валюты
  //     element.classList.add('menu__item');

  //     element.innerHTML = `
  //       <img src=${img} alt=${altimg} />
  //       <h3 class="menu__item-subtitle">${title}</h3>
  //       <div class="menu__item-descr">${descr}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //         <div class="menu__item-cost">Цена:</div>
  //         <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //       </div>
  //     `;

  //     document.querySelector('.menu .container').append(element);
  // });
  // }

  //_ Способ формирования карточек через axios

  //   axios.get('http://localhost:3000/menu').then((data) => {
  //     data.data.forEach(({ img, altimg, title, descr, price }) => {
  //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });
}

// module.exports = cards; //_ Для CommonJS

export default cards; //_ Для ES6 Modules
