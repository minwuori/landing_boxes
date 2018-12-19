document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    let sliderLine = document.querySelector('.controller_line');
    let sliderController = document.querySelector('.controller');
    let imgContainer = document.querySelector('.img_container');
    let overlayImg = document.querySelector('.overlay'); // изображение-оверлей

    //Устанавливаем стартовую ширину изображения "после" (это наше изображение-оверлей) на половину ширины.
    overlayImg.style.width = 50 + '%';
    //Устанавливаем ползунок на середину полосы слайдера. От ширины полосы слайдера вычитаем половину ширины ползунка, чтобы сравнять его с центром изображений.
    sliderController.style.left = (sliderLine.offsetWidth / 2) - (sliderController.offsetWidth / 2) - 4 + 'px';

    //Вычислим заранее крайнее правое положение для ползунка и запишем в переменную. Для этого вычтем из ширины полосы слайдера ширину ползунка.
    let sliderControllerMaxRight = sliderLine.offsetWidth - sliderController.offsetWidth;

    //Отлавливаем нажатие на ползунок, затем перемещаем его.
    //1. Получаем координаты ползунка через нашу написанную функцию (.см в конце).
    //2.Так как принцип работы основан на изменении свойства left у ползунка, то для правильного позиционирования ползунка при перемещении нужно вычислить промежуток между местом клика и левой границей ползунка. Для этого из координаты клика (pageX возвращает нам число, равное горизонтальной координате курсора) вычитаем координату левой границы ползунка.
    //3. Получаем координаты полосы слайдера.
    let arr =[{up:'mouseup', down:'mousedown', move:'mousemove'}, {up:'touchend', down:'touchstart', move:'touchmove'}]; // массив для отслеживания события тач для мобильных устройств и клик для мониторов
    let moved = false; // флаг для передвижения ползунка конструктора

    for (let device of arr) {

      sliderController.addEventListener (device.down, function (e){
        moved = true;
        let sliderControllerCoords = getCoords(sliderController); //1//
        let shiftX = e.pageX - sliderControllerCoords.left; //2//
        let sliderCoords = getCoords(sliderLine); //3//

        //Функция для перемещения ползунка. В процессе перемещения мыши вычисляем координату left для положения ползунка.
        document.addEventListener (device.move, function (e){
          if (moved === true) {
            let newLeft = e.pageX - shiftX - sliderCoords.left - 4; //Вычисляем кооридинату для ползунка, вычитая из координаты текущего положения мыши по оси Х (т.к. ползунок перемещается только по горизонтали) величину отступа, рассчитанного ранее при клике на ползунок и координату левой границы полосы слайдера, т.к. ползунок движется относительно нее.
            //Если мышь ушла за пределы ширины полосы слайдера, то:
            //1. Если мышь ушла влево, то координату для ползунка ставим = 0.
            if (newLeft < 0) {
                newLeft = 0;
            }
            //2. Если мышь ушла вправо, то координату для ползунка ставим = крайнему правому положению.
            if (newLeft > sliderControllerMaxRight) {
              newLeft = sliderControllerMaxRight;
            }
            sliderController.style.left = newLeft + 'px'; //Прописываем ползунку его новую позицию
            overlayImg.style.width = newLeft + 25 + 'px'; // Изменяем ширину оверлея в зависимости от положения ползунка. Так как полоса слайдера и изображения разной ширины, то ширину оверлея нужно считать относительно ширины полосы слайдера, не забыв при этом про ширину ползунка.
          }
        });

        // Завершаем перемещение ползунка (отпускаем кнопку мыши).
        document.addEventListener (device.up, function(){
          moved = false
        });
        return false;
      });
    };


    // Функция для отключения встроенной в браузер функции Drag'n'Drop, которая конфликтует с нашей.
    sliderController.ondragstart = function() {
          return false;
    };

    //Функция для определения координат элемента. getBoundingClientRect() возвращает объект с несколькими записями ключ-значение (например, width: 10, top: 456), а именно ширину, высоту, а так же координаты границ элемента относительно окна просмотра: left это X-координата левой границы элемента, top это Y-координата верхней границы элемента.
    const getCoords = (element) => {
      let box = element.getBoundingClientRect();
      return {
        top: box.top + pageYOffset, // Возвращаем полученные координаты верхней и левой границ, добавив к ним значения текущей прокрутки //
        left: box.left + pageXOffset // страницы .pageY(Х)Offset возвращает текущую вертикальную(горизонтальную прокрутку).//
      };
    }

  //плавный скролл
  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href')

      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  /* scrollToTop */
    var scrollToTopElement = $('.scrollToTop');
    $(window).scroll(function() {
        var range = $(this).scrollTop();
        (range > 500) ? scrollToTopElement.fadeIn('1000') : scrollToTopElement.fadeOut('1000');
    });

    scrollToTopElement.on('click', function(event) {
        $('body,html').animate({
            scrollTop: 0
        }, '600');
    });
    /* end scrollToTop */
});


