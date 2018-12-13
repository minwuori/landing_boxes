// var boxCircles = document.getElementsByClassName("box__header");
// var circle = document.getElementsByClassName("circle-2");
// var maxMove = boxCircles.offsetWidth / 30;
// var circleCenterX = circle.offsetLeft + (circle.offsetWidth / 2);
// var circleCenterY = circle.offsetTop + (circle.offsetHeight / 2);
// var fluidcircle = window.matchMedia("(min-width: 726px)");

// function getMousePos(xRef, yRef) {
//    let panelRect = boxCircles.getBoundingClientRect();
//    return {
    //    x: Math.floor(xRef - panelRect.left) /(panelRect.right-panelRect.left)*boxCircles.offsetWidth,
//        y: Math.floor(yRef - panelRect.top) / (panelRect.bottom -panelRect.top) * boxCircles.offsetHeight
//     };
// }

// document.body.addEventListener("mousemove", function(e) {
//   let mousePos = getMousePos(e.clientX, e.clientY),
//   distX = mousePos.x - circleCenterX,
//   distY = mousePos.y - circleCenterY;
//   if (Math.abs(distX) < 500 && distY < 200 && fluidcircle.matches) {
//   circle.style.transform = "translate("+(-1*distX)/12+"px,"+(-1*distY)/12+"px)";
//     // boxCircles.style.backgroundPosition = `calc(50% + ${distX/50}px) calc(50% + ${distY/50}px)`;
//   }
// })

$(document).ready(function() {

    var sliderLine = document.querySelector('.controller_line');
    var sliderController = document.querySelector('.controller');
    // var sliderButtonBefore = document.querySelector('.slider_button_before');
    // var sliderButtonAfter = document.querySelector('.slider_button_after');
    var imgContainer = document.querySelector('.img_container');
    var overlayImg = document.querySelector('.overlay'); // изображение-оверлей

    //Устанавливаем стартовую ширину изображения "после" (это наше изображение-оверлей) на половину ширины.
    overlayImg.style.width = 50 + '%';
    //Устанавливаем ползунок на середину полосы слайдера. От ширины полосы слайдера вычитаем половину ширины ползунка, чтобы сравнять его с центром изображений.
    sliderController.style.left = (sliderLine.offsetWidth / 2) - (sliderController.offsetWidth / 2) + 'px'; 

    //Вычислим заранее крайнее правое положение для ползунка и запишем в переменную. Для этого вычтем из ширины полосы слайдера ширину ползунка.
    var sliderControllerMaxRight = sliderLine.offsetWidth - sliderController.offsetWidth;

    // //По нажатию на кнопку "Было" ставим ширину оверлея в 0, ползунок ставим в крайнюю левую позицию, тоесть тоже в 0.
    // sliderButtonBefore.addEventListener('click', function() {
    //   overlayImg.style.width = 0 + 'px';
    //   sliderController.style.left = 0 + 'px';
    // });

    //По нажатию на кнопку "Стало" ставим ширину оверлея на максимум, ползунок уводим в крайнее правое положение.
    //1. Для этого ширину оверлея ставим равной ширине контейнера для изображений.
    //2. Подставляем рассчитанное ранее значение для крайнего правого положения для ползунка.
    // sliderButtonAfter.addEventListener('click', function() {
    //   overlayImg.style.width = imgContainer.offsetWidth + 'px'; //1//
    //   sliderController.style.left = sliderControllerMaxRight + 'px'; //2//
    // });

    //Отлавливаем нажатие на ползунок, затем перемещаем его.
    //1. Получаем координаты ползунка через нашу написанную функцию (.см в конце).
    //2. Так как принцип работы основан на изменении свойства left у ползунка, то для правильного позиционирования ползунка при перемещении нужно вычислить промежуток между местом клика и левой границей ползунка. Для этого из координаты клика (pageX возвращает нам число, равное горизонтальной координате курсора) вычитаем координату левой границы ползунка. 
    //3. Получаем координаты полосы слайдера.
    sliderController.addEventListener ('mousedown', function(e){
      var sliderControllerCoords = getCoords(sliderController); //1//
      var shiftX = e.pageX - sliderControllerCoords.left; //2//
      var sliderCoords = getCoords(sliderLine); //3//
      
      //Функция для перемещения ползунка. В процессе перемещения мыши вычисляем координату left для положения ползунка.
      document.onmousemove = function(e) {
        var newLeft = e.pageX - shiftX - sliderCoords.left; //Вычисляем кооридинату для ползунка, вычитая из координаты текущего положения мыши по оси Х (т.к. ползунок перемещается только по горизонтали) величину отступа, рассчитанного ранее при клике на ползунок и координату левой границы полосы слайдера, т.к. ползунок движется относительно нее.
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
        overlayImg.style.width = (100 / sliderControllerMaxRight) * newLeft + '%'; // Изменяем ширину оверлея в зависимости от положения ползунка. Так как полоса слайдера и изображения разной ширины, то ширину оверлея нужно считать относительно ширины полосы слайдера (430px), не забыв при этом про ширину ползунка (его ширину надо вычитать из ширины полосы (20px)). Итоговая ширина полосы, относительно которой нужно считать ширину оверлея, как раз равна координате крайнего правого положения для ползунка (410px). Вычисляем величину соотношения ширин, а затем умножаем на текущюю координату ползунка. (100 / 410) * (0 ... 410) + % = 0,244 * (10) + % = 2,44% - ширина оверлея при смещении ползунка относительно крайнего левого положения на 10px.
        }
      
      // Завершаем перемещение ползунка (отпускаем кнопку мыши).
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };
        
        return false;
    });

    // Функция для отключения встроенной в браузер функции Drag'n'Drop, которая конфликтует с нашей.
    sliderController.ondragstart = function() {
          return false;
    };

    //Функция для определения координат элемента. getBoundingClientRect() возвращает объект с несколькими записями ключ-значение (например, width: 10, top: 456), а именно ширину, высоту, а так же координаты границ элемента относительно окна просмотра: left это X-координата левой границы элемента, top это Y-координата верхней границы элемента.
    function getCoords(element) {
      var box = element.getBoundingClientRect();
      return {
        top: box.top + pageYOffset, // Возвращаем полученные координаты верхней и левой границ, добавив к ним значения текущей прокрутки //
        left: box.left + pageXOffset // страницы .pageY(Х)Offset возвращает текущую вертикальную(горизонтальную прокрутку).//
      };
    }




    $(document).on('mousemove', function (e) {
        $('.circle-1').css({
            top: e.pageY / 10 + 375
        });

        $('.circle-2').css({
            left: -e.pageX / 30 + 100,
            top: -e.pageY / 15 + 60
        });
        // $('.circle-3').css({
        //     left: e.pageX / 50 + 450,
        //     top: -e.pageY / 30 + 430
        // });
        $('.circle-5').css({
            left: e.pageX / 50 + 600,
            top: e.pageY / 50 - 350
        });
        $('.circle-4').css({
            left: e.pageX / 30,
            top: -e.pageY / 25 + 325
        });
        $('.circle-7').css({
            // right: e.pageX / 30,
            top: -e.pageY / 25 + 95
        });
        $('.circle-8').css({
            // right: e.pageX / 30,
            top: e.pageY / 25 + 800
        });
    });
});
