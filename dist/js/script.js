/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/


window.addEventListener('DOMContentLoaded', () => {
  // // Tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');
  function hideTabContent() {
    tabsContent.forEach(item => {
      // item.style.display = 'none'; //_ Вариант с inline стилями
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }
  function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block'; //_ Вариант с inline стилями
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent(0);
  tabsParent.addEventListener('click', event => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

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
  setClock('.timer', deadline);

  // // Используем классы для карточек

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

  const getResource = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  //_ Способ формирования карточек через классы

  // getResource('http://localhost:3000/menu').then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //   });
  // });

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

  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });

  // // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');
  // const modalCloseBtn = document.querySelector('[data-close]'); //_ Закрытие модального окна на крестик

  modalTrigger.forEach(btn => {
    //_ Открытие модального окна
    btn.addEventListener('click', () => {
      openModal();
    });
  });
  function closeModal() {
    // modal.classList.toggle('show'); //_ Вариант с toggle
    modal.classList.add('hide'); //_ Вариант с классами
    modal.classList.remove('show');
    document.body.style.overflow = ''; //_ Для включения scroll
  }
  function openModal() {
    // modal.classList.toggle('show'); //_ Вариант с toggle
    modal.classList.add('show'); //_ Вариант с классами
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //_ Для отключения scroll
    clearInterval(modalTimerId); //_ Отключение таймера для открытия окна, чтобы оно не появилось опять, если уже было открыто
  }

  // modalCloseBtn.addEventListener('click', closeModal); //_ Закрытие модального окна на крестик

  modal.addEventListener('click', e => {
    //_ Закрытие модального окна кликом на пустую область или на крестик
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    //_ Закрытие модального окна клавишей Esc, если оно открыто
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 50000); //_ Открытие модального окна через 5 секунд на сайте

  function showModalByScroll() {
    //_ Открытие модального окна после прокрутки всей страницы

    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll); //_ Удаление обработчика события, чтобы окно не открывалось повторно
    }

    //_ Вариант от ChatGPT
    // if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1) {
    //   openModal();
    //   window.removeEventListener('scroll', showModalByScroll);
    // }
  }
  window.addEventListener('scroll', showModalByScroll);

  // // Forms

  //_ Первый способ через XMLHttpRequest

  // const forms = document.querySelectorAll('form');

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

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
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

      postData('http://localhost:3000/requests', json).then(data => {
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
    openModal();
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
      closeModal();
    }, 4000);
  }

  // // Slider

  //! Первый вариант слайдера

  // const slides = document.querySelectorAll('.offer__slide'),
  //   prev = document.querySelector('.offer__slider-prev'),
  //   next = document.querySelector('.offer__slider-next'),
  //   total = document.querySelector('#total'),
  //   current = document.querySelector('#current');

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

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
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
  next.addEventListener('click', () => {
    //_ Условие для прокрутки слайда внутри slidesField('.offer__slider-inner')
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
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
    if (offset == 0) {
      offset == +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
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
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
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
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
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
});
/******/ })()
;
//# sourceMappingURL=script.js.map