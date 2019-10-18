'use strict'
let items = document.querySelectorAll('.slider__img--item-in-projects');
console.log(`items = ${items.length}`);
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('slider--active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add(direction, 'slider--next');
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('slider--next', direction);
    this.classList.add('slider--active');
    isEnabled = true;
  });
}

function prevousItem(n) {
  hideItem('slider--to-right');
  changeCurrentItem(n - 1);
  showItem('slider--from-left');
}

function nextItem(n) {
  hideItem('slider--to-left');
  changeCurrentItem(n + 1);
  showItem('slider--from-right');
}

document.getElementById('projectsBtnPrev').addEventListener('click', function() {
  if (isEnabled) {
    prevousItem(currentItem);
  }
});

document.getElementById('projectsBtnNext').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});
