const msgEl = document.getElementById('msg');

const getRandomNumber = function () {
  return Math.floor(Math.random() * 100) + 1;
};

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start Recognition And Game
recognition.start();

// Check MSG Against Number
const checkNumber = function (msg) {
  const num = +msg;

  // Check If Valid Number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  // Check In Range
  if (num > 100 || num < 1) {
    msgEl.innerHTML = `<div>Number must be between 1 and 100</div>`;
    return;
  }

  // Check Number
  if (num === randomNum) {
    document.body.innerHTML`
    <h2>Congrats! You have guessed the number! <br><br>
    It was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>Go LOWER</div>`;
  } else if (num < randomNum) {
    msgEl.innerHTML += `<div>Go HIGER</div>`;
  }
};

// Write what user speaks
const writeMessage = function (msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span class="box">${msg}</span>
  `;
};

// Capture User Speak
const onSpeak = function (e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
};

// Speak Result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
  if (e.target.id === 'paly-again') {
    window.location.reload();
  }
});

console.log('Number:', randomNum);
