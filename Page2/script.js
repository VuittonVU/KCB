let timer = 0;
let interval;

const soundEffect = document.getElementById('sound-effect');
const questionElement = document.getElementById('question');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');

function startTimer() {
    interval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

startTimer();
