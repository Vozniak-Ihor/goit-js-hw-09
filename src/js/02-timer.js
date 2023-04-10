import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDateTimeEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-restart]'),
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};

refs.startBtn.addEventListener('click', onClickStartTimer);
refs.stopBtn.addEventListener('click', onClickRestartTimer);

refs.startBtn.disabled = true;
let intervalId = null;
let eventDate = null;

function onClickStartTimer() {
  intervalId = startTimer();
}

function onClickRestartTimer() {
  location.reload();
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  allowInput: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    eventDate = selectedDates[0].getTime();
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};
flatpickr(refs.inputDateTimeEl, options);

function startTimer() {
  return setInterval(() => {
    const now = Date.now();
    const elapsed = eventDate - now;
    if(elapsed >= 0){
const { days, hours, minutes, seconds } = convertMs(elapsed);
    refs.daysEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minutesEl.textContent = minutes;
    refs.secondsEl.textContent = seconds;
    if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
      clearInterval(intervalId);
      window.alert("TIME'S UP")
      return;
    }
    }
    
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor((ms % hour) / minute));
  const seconds = addLeadingZero(Math.floor((ms % minute) / second));
  return { days, hours, minutes, seconds };
}

