const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['rgb(233, 162, 10)', 'rgb(207, 54, 54)', 'aquamarine', '#6fdf2e', '#ca2edf'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
   event.preventDefault();
   screens[0].classList.add('up');
})

//Выбор времени
timeList.addEventListener('click', event => {
   if (event.target.classList.contains('time-btn')) {
      time = parseInt(event.target.getAttribute('data-time'));
      screens[1].classList.add('up');
      startGame();
   }
})

//Нажатие на круг
board.addEventListener('click', event => {
   if(event.target.classList.contains('circle')) {
      score++
      event.target.remove();
      createRandomCircle();
   }
})

function startGame() {
   setInterval(decreaseTime, 1000);
   createRandomCircle();
   setTime(time);
}
//Событие в зависимости от времени
function decreaseTime() {
   if (time === 0) {
      endGame()
   } else {
      let current = --time;
   if (current < 5) {
      current = `0${current}`;
   }
   setTime(current);
   }
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`;
}
//Конец игры
function endGame() {
   timeEl.parentNode.classList.add('hide');
   board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`;
}
//Создание кругов
function createRandomCircle() {
   const circle = document.createElement('div');
   const size = getRandomNumber(10, 60);
   const {width, height} = board.getBoundingClientRect();
   const positionX = getRandomNumber(0, width - size);
   const positionY = getRandomNumber(0, height - size);
   const color = getRandomColor();

   circle.classList.add('circle');
   circle.style.width = `${size}px`;
   circle.style.height = `${size}px`;
   circle.style.top = `${positionY}px`;
   circle.style.left = `${positionX}px`;
   circle.style.backgroundColor = color;
   circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

   board.append(circle);
}
//Размер круга
function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
   const index = Math.floor(Math.random() * colors.length);
   return colors[index];
}