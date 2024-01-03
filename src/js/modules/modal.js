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
export default modal; //_ Для ES6 Modules

export { closeModal, openModal }; //_ Для решения ошибки с формами
