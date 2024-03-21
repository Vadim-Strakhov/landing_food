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
export default slider; //_ Для ES6 Modules
