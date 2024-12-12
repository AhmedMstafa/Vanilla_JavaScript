const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');
const oneSecond = 1000;

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// Set Background Year
year.innerText = currentYear + 1;

const getTimeFormat = function (time) {
  return time < 10 ? `0${time}` : time;
};

// Update Countdown Time
const updateCountdown = function () {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const s = Math.floor(diff / 1000) % 60;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);

  days.innerText = getTimeFormat(d);
  hours.innerText = getTimeFormat(h);
  minutes.innerText = getTimeFormat(m);
  seconds.innerText = getTimeFormat(s);
};

// Show Spinner Before Countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, oneSecond);

// Run Every Second
setInterval(updateCountdown, oneSecond);
