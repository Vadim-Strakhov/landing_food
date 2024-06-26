import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

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

      postData('http://localhost:3000/requests', json)
        .then((data) => {
          // console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          console.log(
            'На gh pages отправка формы на сервер, к сожалению, не сработает, но окно благодарности все равно появится',
          );
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
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
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 4000);
  }
}

// module.exports = forms; //_ Для CommonJS

export default forms; //_ Для ES6 Modules
