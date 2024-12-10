const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = totalTime * 0.4;
const holdTime = totalTime * 0.2;

const breathAnimaiton = function () {
  text.innerText = 'Breath In!';
  container.className = 'container grow';
  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breath Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
};

breathAnimaiton();

setInterval(breathAnimaiton, totalTime);
