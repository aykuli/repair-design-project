'use strict'
let items = document.querySelectorAll('.slider__img--item-in-projects');
let currentItem = 0;
let isEnabled = true;

if (window.innerWidth > 1000) {
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('slider--active-in-projects');
  }
}

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;

  items[currentItem].classList.add(direction);

    if (window.innerWidth < 1000) {
      items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('slider--active-in-projects', direction);
      });
    }
}

function showItem(direction) {
  if (window.innerWidth < 1000) {
    items[currentItem].classList.add(direction, 'slider--next-in-projects');
    items[currentItem].addEventListener('animationend', function() {
      this.classList.remove('slider--next-in-projects', direction);
      this.classList.add('slider--active-in-projects');
    });
  }
  isEnabled = true;
}

function previousItem(n) {
  hideItem('slider--to-right');
  changeCurrentItem(n - 1);
  showItem('slider--from-left');
}

function nextItem(n) {
  if (window.innerWidth < 1000) {
    hideItem('slider--to-left');
    changeCurrentItem(n + 1);
    showItem('slider--from-right');
  } else {
    document.querySelector('.slider__img--items-in-projects').classList.remove('slider--null-position');
    document.querySelector('.slider__img--items-in-projects').classList.add('slider--to-right-desktop');

    document.querySelector('.slider__img--items-in-projects').addEventListener('animationend', function() {

      items[currentItem].classList.remove('first-flex');
      items[currentItem].classList.add('third-flex');

      items[ (currentItem + 1) % items.length ].classList.add('first-flex');
      items[ (currentItem + 1) % items.length ].classList.remove('second-flex');

      items[ (currentItem + 2) % items.length ].classList.add('second-flex');
      items[ (currentItem + 2) % items.length ].classList.remove('third-flex');

      this.classList.remove('slider--to-right-desktop');
      this.classList.add('slider--null-position');
      changeCurrentItem(n + 1);
    });
  }
}

document.getElementById('projectsBtnPrev').addEventListener('click', function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.getElementById('projectsBtnNext').addEventListener('click', function() {
    if (isEnabled) {
      nextItem(currentItem);
    }
});

// swiper with mouse by Shalyapin
const swipeDetect = (el) => {
  let surface = el;
  let startX =  0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function(e) {
      e.preventDefault();

      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
  });

  surface.addEventListener('mouseup', function(e) {
      e.preventDefault();

      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      // console.log('distX = ', distX);
      // console.log('distY = ', distY);
      // console.log('elapsedTime = ', elapsedTime);

      if (elapsedTime <= allowedTime) {
          if ( ( Math.abs(distX) > threshold ) && ( Math.abs(distY) <= restraint ) ) {
              if (distX > 0) {
                  if (isEnabled) {
                      previousItem(currentItem);
                  }
              } else {
                  if (isEnabled) {
                      nextItem(currentItem);
                  }
              }
          }
      }
  });

  //touch events for mobiles and tablets
  surface.addEventListener('touchstart', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('slider__btn')) {
        if (e.target.classList.contains('slider__btn--prev')) {
            if (isEnabled) {
                previousItem(currentItem);
            }
        } else if (e.target.classList.contains('slider__btn--next')) {
            if (isEnabled) {
                nextItem(currentItem);
            }
        }
    }
    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });

  surface.addEventListener('touchend', function(e) {
    e.preventDefault();

    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    // console.log('distX = ', distX);
    // console.log('distY = ', distY);
    // console.log('elapsedTime = ', elapsedTime);

    if (elapsedTime <= allowedTime) {
        if ( ( Math.abs(distX) > threshold ) && ( Math.abs(distY) <= restraint ) ) {
            if (distX > 0) {
                if (isEnabled) {
                    previousItem(currentItem);
                }
            } else {
                if (isEnabled) {
                    nextItem(currentItem);
                }
            }
        }
    }
  });
}

let el = document.querySelector('.slider');

swipeDetect(el);
// END of swiper by Shalyapin
