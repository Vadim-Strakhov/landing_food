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

  // // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');
  function closeModal() {
    modal.classList.toggle('show'); //_ Вариант с toggle
    // modal.classList.add('hide');  //_ Вариант с классами
    // modal.classList.remove('show');
    document.body.style.overflow = ''; //_ Для включения scroll
  }
  function openModal() {
    modal.classList.toggle('show'); //_ Вариант с toggle
    // modal.classList.add('show'); //_ Вариант с классами
    // modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //_ Для отключения scroll
    clearInterval(modalTimerId); //_ Отключение таймера для открытия окна, чтобы оно не появилось опять, если уже было открыто
  }
  modalTrigger.forEach(btn => {
    //_ Открытие модального окна
    btn.addEventListener('click', () => {
      openModal();
    });
  });
  modalCloseBtn.addEventListener('click', closeModal); //_ Закрытие модального окна на крестик

  modal.addEventListener('click', e => {
    //_ Закрытие модального окна кликом на пустую область
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    //_ Закрытие модального окна клавишей Esc, если оно открыто
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 5000); //_ Открытие модального окна через 3 секунды на сайте

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
});
/******/ })()
;
//# sourceMappingURL=script.js.map