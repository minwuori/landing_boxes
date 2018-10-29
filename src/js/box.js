// var boxCircles = document.getElementsByClassName("box__header");
// var circle = document.getElementsByClassName("box__circle-2");
// var maxMove = boxCircles.offsetWidth / 30;
// var circleCenterX = circle.offsetLeft + (circle.offsetWidth / 2);
// var circleCenterY = circle.offsetTop + (circle.offsetHeight / 2);
// var fluidcircle = window.matchMedia("(min-width: 726px)");

// function getMousePos(xRef, yRef) {
  
//   let panelRect = boxCircles.getBoundingClientRect();
//   return {
// 	  x: Math.floor(xRef - panelRect.left) /(panelRect.right-panelRect.left)*boxCircles.offsetWidth,
// 	  y: Math.floor(yRef - panelRect.top) / (panelRect.bottom -panelRect.top) * boxCircles.offsetHeight
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

$(function () {
    $(document).on('mousemove', function (e) {
        $('.box__circle-1').css({
            top: e.pageY / 10 + 375
        });

        $('.box__circle-2').css({
            left: -e.pageX / 20,
            top: -e.pageY / 15 - 330
        });
        $('.box__circle-3').css({
            left: e.pageX / 50 + 450,
            top: e.pageY / 30 + 430
        });
        $('.box__circle-5').css({
            left: e.pageX / 50 + 630,
            top: e.pageY / 50 - 350
        });
        $('.box__circle-4').css({
            left: e.pageX / 30,
            top: -e.pageY / 25 + 325
        });
        $('.box__circle-7').css({
            // right: e.pageX / 30,
            top: -e.pageY / 25 + 95
        });
        $('.box__circle-8').css({
            // right: e.pageX / 30,
            top: e.pageY / 25 + 730
        });
    });
});
