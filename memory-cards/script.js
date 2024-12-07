const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep Track Of Current Card
let currentActiveCard = 0;

// Store DOM Cards

const cardsEl = [];

// Store Card Data

const cardsData = getCardsData();

// Show Current Text
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get Cards From Local Storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cardsData'));

  return cards === null ? [] : cards;
}

// Add Card To Local Storage
function setCardsData(cards) {
  localStorage.setItem('cardsData', JSON.stringify(cards));

  window.location.reload();
}

// Create Card
function createCard(data, index) {
  let { question, answer } = data;

  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
  <div class="inner-card">
        <div class="inner-card-front">
          <p>
            ${question}
          </p>
        </div>
        <div class="inner-card-back">
          <p>
            ${answer}
          </p>
        </div>
      </div>
  `;

  if (index === 0) {
    card.classList.add('active');
  }

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  cardsEl.push(card);

  cardsContainer.append(card);

  updateCurrentText();
}

// Create All Cards
function createCards() {
  cardsData.forEach(createCard);
}

createCards();

// Nex Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard += 1;

  if (currentActiveCard >= cardsEl.length) currentActiveCard -= 1;

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Prev Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard -= 1;

  if (currentActiveCard < 0) currentActiveCard = 0;

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show Add Container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide Add Container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add New Card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

// Clear Cars Button
clearBtn.addEventListener('click', () => {
  localStorage.clear();

  cardsContainer.innerHTML = '';
  window.location.reload();
});
