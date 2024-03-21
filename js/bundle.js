/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ './src/js/modules/calc.js':
      /*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
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
            elements.forEach((elem) => {
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
              result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
              );
            } else {
              result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
              );
            }
          }
          calcTotal();

          //_ Функция для получения параметров пола и активности при выборе их на странице
          function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
            elements.forEach((elem) => {
              elem.addEventListener('click', (e) => {
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
                elements.forEach((elem) => {
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

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = calc; //_ Для ES6 Modules

        /***/
      },

    /***/ './src/js/modules/cards.js':
      /*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../services/services */ './src/js/services/services.js');

        function cards() {
          // // Cards

          //_ Способ формирования карточек через классы
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

          (0, _services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)(
            'http://localhost:3000/menu',
          ).then((data) => {
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

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = cards; //_ Для ES6 Modules

        /***/
      },

    /***/ './src/js/modules/forms.js':
      /*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./modal */ './src/js/modules/modal.js',
        );
        /* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ../services/services */ './src/js/services/services.js');

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
            // failure: 'Что-то пошло не так...',
            failure: 'Спасибо! Скоро мы с вами свяжемся', //_ Для корректного оповещения без запуска json-server
          };
          forms.forEach((item) => {
            bindPostData(item);
          });
          function bindPostData(form) {
            form.addEventListener('submit', (e) => {
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

              (0, _services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(
                'http://localhost:3000/requests',
                json,
              )
                .then((data) => {
                  console.log(data);
                  showThanksModal(message.success);
                  statusMessage.remove();
                })
                .catch(() => {
                  showThanksModal(message.failure);
                })
                .finally(() => {
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

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = forms; //_ Для ES6 Modules

        /***/
      },

    /***/ './src/js/modules/modal.js':
      /*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ closeModal: () => /* binding */ closeModal,
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */ openModal: () => /* binding */ openModal,
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
          modalTrigger.forEach((btn) => {
            //_ Открытие модального окна
            btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
          });

          // const modalCloseBtn = document.querySelector('[data-close]'); //_ Закрытие модального окна на крестик
          // modalCloseBtn.addEventListener('click', closeModal(modalSelector)); //_ Закрытие модального окна на крестик

          modal.addEventListener('click', (e) => {
            //_ Закрытие модального окна кликом на пустую область или на крестик
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
              closeModal(modalSelector);
            }
          });
          document.addEventListener('keydown', (e) => {
            //_ Закрытие модального окна клавишей Esc, если оно открыто
            if (e.code === 'Escape' && modal.classList.contains('show')) {
              closeModal(modalSelector);
            }
          });
          function showModalByScroll() {
            //_ Открытие модального окна после прокрутки всей страницы

            if (
              window.scrollY + document.documentElement.clientHeight >=
              document.documentElement.scrollHeight - 1
            ) {
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
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = modal; //_ Для ES6 Modules

        //_ Для решения ошибки с формами

        /***/
      },

    /***/ './src/js/modules/slider.js':
      /*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
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
          field,
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
          slides.forEach((slide) => {
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
            dots.forEach((dot) => (dot.style.opacity = '.5'));
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
            dots.forEach((dot) => (dot.style.opacity = '.5'));
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

          dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
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
              dots.forEach((dot) => (dot.style.opacity = '.5'));
              dots[slideIndex - 1].style.opacity = 1;
            });
          });
        }

        // module.exports = slider; //_ Для CommonJS
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = slider; //_ Для ES6 Modules

        /***/
      },

    /***/ './src/js/modules/tabs.js':
      /*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
          // // Tabs

          const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);
          function hideTabContent() {
            tabsContent.forEach((item) => {
              // item.style.display = 'none'; //_ Вариант с inline стилями
              item.classList.add('hide');
              item.classList.remove('show', 'fade');
            });
            tabs.forEach((item) => {
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
          tabsParent.addEventListener('click', (event) => {
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
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = tabs; //_ Для ES6 Modules

        /***/
      },

    /***/ './src/js/modules/timer.js':
      /*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
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
              (days = Math.floor(t / (1000 * 60 * 60 * 24))),
                (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
                (minutes = Math.floor((t / 1000 / 60) % 60)),
                (seconds = Math.floor((t / 1000) % 60));
            }
            return {
              total: t,
              days: days,
              hours: hours,
              minutes: minutes,
              seconds: seconds,
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
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = timer; //_ Для ES6 Modules

        /***/
      },

    /***/ './src/js/services/services.js':
      /*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getResource: () => /* binding */ getResource,
          /* harmony export */ postData: () => /* binding */ postData,
          /* harmony export */
        });
        const postData = async (url, data) => {
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=utf-8',
            },
            body: data,
          });
          return await res.json();
        };
        const getResource = async (url) => {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
          }
          return await res.json();
        };

        /***/
      },

    /***/ './node_modules/nodelist-foreach-polyfill/index.js':
      /*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
      /***/ () => {
        if (window.NodeList && !NodeList.prototype.forEach) {
          NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
              callback.call(thisArg, this[i], i, this);
            }
          };
        }

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule ? /******/ () => module['default'] : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    'use strict';
    /*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! nodelist-foreach-polyfill */ './node_modules/nodelist-foreach-polyfill/index.js',
      );
    /* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/ __webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./modules/tabs */ './src/js/modules/tabs.js',
    );
    /* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./modules/calc */ './src/js/modules/calc.js',
    );
    /* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./modules/cards */ './src/js/modules/cards.js',
    );
    /* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./modules/forms */ './src/js/modules/forms.js',
    );
    /* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./modules/modal */ './src/js/modules/modal.js',
    );
    /* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./modules/slider */ './src/js/modules/slider.js',
    );
    /* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./modules/timer */ './src/js/modules/timer.js',
    );
    //_ Auto-polyfill

    // require('es6-promise').polyfill();

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
      const modalTimerId = setTimeout(
        () => (0, _modules_modal__WEBPACK_IMPORTED_MODULE_5__.openModal)('.modal', modalTimerId),
        50000,
      ); //_ Открытие модального окна через 50 секунд на сайте

      (0, _modules_tabs__WEBPACK_IMPORTED_MODULE_1__['default'])(
        '.tabheader__item',
        '.tabcontent',
        '.tabheader__items',
        'tabheader__item_active',
      );
      (0, _modules_calc__WEBPACK_IMPORTED_MODULE_2__['default'])();
      // cards(); //_ Для формирования карточек через db.json необходимо отредактировать верстку и запустить 'npm run server'
      (0, _modules_modal__WEBPACK_IMPORTED_MODULE_5__['default'])(
        '[data-modal]',
        '.modal',
        modalTimerId,
      );
      (0, _modules_forms__WEBPACK_IMPORTED_MODULE_4__['default'])('form', modalTimerId);
      (0, _modules_timer__WEBPACK_IMPORTED_MODULE_7__['default'])('.timer');
      (0, _modules_slider__WEBPACK_IMPORTED_MODULE_6__['default'])({
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
  })();

  /******/
})();
//# sourceMappingURL=bundle.js.map
