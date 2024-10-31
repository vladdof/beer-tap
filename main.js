const ANGLE = 40;
const circle = document.querySelector('.circle');
const touch = document.querySelector('.touch');
const counter = document.querySelector('.counter');

initApp();

function initApp() {
    const countValue = getCounter();

    updateImage(countValue);
    addListener();
    updateCounterDisplay(countValue);
}

function addListener() {
    circle.addEventListener('click', (event) => {
        setRotation(event);
        createIncrementCount(event);
        incrementCounter();
    });
}

function setRotation(event) {
    const react = circle.getBoundingClientRect();

    const offsetX = event.clientX - react.left - react.width / 2;
    const offsetY = event.clientY - react.top - react.height / 2;

    const rotateX = (offsetY / react.height) * ANGLE;
    const rotateY = (offsetX / react.width) * -ANGLE;

    circle.style.setProperty('--rotateX', `${rotateX}deg`);
    circle.style.setProperty('--rotateY', `${rotateY}deg`);

    const timer = setTimeout(() => {
        circle.style.setProperty('--rotateX', '0deg');
        circle.style.setProperty('--rotateY', '0deg');
        clearTimeout(timer);
    }, 300);
}

function createIncrementCount (event) {
    const react = circle.getBoundingClientRect();
    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = '🍺';
    plusOne.style.left = `${event.clientX - react.left}px`;
    plusOne.style.top = `${event.clientY - react.top}px`;
    circle.parentElement.appendChild(plusOne);

    const timer2 = setTimeout(() => {
        plusOne.remove();
        clearTimeout(timer2);
    }, 300);
}

function setCounter(number) {
    localStorage.setItem('counter', number);
}

function getCounter() {
    return Number(localStorage.getItem('counter')) ?? 0;
}

function incrementCounter() {
    const countValue = getCounter() + 1;

    setCounter(countValue);
    updateCounterDisplay(countValue);
    updateImage(countValue);
}

function updateCounterDisplay(number) {
    counter.textContent = number;
}

function updateImage(countValue) {
    if (countValue >= 50) {
        touch.setAttribute('src', './assets/barn.png');
    } else {
        touch.setAttribute('src', './assets/gomer.png');
    }
}
