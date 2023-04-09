import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDateTimeEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};


refs.startBtn.disabled = true;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future');
      return
    } else {
      refs.startBtn.disabled = false;
    }
  },
};
flatpickr(refs.inputDateTimeEl, options);

function startTimer() {
  const start = Date.now();
  return setInterval(() => {
    const now = Date.now();
    const elapsed = now - start;
    const { days, hours, minutes, seconds } = convertMs(elapsed);
    refs.daysEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minutesEl.textContent = minutes;
    refs.secondsEl.textContent = seconds;
    // if (days==='00' && hours==='00' && minutes==='00' && seconds==='00') {
    //     clearInterval(intervalId);}
  }, 1000);
}

let intervalId = null;

function startInterval() {
  intervalId = startTimer();
}

function stopInterval() {
  clearInterval(intervalId);
}

refs.startBtn.addEventListener('click', startInterval);
refs.stopBtn.addEventListener('click', stopInterval);

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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
