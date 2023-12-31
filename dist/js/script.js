/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
/******/(() => {
  // webpackBootstrap
  /******/
  var __webpack_modules__ = {
    /***/"./src/js/modules/calc.js": (
    /*!********************************!*\
      !*** ./src/js/modules/calc.js ***!
      \********************************/
    /***/
    (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_305__) => {
      "use strict";

      __nested_webpack_require_305__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_305__.d(__nested_webpack_exports__, {
        /* harmony export */"default": () => __WEBPACK_DEFAULT_EXPORT__
        /* harmony export */
      });
      function calc() {
        // // Calculator

        const result = document.querySelector('.calculating__result span');
        let sex, height, weight, age, ratio;

        //_ Добавление в localStorage
        if (localStorage.getItem('sex')) {
          sex = localStorage.getItem('sex');
        } else {
          sex = 'female';
          localStorage.setItem('sex', 'female');
        }
        if (localStorage.getItem('ratio')) {
          ratio = localStorage.getItem('ratio');
        } else {
          ratio = 1.375;
          localStorage.setItem('ratio', 1.375);
        }

        //_ Функция для localStorage
        function initLocalSettings(selector, activeClass) {
          const elements = document.querySelectorAll(selector);
          elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
              elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
              elem.classList.add(activeClass);
            }
          });
        }
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

        //_ Функция для расчета калорий
        function calcTotal() {
          if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
          }
          if (sex === 'female') {
            result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
          } else {
            result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
          }
        }
        calcTotal();

        //_ Функция для получения параметров пола и активности при выборе их на странице
        function getStaticInformation(selector, activeClass) {
          const elements = document.querySelectorAll(selector);
          elements.forEach(elem => {
            elem.addEventListener('click', e => {
              if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                //_ Добавление данных в localStorage
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
              } else {
                sex = e.target.getAttribute('id');
                //_ Добавление данных в localStorage
                localStorage.setItem('sex', e.target.getAttribute('id'));
              }
              console.log(ratio, sex);
              elements.forEach(elem => {
                elem.classList.remove(activeClass);
              });
              e.target.classList.add(activeClass);
              calcTotal();
            });
          });
        }
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
        function getDynamicInformation(selector) {
          const input = document.querySelector(selector);
          input.addEventListener('input', () => {
            //_ Условие для проверки введенных значений в input
            if (input.value.match(/\D/g)) {
              input.style.border = '1px solid red';
            } else {
              input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
              case 'height':
                height = +input.value;
                break;
              case 'weight':
                weight = +input.value;
                break;
              case 'age':
                age = +input.value;
                break;
            }
            calcTotal();
          });
        }
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
      }

      // module.exports = calc; //_ Для CommonJS

      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = calc; //_ Для ES6 Modules

      /***/
    }),
    /***/"./src/js/modules/cards.js": (
    /*!*********************************!*\
      !*** ./src/js/modules/cards.js ***!
      \*********************************/
    /***/
    (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_4953__) => {
      "use strict";

      __nested_webpack_require_4953__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_4953__.d(__nested_webpack_exports__, {
        /* harmony export */"default": () => __WEBPACK_DEFAULT_EXPORT__
        /* harmony export */
      });
      /* harmony import */
      var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_4953__( /*! ../services/services */"./src/js/services/services.js");
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
              this.classes.forEach(className => element.classList.add(className));
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

        (0, _services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
          data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
          }) => {
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

      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = cards; //_ Для ES6 Modules

      /***/
    }),
    /***/"./src/js/modules/forms.js": (
    /*!*********************************!*\
      !*** ./src/js/modules/forms.js ***!
      \*********************************/
    /***/
    (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_9334__) => {
      "use strict";

      __nested_webpack_require_9334__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_9334__.d(__nested_webpack_exports__, {
        /* harmony export */"default": () => __WEBPACK_DEFAULT_EXPORT__
        /* harmony export */
      });
      /* harmony import */
      var _modal__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_9334__( /*! ./modal */"./src/js/modules/modal.js");
      /* harmony import */
      var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_9334__( /*! ../services/services */"./src/js/services/services.js");
      function forms(formSelector, modalTimerId) {
        // // Forms

        //_ Первый способ через XMLHttpRequest

        // const forms = document.querySelectorAll(formSelector);

        // const message = {
        //   loading: 'img/form/spinner.svg',
        //   success: 'Спасибо! Скоро мы с вами свяжемся',
        //   failure: 'Что-то пошло не так...',
        // };

        // forms.forEach((item) => {
        //   bindPostData(item);
        // });

        // function bindPostData(form) {
        //   form.addEventListener('submit', (e) => {
        //     e.preventDefault();

        //     let statusMessage = document.createElement('img');
        //     statusMessage.src = message.loading;
        //     statusMessage.style.cssText = `
        //     display: block;
        //     margin: 0 auto;
        //     `;
        //     // form.append(statusMessage);
        //     form.insertAdjacentElement('afterend', statusMessage);

        //     const request = new XMLHttpRequest();
        //     request.open('POST', 'server.php');

        //     request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //_ Для формата json
        //     const formData = new FormData(form);

        //     const object = {}; //_ Для формата json
        //     formData.forEach(function (value, key) {
        //       object[key] = value;
        //     });

        //     const json = JSON.stringify(object);

        //     request.send(json);

        //     request.addEventListener('load', () => {
        //       if (request.status === 200) {
        //         console.log(request.response);
        //         showThanksModal(message.success);
        //         statusMessage.remove();
        //         form.reset();
        //       } else {
        //         showThanksModal(message.failure);
        //       }
        //     });
        //   });
        // }

        //_ Второй способ через fetch

        const forms = document.querySelectorAll(formSelector);
        const message = {
          loading: 'img/form/spinner.svg',
          success: 'Спасибо! Скоро мы с вами свяжемся',
          failure: 'Что-то пошло не так...'
        };
        forms.forEach(item => {
          bindPostData(item);
        });
        function bindPostData(form) {
          form.addEventListener('submit', e => {
            e.preventDefault();
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            //_ Способ без функции postData

            // fetch('server.php', {
            //   method: 'POST',
            //   //! Способ с formData
            //   //! body: formData,
            //   //! Способ с json
            //   headers: {
            //     'Content-type': 'application/json; charset=utf-8',
            //   },
            //   body: json,
            // })
            //   .then((data) => data.text())
            //   .then((data) => {
            //     console.log(data);
            //     showThanksModal(message.success);

            //     statusMessage.remove();
            //   })
            //   .catch(() => {
            //     showThanksModal(message.failure);
            //   })
            //   .finally(() => {
            //     form.reset();
            //   });

            //_ Способ через функцию postData

            (0, _services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
              console.log(data);
              showThanksModal(message.success);
              statusMessage.remove();
            }).catch(() => {
              showThanksModal(message.failure);
            }).finally(() => {
              form.reset();
            });
          });
        }

        //_ Проверка json сервера

        // fetch('http://localhost:3000/menu')
        //   .then((data) => data.json())
        //   .then((res) => console.log(res));

        //_ Настройка оповещения пользователя

        function showThanksModal(message) {
          const prevModalDialog = document.querySelector('.modal__dialog');
          prevModalDialog.classList.add('hide');
          (0, _modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
          const thanksModal = document.createElement('div');
          thanksModal.classList.add('modal__dialog');
          thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>×</div>
      <div class="modal__title">${message}</div>
    </div>`;
          document.querySelector('.modal').append(thanksModal);
          setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0, _modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
          }, 4000);
        }
      }

      // module.exports = forms; //_ Для CommonJS

      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = forms; //_ Для ES6 Modules

      /***/
    }),
    /***/"./src/js/modules/modal.js": (
    /*!*********************************!*\
      !*** ./src/js/modules/modal.js ***!
      \*********************************/
    /***/
    (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_15547__) => {
      "use strict";

      __nested_webpack_require_15547__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_15547__.d(__nested_webpack_exports__, {
        /* harmony export */closeModal: () => ( /* binding */closeModal),
        /* harmony export */"default": () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */openModal: () => ( /* binding */openModal)
        /* harmony export */
      });
      function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        // modal.classList.toggle('show'); //_ Вариант с toggle
        modal.classList.add('hide'); //_ Вариант с классами
        modal.classList.remove('show');
        document.body.style.overflow = ''; //_ Для включения scroll
      }
      function openModal(modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector, modalTimerId);
        // modal.classList.toggle('show'); //_ Вариант с toggle
        modal.classList.add('show'); //_ Вариант с классами
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; //_ Для отключения scroll

        // console.log(modalTimerId);
        if (modalTimerId) {
          clearInterval(modalTimerId); //_ Отключение таймера для открытия окна, чтобы оно не появилось опять, если уже было открыто
        }
      }
      function modal(triggerSelector, modalSelector, modalTimerId) {
        // // Modal

        const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
        modalTrigger.forEach(btn => {
          //_ Открытие модального окна
          btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
        });

        // const modalCloseBtn = document.querySelector('[data-close]'); //_ Закрытие модального окна на крестик
        // modalCloseBtn.addEventListener('click', closeModal(modalSelector)); //_ Закрытие модального окна на крестик

        modal.addEventListener('click', e => {
          //_ Закрытие модального окна кликом на пустую область или на крестик
          if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
          }
        });
        document.addEventListener('keydown', e => {
          //_ Закрытие модального окна клавишей Esc, если оно открыто
          if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
          }
        });
        function showModalByScroll() {
          //_ Открытие модального окна после прокрутки всей страницы

          if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //_ Удаление обработчика события, чтобы окно не открывалось повторно
          }

          //_ Вариант от ChatGPT
          // if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1) {
          //   openModal(modalSelector, modalTimerId);
          //   window.removeEventListener('scroll', showModalByScroll);
          // }
        }
        window.addEventListener('scroll', showModalByScroll);
      }

      // module.exports = modal; //_ Для CommonJS
      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = modal; //_ Для ES6 Modules

      //_ Для решения ошибки с формами

      /***/
    }),
    /***/"./src/js/modules/slider.js": (
    /*!**********************************!*\
      !*** ./src/js/modules/slider.js ***!
      \**********************************/
    /***/
    (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_19291__) => {
      "use strict";

      __nested_webpack_require_19291__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_19291__.d(__nested_webpack_exports__, {
        /* harmony export */"default": () => __WEBPACK_DEFAULT_EXPORT__
        /* harmony export */
      });
      function slider({
        container,
        slide,
        nextArrow,
        prevArrow,
        totalCounter,
        currentCounter,
        wrapper,
        field
      }) {
        // // Slider

        //! Первый вариант слайдера

        // const slides = document.querySelectorAll(slide),
        //   prev = document.querySelector(prevArrow),
        //   next = document.querySelector(nextArrow),
        //   total = document.querySelector(totalCounter),
        //   current = document.querySelector(currentCounter);

        // let slideIndex = 1;

        // showSlides(slideIndex);

        // //_ Необязательное условие для отображения количества всех слайдов и добавления 0 в однозначные числа в верстке

        // if (slides.length < 10) {
        //   total.textContent = `0${slides.length}`;
        // } else {
        //   total.textContent = slides.length;
        // }

        // //_ Условие для определения граничного значения
        // function showSlides(n) {
        //   if (n > slides.length) {
        //     slideIndex = 1;
        //   }
        //   if (n < 1) {
        //     slideIndex = slides.length;
        //   }
        //   slides.forEach((item) => (item.style.display = 'none'));
        //   slides[slideIndex - 1].style.display = 'block';

        //   //_ Условие для отображения номера текущего слайда
        //   if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        //   } else {
        //     current.textContent = slideIndex;
        //   }
        // }

        // function plusSlides(n) {
        //   showSlides((slideIndex += n));
        // }

        // prev.addEventListener('click', () => {
        //   plusSlides(-1);
        // });
        // next.addEventListener('click', () => {
        //   plusSlides(1);
        // });

        //! Второй вариант слайдера с анимацией

        const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
        let slideIndex = 1;
        let offset = 0;

        // //_ Условие для отображения количества всех слайдов и номера текущего слайда в зависимости от указанного значения slideIndex

        if (slides.length < 10) {
          total.textContent = `0${slides.length}`;
          current.textContent = `0${slideIndex}`;
        } else {
          total.textContent = slides.length;
          current.textContent = slideIndex;
        }

        //_ Формирование окна показа
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        //_ Скрытие лишних слайдов
        slidesWrapper.style.overflow = 'hidden';
        slides.forEach(slide => {
          slide.style.width = width;
        });

        //_ Функция на регулярное выражение
        function deleteNotDigits(str) {
          return +str.replace(/\D/g, '');
        }
        next.addEventListener('click', () => {
          //_ Условие для прокрутки слайда внутри slidesField('.offer__slider-inner')

          // if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
          //   offset = 0;
          // } else {
          //   offset += +width.slice(0, width.length - 2);
          // }

          //! Вариант с функцией на регулярное выражение
          if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
          } else {
            offset += deleteNotDigits(width);
          }

          //_ Смещение слайдера по оси X в зависимости от выбранного слайда
          slidesField.style.transform = `translateX(-${offset}px)`;

          //_ Условия для отображения номера текущего слайда
          if (slideIndex == slides.length) {
            slideIndex = 1;
          } else {
            slideIndex++;
          }
          if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
          } else {
            current.textContent = slideIndex;
          }

          //_ Отображение точек
          dots.forEach(dot => dot.style.opacity = '.5');
          dots[slideIndex - 1].style.opacity = 1;
        });
        prev.addEventListener('click', () => {
          //_ Условие для прокрутки слайда внутри slidesField('.offer__slider-inner')

          // if (offset == 0) {
          //   offset == +width.slice(0, width.length - 2) * (slides.length - 1);
          // } else {
          //   offset -= +width.slice(0, width.length - 2);
          // }

          //! Вариант с функцией на регулярное выражение
          if (offset == 0) {
            offset == deleteNotDigits(width) * (slides.length - 1);
          } else {
            offset -= deleteNotDigits(width);
          }

          //_ Смещение слайдера по оси X в зависимости от выбранного слайда
          slidesField.style.transform = `translateX(-${offset}px)`;

          //_ Условия для отображения номера текущего слайда
          if (slideIndex == 1) {
            slideIndex = slides.length;
          } else {
            slideIndex--;
          }
          if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
          } else {
            current.textContent = slideIndex;
          }

          //_ Отображение точек
          dots.forEach(dot => dot.style.opacity = '.5');
          dots[slideIndex - 1].style.opacity = 1;
        });

        //_ Добавление точек в слайдер

        slider.style.position = 'relative';
        const indicators = document.createElement('ol'),
          dots = [];
        indicators.classList.add('carousel-indicators');
        //_! Когда нет доступа к стилям
        // indicators.style.cssText = `
        //       position: absolute;
        //       right: 0;
        //       bottom: 0;
        //       left: 0;
        //       z-index: 15;
        //       display: flex;
        //       justify-content: center;
        //       margin-right: 15%;
        //       margin-left: 15%;
        //       list-style: none;
        // `;
        slider.append(indicators);
        for (let i = 0; i < slides.length; i++) {
          const dot = document.createElement('li');
          dot.setAttribute('data-slide-to', i + 1);
          //_! Когда нет доступа к стилям
          // dot.style.cssText = `
          //         box-sizing: content-box;
          //         flex: 0 1 auto;
          //         width: 30px;
          //         height: 6px;
          //         margin-right: 3px;
          //         margin-left: 3px;
          //         cursor: pointer;
          //         background-color: #fff;
          //         background-clip: padding-box;
          //         border-top: 10px solid transparent;
          //         border-bottom: 10px solid transparent;
          //         opacity: .5;
          //         transition: opacity .6s ease;
          // `;
          if (i == 0) {
            dot.style.opacity = 1;
          }
          indicators.append(dot);
          dot.classList.add('dot');
          dots.push(dot);
        }

        //_ Добавление активности для точек

        dots.forEach(dot => {
          dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            // offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            //! Вариант с функцией на регулярное выражение
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slides.length < 10) {
              current.textContent = `0${slideIndex}`;
            } else {
              current.textContent = slideIndex;
            }
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
          });
        });
      }

      // module.exports = slider; //_ Для CommonJS
      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = slider; //_ Для ES6 Modules

      /***/
    }),
    /***/"./src/js/modules/tabs.js": (
    /*!********************************!*\
      !*** ./src/js/modules/tabs.js ***!
      \********************************/
    /***/
    (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_28251__) => {
      "use strict";

      __nested_webpack_require_28251__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_28251__.d(__nested_webpack_exports__, {
        /* harmony export */"default": () => __WEBPACK_DEFAULT_EXPORT__
        /* harmony export */
      });
      function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        // // Tabs

        const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
        function hideTabContent() {
          tabsContent.forEach(item => {
            // item.style.display = 'none'; //_ Вариант с inline стилями
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
          });
          tabs.forEach(item => {
            item.classList.remove(activeClass);
          });
        }
        function showTabContent(i = 0) {
          // tabsContent[i].style.display = 'block'; //_ Вариант с inline стилями
          tabsContent[i].classList.add('show', 'fade');
          tabsContent[i].classList.remove('hide');
          tabs[i].classList.add(activeClass);
        }
        hideTabContent();
        showTabContent(0);
        tabsParent.addEventListener('click', event => {
          const target = event.target;
          if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
              if (target == item) {
                hideTabContent();
                showTabContent(i);
              }
            });
          }
        });
      }

      // module.exports = tabs; //_ Для CommonJS
      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = tabs; //_ Для ES6 Modules

      /***/
    }),
    /***/"./src/js/modules/timer.js": (
    /*!*********************************!*\
      !*** ./src/js/modules/timer.js ***!
      \*********************************/
    /***/
    (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_30328__) => {
      "use strict";

      __nested_webpack_require_30328__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_30328__.d(__nested_webpack_exports__, {
        /* harmony export */"default": () => __WEBPACK_DEFAULT_EXPORT__
        /* harmony export */
      });
      function timer(id) {
        // // Timer

        // const deadline = '2023-12-10'; //_ Точное значение даты

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate() + 1).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; //_ Значение до конца текущего дня
        const deadline = formattedDate;
        function getTimeRemaining(endtime) {
          let days, hours, minutes, seconds;
          const t = Date.parse(endtime) - Date.parse(new Date());
          if (t <= 0) {
            //_ Условие для обработки прошедшей даты и показа 0, если указана конкретная дата
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
          } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / 1000 / 60 % 60), seconds = Math.floor(t / 1000 % 60);
          }
          return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          };
        }
        function getZero(num) {
          //_ Функция для добавления 0 в однозначные числа в таймере на странице
          if (num >= 0 && num < 10) {
            return `0${num}`;
          } else {
            return num;
          }
        }
        function setClock(selector, endtime) {
          const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
          updateClock(); //_  Для моментального запуска таймера на странице

          function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
              clearInterval(timeInterval);
            }
          }
        }
        setClock(id, deadline);
      }

      // module.exports = timer; //_ Для CommonJS
      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = timer; //_ Для ES6 Modules

      /***/
    }),
    /***/"./src/js/services/services.js": (
    /*!*************************************!*\
      !*** ./src/js/services/services.js ***!
      \*************************************/
    /***/
    (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_33404__) => {
      "use strict";

      __nested_webpack_require_33404__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_33404__.d(__nested_webpack_exports__, {
        /* harmony export */getResource: () => ( /* binding */getResource),
        /* harmony export */postData: () => ( /* binding */postData)
        /* harmony export */
      });
      const postData = async (url, data) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          },
          body: data
        });
        return await res.json();
      };
      const getResource = async url => {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
      };

      /***/
    }),
    /***/"./node_modules/es6-promise/dist/es6-promise.js": (
    /*!******************************************************!*\
      !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
      \******************************************************/
    /***/
    function (module, __unused_webpack_exports, __nested_webpack_require_34606__) {
      /*!
       * @overview es6-promise - a tiny implementation of Promises/A+.
       * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
       * @license   Licensed under MIT license
       *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
       * @version   v4.2.8+1e68dce6
       */

      (function (global, factory) {
         true ? module.exports = factory() : 0;
      })(this, function () {
        'use strict';

        function objectOrFunction(x) {
          var type = typeof x;
          return x !== null && (type === 'object' || type === 'function');
        }
        function isFunction(x) {
          return typeof x === 'function';
        }
        var _isArray = void 0;
        if (Array.isArray) {
          _isArray = Array.isArray;
        } else {
          _isArray = function (x) {
            return Object.prototype.toString.call(x) === '[object Array]';
          };
        }
        var isArray = _isArray;
        var len = 0;
        var vertxNext = void 0;
        var customSchedulerFn = void 0;
        var asap = function asap(callback, arg) {
          queue[len] = callback;
          queue[len + 1] = arg;
          len += 2;
          if (len === 2) {
            // If len is 2, that means that we need to schedule an async flush.
            // If additional callbacks are queued before the queue is flushed, they
            // will be processed by this flush that we are scheduling.
            if (customSchedulerFn) {
              customSchedulerFn(flush);
            } else {
              scheduleFlush();
            }
          }
        };
        function setScheduler(scheduleFn) {
          customSchedulerFn = scheduleFn;
        }
        function setAsap(asapFn) {
          asap = asapFn;
        }
        var browserWindow = typeof window !== 'undefined' ? window : undefined;
        var browserGlobal = browserWindow || {};
        var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
        var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

        // test for web worker but not in IE10
        var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

        // node
        function useNextTick() {
          // node version 0.10.x displays a deprecation warning when nextTick is used recursively
          // see https://github.com/cujojs/when/issues/410 for details
          return function () {
            return process.nextTick(flush);
          };
        }

        // vertx
        function useVertxTimer() {
          if (typeof vertxNext !== 'undefined') {
            return function () {
              vertxNext(flush);
            };
          }
          return useSetTimeout();
        }
        function useMutationObserver() {
          var iterations = 0;
          var observer = new BrowserMutationObserver(flush);
          var node = document.createTextNode('');
          observer.observe(node, {
            characterData: true
          });
          return function () {
            node.data = iterations = ++iterations % 2;
          };
        }

        // web worker
        function useMessageChannel() {
          var channel = new MessageChannel();
          channel.port1.onmessage = flush;
          return function () {
            return channel.port2.postMessage(0);
          };
        }
        function useSetTimeout() {
          // Store setTimeout reference so es6-promise will be unaffected by
          // other code modifying setTimeout (like sinon.useFakeTimers())
          var globalSetTimeout = setTimeout;
          return function () {
            return globalSetTimeout(flush, 1);
          };
        }
        var queue = new Array(1000);
        function flush() {
          for (var i = 0; i < len; i += 2) {
            var callback = queue[i];
            var arg = queue[i + 1];
            callback(arg);
            queue[i] = undefined;
            queue[i + 1] = undefined;
          }
          len = 0;
        }
        function attemptVertx() {
          try {
            var vertx = Function('return this')().require('vertx');
            vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return useVertxTimer();
          } catch (e) {
            return useSetTimeout();
          }
        }
        var scheduleFlush = void 0;
        // Decide what async method to use to triggering processing of queued callbacks:
        if (isNode) {
          scheduleFlush = useNextTick();
        } else if (BrowserMutationObserver) {
          scheduleFlush = useMutationObserver();
        } else if (isWorker) {
          scheduleFlush = useMessageChannel();
        } else if (browserWindow === undefined && "function" === 'function') {
          scheduleFlush = attemptVertx();
        } else {
          scheduleFlush = useSetTimeout();
        }
        function then(onFulfillment, onRejection) {
          var parent = this;
          var child = new this.constructor(noop);
          if (child[PROMISE_ID] === undefined) {
            makePromise(child);
          }
          var _state = parent._state;
          if (_state) {
            var callback = arguments[_state - 1];
            asap(function () {
              return invokeCallback(_state, child, callback, parent._result);
            });
          } else {
            subscribe(parent, child, onFulfillment, onRejection);
          }
          return child;
        }

        /**
          `Promise.resolve` returns a promise that will become resolved with the
          passed `value`. It is shorthand for the following:
        
          ```javascript
          let promise = new Promise(function(resolve, reject){
            resolve(1);
          });
        
          promise.then(function(value){
            // value === 1
          });
          ```
        
          Instead of writing the above, your code now simply becomes the following:
        
          ```javascript
          let promise = Promise.resolve(1);
        
          promise.then(function(value){
            // value === 1
          });
          ```
        
          @method resolve
          @static
          @param {Any} value value that the returned promise will be resolved with
          Useful for tooling.
          @return {Promise} a promise that will become fulfilled with the given
          `value`
        */
        function resolve$1(object) {
          /*jshint validthis:true */
          var Constructor = this;
          if (object && typeof object === 'object' && object.constructor === Constructor) {
            return object;
          }
          var promise = new Constructor(noop);
          resolve(promise, object);
          return promise;
        }
        var PROMISE_ID = Math.random().toString(36).substring(2);
        function noop() {}
        var PENDING = void 0;
        var FULFILLED = 1;
        var REJECTED = 2;
        function selfFulfillment() {
          return new TypeError("You cannot resolve a promise with itself");
        }
        function cannotReturnOwn() {
          return new TypeError('A promises callback cannot return that same promise.');
        }
        function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
          try {
            then$$1.call(value, fulfillmentHandler, rejectionHandler);
          } catch (e) {
            return e;
          }
        }
        function handleForeignThenable(promise, thenable, then$$1) {
          asap(function (promise) {
            var sealed = false;
            var error = tryThen(then$$1, thenable, function (value) {
              if (sealed) {
                return;
              }
              sealed = true;
              if (thenable !== value) {
                resolve(promise, value);
              } else {
                fulfill(promise, value);
              }
            }, function (reason) {
              if (sealed) {
                return;
              }
              sealed = true;
              reject(promise, reason);
            }, 'Settle: ' + (promise._label || ' unknown promise'));
            if (!sealed && error) {
              sealed = true;
              reject(promise, error);
            }
          }, promise);
        }
        function handleOwnThenable(promise, thenable) {
          if (thenable._state === FULFILLED) {
            fulfill(promise, thenable._result);
          } else if (thenable._state === REJECTED) {
            reject(promise, thenable._result);
          } else {
            subscribe(thenable, undefined, function (value) {
              return resolve(promise, value);
            }, function (reason) {
              return reject(promise, reason);
            });
          }
        }
        function handleMaybeThenable(promise, maybeThenable, then$$1) {
          if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
            handleOwnThenable(promise, maybeThenable);
          } else {
            if (then$$1 === undefined) {
              fulfill(promise, maybeThenable);
            } else if (isFunction(then$$1)) {
              handleForeignThenable(promise, maybeThenable, then$$1);
            } else {
              fulfill(promise, maybeThenable);
            }
          }
        }
        function resolve(promise, value) {
          if (promise === value) {
            reject(promise, selfFulfillment());
          } else if (objectOrFunction(value)) {
            var then$$1 = void 0;
            try {
              then$$1 = value.then;
            } catch (error) {
              reject(promise, error);
              return;
            }
            handleMaybeThenable(promise, value, then$$1);
          } else {
            fulfill(promise, value);
          }
        }
        function publishRejection(promise) {
          if (promise._onerror) {
            promise._onerror(promise._result);
          }
          publish(promise);
        }
        function fulfill(promise, value) {
          if (promise._state !== PENDING) {
            return;
          }
          promise._result = value;
          promise._state = FULFILLED;
          if (promise._subscribers.length !== 0) {
            asap(publish, promise);
          }
        }
        function reject(promise, reason) {
          if (promise._state !== PENDING) {
            return;
          }
          promise._state = REJECTED;
          promise._result = reason;
          asap(publishRejection, promise);
        }
        function subscribe(parent, child, onFulfillment, onRejection) {
          var _subscribers = parent._subscribers;
          var length = _subscribers.length;
          parent._onerror = null;
          _subscribers[length] = child;
          _subscribers[length + FULFILLED] = onFulfillment;
          _subscribers[length + REJECTED] = onRejection;
          if (length === 0 && parent._state) {
            asap(publish, parent);
          }
        }
        function publish(promise) {
          var subscribers = promise._subscribers;
          var settled = promise._state;
          if (subscribers.length === 0) {
            return;
          }
          var child = void 0,
            callback = void 0,
            detail = promise._result;
          for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];
            if (child) {
              invokeCallback(settled, child, callback, detail);
            } else {
              callback(detail);
            }
          }
          promise._subscribers.length = 0;
        }
        function invokeCallback(settled, promise, callback, detail) {
          var hasCallback = isFunction(callback),
            value = void 0,
            error = void 0,
            succeeded = true;
          if (hasCallback) {
            try {
              value = callback(detail);
            } catch (e) {
              succeeded = false;
              error = e;
            }
            if (promise === value) {
              reject(promise, cannotReturnOwn());
              return;
            }
          } else {
            value = detail;
          }
          if (promise._state !== PENDING) {
            // noop
          } else if (hasCallback && succeeded) {
            resolve(promise, value);
          } else if (succeeded === false) {
            reject(promise, error);
          } else if (settled === FULFILLED) {
            fulfill(promise, value);
          } else if (settled === REJECTED) {
            reject(promise, value);
          }
        }
        function initializePromise(promise, resolver) {
          try {
            resolver(function resolvePromise(value) {
              resolve(promise, value);
            }, function rejectPromise(reason) {
              reject(promise, reason);
            });
          } catch (e) {
            reject(promise, e);
          }
        }
        var id = 0;
        function nextId() {
          return id++;
        }
        function makePromise(promise) {
          promise[PROMISE_ID] = id++;
          promise._state = undefined;
          promise._result = undefined;
          promise._subscribers = [];
        }
        function validationError() {
          return new Error('Array Methods must be provided an Array');
        }
        var Enumerator = function () {
          function Enumerator(Constructor, input) {
            this._instanceConstructor = Constructor;
            this.promise = new Constructor(noop);
            if (!this.promise[PROMISE_ID]) {
              makePromise(this.promise);
            }
            if (isArray(input)) {
              this.length = input.length;
              this._remaining = input.length;
              this._result = new Array(this.length);
              if (this.length === 0) {
                fulfill(this.promise, this._result);
              } else {
                this.length = this.length || 0;
                this._enumerate(input);
                if (this._remaining === 0) {
                  fulfill(this.promise, this._result);
                }
              }
            } else {
              reject(this.promise, validationError());
            }
          }
          Enumerator.prototype._enumerate = function _enumerate(input) {
            for (var i = 0; this._state === PENDING && i < input.length; i++) {
              this._eachEntry(input[i], i);
            }
          };
          Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
            var c = this._instanceConstructor;
            var resolve$$1 = c.resolve;
            if (resolve$$1 === resolve$1) {
              var _then = void 0;
              var error = void 0;
              var didError = false;
              try {
                _then = entry.then;
              } catch (e) {
                didError = true;
                error = e;
              }
              if (_then === then && entry._state !== PENDING) {
                this._settledAt(entry._state, i, entry._result);
              } else if (typeof _then !== 'function') {
                this._remaining--;
                this._result[i] = entry;
              } else if (c === Promise$1) {
                var promise = new c(noop);
                if (didError) {
                  reject(promise, error);
                } else {
                  handleMaybeThenable(promise, entry, _then);
                }
                this._willSettleAt(promise, i);
              } else {
                this._willSettleAt(new c(function (resolve$$1) {
                  return resolve$$1(entry);
                }), i);
              }
            } else {
              this._willSettleAt(resolve$$1(entry), i);
            }
          };
          Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
            var promise = this.promise;
            if (promise._state === PENDING) {
              this._remaining--;
              if (state === REJECTED) {
                reject(promise, value);
              } else {
                this._result[i] = value;
              }
            }
            if (this._remaining === 0) {
              fulfill(promise, this._result);
            }
          };
          Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
            var enumerator = this;
            subscribe(promise, undefined, function (value) {
              return enumerator._settledAt(FULFILLED, i, value);
            }, function (reason) {
              return enumerator._settledAt(REJECTED, i, reason);
            });
          };
          return Enumerator;
        }();

        /**
          `Promise.all` accepts an array of promises, and returns a new promise which
          is fulfilled with an array of fulfillment values for the passed promises, or
          rejected with the reason of the first passed promise to be rejected. It casts all
          elements of the passed iterable to promises as it runs this algorithm.
        
          Example:
        
          ```javascript
          let promise1 = resolve(1);
          let promise2 = resolve(2);
          let promise3 = resolve(3);
          let promises = [ promise1, promise2, promise3 ];
        
          Promise.all(promises).then(function(array){
            // The array here would be [ 1, 2, 3 ];
          });
          ```
        
          If any of the `promises` given to `all` are rejected, the first promise
          that is rejected will be given as an argument to the returned promises's
          rejection handler. For example:
        
          Example:
        
          ```javascript
          let promise1 = resolve(1);
          let promise2 = reject(new Error("2"));
          let promise3 = reject(new Error("3"));
          let promises = [ promise1, promise2, promise3 ];
        
          Promise.all(promises).then(function(array){
            // Code here never runs because there are rejected promises!
          }, function(error) {
            // error.message === "2"
          });
          ```
        
          @method all
          @static
          @param {Array} entries array of promises
          @param {String} label optional string for labeling the promise.
          Useful for tooling.
          @return {Promise} promise that is fulfilled when all `promises` have been
          fulfilled, or rejected if any of them become rejected.
          @static
        */
        function all(entries) {
          return new Enumerator(this, entries).promise;
        }

        /**
          `Promise.race` returns a new promise which is settled in the same way as the
          first passed promise to settle.
        
          Example:
        
          ```javascript
          let promise1 = new Promise(function(resolve, reject){
            setTimeout(function(){
              resolve('promise 1');
            }, 200);
          });
        
          let promise2 = new Promise(function(resolve, reject){
            setTimeout(function(){
              resolve('promise 2');
            }, 100);
          });
        
          Promise.race([promise1, promise2]).then(function(result){
            // result === 'promise 2' because it was resolved before promise1
            // was resolved.
          });
          ```
        
          `Promise.race` is deterministic in that only the state of the first
          settled promise matters. For example, even if other promises given to the
          `promises` array argument are resolved, but the first settled promise has
          become rejected before the other promises became fulfilled, the returned
          promise will become rejected:
        
          ```javascript
          let promise1 = new Promise(function(resolve, reject){
            setTimeout(function(){
              resolve('promise 1');
            }, 200);
          });
        
          let promise2 = new Promise(function(resolve, reject){
            setTimeout(function(){
              reject(new Error('promise 2'));
            }, 100);
          });
        
          Promise.race([promise1, promise2]).then(function(result){
            // Code here never runs
          }, function(reason){
            // reason.message === 'promise 2' because promise 2 became rejected before
            // promise 1 became fulfilled
          });
          ```
        
          An example real-world use case is implementing timeouts:
        
          ```javascript
          Promise.race([ajax('foo.json'), timeout(5000)])
          ```
        
          @method race
          @static
          @param {Array} promises array of promises to observe
          Useful for tooling.
          @return {Promise} a promise which settles in the same way as the first passed
          promise to settle.
        */
        function race(entries) {
          /*jshint validthis:true */
          var Constructor = this;
          if (!isArray(entries)) {
            return new Constructor(function (_, reject) {
              return reject(new TypeError('You must pass an array to race.'));
            });
          } else {
            return new Constructor(function (resolve, reject) {
              var length = entries.length;
              for (var i = 0; i < length; i++) {
                Constructor.resolve(entries[i]).then(resolve, reject);
              }
            });
          }
        }

        /**
          `Promise.reject` returns a promise rejected with the passed `reason`.
          It is shorthand for the following:
        
          ```javascript
          let promise = new Promise(function(resolve, reject){
            reject(new Error('WHOOPS'));
          });
        
          promise.then(function(value){
            // Code here doesn't run because the promise is rejected!
          }, function(reason){
            // reason.message === 'WHOOPS'
          });
          ```
        
          Instead of writing the above, your code now simply becomes the following:
        
          ```javascript
          let promise = Promise.reject(new Error('WHOOPS'));
        
          promise.then(function(value){
            // Code here doesn't run because the promise is rejected!
          }, function(reason){
            // reason.message === 'WHOOPS'
          });
          ```
        
          @method reject
          @static
          @param {Any} reason value that the returned promise will be rejected with.
          Useful for tooling.
          @return {Promise} a promise rejected with the given `reason`.
        */
        function reject$1(reason) {
          /*jshint validthis:true */
          var Constructor = this;
          var promise = new Constructor(noop);
          reject(promise, reason);
          return promise;
        }
        function needsResolver() {
          throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
        }
        function needsNew() {
          throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }

        /**
          Promise objects represent the eventual result of an asynchronous operation. The
          primary way of interacting with a promise is through its `then` method, which
          registers callbacks to receive either a promise's eventual value or the reason
          why the promise cannot be fulfilled.
        
          Terminology
          -----------
        
          - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
          - `thenable` is an object or function that defines a `then` method.
          - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
          - `exception` is a value that is thrown using the throw statement.
          - `reason` is a value that indicates why a promise was rejected.
          - `settled` the final resting state of a promise, fulfilled or rejected.
        
          A promise can be in one of three states: pending, fulfilled, or rejected.
        
          Promises that are fulfilled have a fulfillment value and are in the fulfilled
          state.  Promises that are rejected have a rejection reason and are in the
          rejected state.  A fulfillment value is never a thenable.
        
          Promises can also be said to *resolve* a value.  If this value is also a
          promise, then the original promise's settled state will match the value's
          settled state.  So a promise that *resolves* a promise that rejects will
          itself reject, and a promise that *resolves* a promise that fulfills will
          itself fulfill.
        
        
          Basic Usage:
          ------------
        
          ```js
          let promise = new Promise(function(resolve, reject) {
            // on success
            resolve(value);
        
            // on failure
            reject(reason);
          });
        
          promise.then(function(value) {
            // on fulfillment
          }, function(reason) {
            // on rejection
          });
          ```
        
          Advanced Usage:
          ---------------
        
          Promises shine when abstracting away asynchronous interactions such as
          `XMLHttpRequest`s.
        
          ```js
          function getJSON(url) {
            return new Promise(function(resolve, reject){
              let xhr = new XMLHttpRequest();
        
              xhr.open('GET', url);
              xhr.onreadystatechange = handler;
              xhr.responseType = 'json';
              xhr.setRequestHeader('Accept', 'application/json');
              xhr.send();
        
              function handler() {
                if (this.readyState === this.DONE) {
                  if (this.status === 200) {
                    resolve(this.response);
                  } else {
                    reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
                  }
                }
              };
            });
          }
        
          getJSON('/posts.json').then(function(json) {
            // on fulfillment
          }, function(reason) {
            // on rejection
          });
          ```
        
          Unlike callbacks, promises are great composable primitives.
        
          ```js
          Promise.all([
            getJSON('/posts'),
            getJSON('/comments')
          ]).then(function(values){
            values[0] // => postsJSON
            values[1] // => commentsJSON
        
            return values;
          });
          ```
        
          @class Promise
          @param {Function} resolver
          Useful for tooling.
          @constructor
        */

        var Promise$1 = function () {
          function Promise(resolver) {
            this[PROMISE_ID] = nextId();
            this._result = this._state = undefined;
            this._subscribers = [];
            if (noop !== resolver) {
              typeof resolver !== 'function' && needsResolver();
              this instanceof Promise ? initializePromise(this, resolver) : needsNew();
            }
          }

          /**
          The primary way of interacting with a promise is through its `then` method,
          which registers callbacks to receive either a promise's eventual value or the
          reason why the promise cannot be fulfilled.
           ```js
          findUser().then(function(user){
            // user is available
          }, function(reason){
            // user is unavailable, and you are given the reason why
          });
          ```
           Chaining
          --------
           The return value of `then` is itself a promise.  This second, 'downstream'
          promise is resolved with the return value of the first promise's fulfillment
          or rejection handler, or rejected if the handler throws an exception.
           ```js
          findUser().then(function (user) {
            return user.name;
          }, function (reason) {
            return 'default name';
          }).then(function (userName) {
            // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
            // will be `'default name'`
          });
           findUser().then(function (user) {
            throw new Error('Found user, but still unhappy');
          }, function (reason) {
            throw new Error('`findUser` rejected and we're unhappy');
          }).then(function (value) {
            // never reached
          }, function (reason) {
            // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
            // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
          });
          ```
          If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
           ```js
          findUser().then(function (user) {
            throw new PedagogicalException('Upstream error');
          }).then(function (value) {
            // never reached
          }).then(function (value) {
            // never reached
          }, function (reason) {
            // The `PedgagocialException` is propagated all the way down to here
          });
          ```
           Assimilation
          ------------
           Sometimes the value you want to propagate to a downstream promise can only be
          retrieved asynchronously. This can be achieved by returning a promise in the
          fulfillment or rejection handler. The downstream promise will then be pending
          until the returned promise is settled. This is called *assimilation*.
           ```js
          findUser().then(function (user) {
            return findCommentsByAuthor(user);
          }).then(function (comments) {
            // The user's comments are now available
          });
          ```
           If the assimliated promise rejects, then the downstream promise will also reject.
           ```js
          findUser().then(function (user) {
            return findCommentsByAuthor(user);
          }).then(function (comments) {
            // If `findCommentsByAuthor` fulfills, we'll have the value here
          }, function (reason) {
            // If `findCommentsByAuthor` rejects, we'll have the reason here
          });
          ```
           Simple Example
          --------------
           Synchronous Example
           ```javascript
          let result;
           try {
            result = findResult();
            // success
          } catch(reason) {
            // failure
          }
          ```
           Errback Example
           ```js
          findResult(function(result, err){
            if (err) {
              // failure
            } else {
              // success
            }
          });
          ```
           Promise Example;
           ```javascript
          findResult().then(function(result){
            // success
          }, function(reason){
            // failure
          });
          ```
           Advanced Example
          --------------
           Synchronous Example
           ```javascript
          let author, books;
           try {
            author = findAuthor();
            books  = findBooksByAuthor(author);
            // success
          } catch(reason) {
            // failure
          }
          ```
           Errback Example
           ```js
           function foundBooks(books) {
           }
           function failure(reason) {
           }
           findAuthor(function(author, err){
            if (err) {
              failure(err);
              // failure
            } else {
              try {
                findBoooksByAuthor(author, function(books, err) {
                  if (err) {
                    failure(err);
                  } else {
                    try {
                      foundBooks(books);
                    } catch(reason) {
                      failure(reason);
                    }
                  }
                });
              } catch(error) {
                failure(err);
              }
              // success
            }
          });
          ```
           Promise Example;
           ```javascript
          findAuthor().
            then(findBooksByAuthor).
            then(function(books){
              // found books
          }).catch(function(reason){
            // something went wrong
          });
          ```
           @method then
          @param {Function} onFulfilled
          @param {Function} onRejected
          Useful for tooling.
          @return {Promise}
          */

          /**
          `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
          as the catch block of a try/catch statement.
          ```js
          function findAuthor(){
          throw new Error('couldn't find that author');
          }
          // synchronous
          try {
          findAuthor();
          } catch(reason) {
          // something went wrong
          }
          // async with promises
          findAuthor().catch(function(reason){
          // something went wrong
          });
          ```
          @method catch
          @param {Function} onRejection
          Useful for tooling.
          @return {Promise}
          */

          Promise.prototype.catch = function _catch(onRejection) {
            return this.then(null, onRejection);
          };

          /**
            `finally` will be invoked regardless of the promise's fate just as native
            try/catch/finally behaves
          
            Synchronous example:
          
            ```js
            findAuthor() {
              if (Math.random() > 0.5) {
                throw new Error();
              }
              return new Author();
            }
          
            try {
              return findAuthor(); // succeed or fail
            } catch(error) {
              return findOtherAuther();
            } finally {
              // always runs
              // doesn't affect the return value
            }
            ```
          
            Asynchronous example:
          
            ```js
            findAuthor().catch(function(reason){
              return findOtherAuther();
            }).finally(function(){
              // author was either found, or not
            });
            ```
          
            @method finally
            @param {Function} callback
            @return {Promise}
          */

          Promise.prototype.finally = function _finally(callback) {
            var promise = this;
            var constructor = promise.constructor;
            if (isFunction(callback)) {
              return promise.then(function (value) {
                return constructor.resolve(callback()).then(function () {
                  return value;
                });
              }, function (reason) {
                return constructor.resolve(callback()).then(function () {
                  throw reason;
                });
              });
            }
            return promise.then(callback, callback);
          };
          return Promise;
        }();
        Promise$1.prototype.then = then;
        Promise$1.all = all;
        Promise$1.race = race;
        Promise$1.resolve = resolve$1;
        Promise$1.reject = reject$1;
        Promise$1._setScheduler = setScheduler;
        Promise$1._setAsap = setAsap;
        Promise$1._asap = asap;

        /*global self*/
        function polyfill() {
          var local = void 0;
          if (typeof __nested_webpack_require_34606__.g !== 'undefined') {
            local = __nested_webpack_require_34606__.g;
          } else if (typeof self !== 'undefined') {
            local = self;
          } else {
            try {
              local = Function('return this')();
            } catch (e) {
              throw new Error('polyfill failed because global object is unavailable in this environment');
            }
          }
          var P = local.Promise;
          if (P) {
            var promiseToString = null;
            try {
              promiseToString = Object.prototype.toString.call(P.resolve());
            } catch (e) {
              // silently ignored
            }
            if (promiseToString === '[object Promise]' && !P.cast) {
              return;
            }
          }
          local.Promise = Promise$1;
        }

        // Strange compat..
        Promise$1.polyfill = polyfill;
        Promise$1.Promise = Promise$1;
        return Promise$1;
      });

      /***/
    }),
    /***/"./node_modules/nodelist-foreach-polyfill/index.js": (
    /*!*********************************************************!*\
      !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
      \*********************************************************/
    /***/
    () => {
      if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
          }
        };
      }

      /***/
    })

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __nested_webpack_require_72765__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_72765__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/
  (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__nested_webpack_require_72765__.n = module => {
      /******/var getter = module && module.__esModule ? /******/() => module['default'] : /******/() => module;
      /******/
      __nested_webpack_require_72765__.d(getter, {
        a: getter
      });
      /******/
      return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/
  (() => {
    /******/ // define getter functions for harmony exports
    /******/__nested_webpack_require_72765__.d = (exports, definition) => {
      /******/for (var key in definition) {
        /******/if (__nested_webpack_require_72765__.o(definition, key) && !__nested_webpack_require_72765__.o(exports, key)) {
          /******/Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/global */
  /******/
  (() => {
    /******/__nested_webpack_require_72765__.g = function () {
      /******/if (typeof globalThis === 'object') return globalThis;
      /******/
      try {
        /******/return this || new Function('return this')();
        /******/
      } catch (e) {
        /******/if (typeof window === 'object') return window;
        /******/
      }
      /******/
    }();
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  (() => {
    /******/__nested_webpack_require_72765__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/
  (() => {
    /******/ // define __esModule on exports
    /******/__nested_webpack_require_72765__.r = exports => {
      /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __nested_webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";

    /*!************************!*\
      !*** ./src/js/main.js ***!
      \************************/
    __nested_webpack_require_72765__.r(__nested_webpack_exports__);
    /* harmony import */
    var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_72765__( /*! nodelist-foreach-polyfill */"./node_modules/nodelist-foreach-polyfill/index.js");
    /* harmony import */
    var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_72765__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */
    var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_72765__( /*! ./modules/tabs */"./src/js/modules/tabs.js");
    /* harmony import */
    var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_72765__( /*! ./modules/calc */"./src/js/modules/calc.js");
    /* harmony import */
    var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_72765__( /*! ./modules/cards */"./src/js/modules/cards.js");
    /* harmony import */
    var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_72765__( /*! ./modules/forms */"./src/js/modules/forms.js");
    /* harmony import */
    var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_72765__( /*! ./modules/modal */"./src/js/modules/modal.js");
    /* harmony import */
    var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_72765__( /*! ./modules/slider */"./src/js/modules/slider.js");
    /* harmony import */
    var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_72765__( /*! ./modules/timer */"./src/js/modules/timer.js");
    //_ Auto-polyfill

    __nested_webpack_require_72765__( /*! es6-promise */"./node_modules/es6-promise/dist/es6-promise.js").polyfill();

    //_ Для ES6 Modules

    window.addEventListener('DOMContentLoaded', () => {
      //_ Для CommonJS
      // const tabs = require('./modules/tabs');
      // const calc = require('./modules/calc');
      // const cards = require('./modules/cards');
      // const forms = require('./modules/forms');
      // const modal = require('./modules/modal');
      // const slider = require('./modules/slider');
      // const timer = require('./modules/timer');
      const modalTimerId = setTimeout(() => (0, _modules_modal__WEBPACK_IMPORTED_MODULE_5__.openModal)('.modal', modalTimerId), 50000); //_ Открытие модального окна через 50 секунд на сайте

      (0, _modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
      (0, _modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
      // cards(); //_ Для формирования карточек через db.json npmнеобходимо отредактировать верстку и запустить 'npm run server'
      (0, _modules_modal__WEBPACK_IMPORTED_MODULE_5__["default"])('[data-modal]', '.modal', modalTimerId);
      (0, _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
      (0, _modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])('.timer');
      (0, _modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
      });
    });
  })();

  /******/
})();
/******/ })()
;
//# sourceMappingURL=script.js.map