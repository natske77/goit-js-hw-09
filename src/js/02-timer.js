import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};



const dateTime = document.querySelector("#datetime-picker");
const timer = document.querySelector(".timer");
const flatpickrEl = flatpickr(dateTime, options);
const refs = {
  btnStart: document.querySelector('[data-start]'),
  daysField: timer.querySelector('[data-days]'),
  hoursField: timer.querySelector('[data-hours]'),
  minutesField: timer.querySelector('[data-minutes]'),
  secondsField: timer.querySelector('[data-seconds]'),
};

let intervalId = null;
let isThemeChanging = false;

refs.btnStart.addEventListener('click', onStartTimer);

function onStartTimer() {
  if (isThemeChanging) {
    return;
  }

  const deltaTime = calculationDeltaTime();

  if (deltaTime <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future");
    return;
  }

  changingTimerValue(convertMs(deltaTime));

  intervalId = setInterval(() => {
    isThemeChanging = true;
    const deltaTime = calculationDeltaTime();
    if (deltaTime <= 0) {
      Notiflix.Notify.success('The timer has finished its work.');
      clearInterval(intervalId);
      isThemeChanging = false;
      return;
    }

    changingTimerValue(convertMs(deltaTime));
  }, 1000);

}



function changingTimerValue({ days, hours, minutes, seconds }) {
    refs.daysField.textContent = days;
    refs.hoursField.textContent = hours;
    refs.minutesField.textContent = minutes;
    refs.secondsField.textContent = seconds;
}

function calculationDeltaTime() {
  return flatpickrEl.selectedDates[0].getTime() - Date.now();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
