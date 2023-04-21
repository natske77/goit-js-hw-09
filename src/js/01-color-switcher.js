const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let intervalId = null; // Змінна для зберігання ідентифікатора інтервалу
let isThemeChanging = false; // Змінна для відстеження стану зміни кольору


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

body.style.backgroundColor = getRandomHexColor();

startButton.addEventListener('click', () => {
  if (isThemeChanging) {
    return;
  }
  isThemeChanging = true;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 500);
});

stopButton.addEventListener('click', () => {
  isThemeChanging = false;
  clearInterval(intervalId);
});

