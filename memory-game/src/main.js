import './style.css';
import { cards } from './data.js';
import { createHeader } from './header.js';
import { createModal } from './modal.js';

export let NUMBER_OF_MOVES = 0;
export let COUNTER_OF_PARES = 0;
export let FIRST_ATTEMPT = '';
export let SECOND_ATTEMPT = '';
export let NAMES = [];
export let FLAG = false;

let firstCard = null;
let mismatchTimer = null;

const header = document.createElement('header');
header.id = 'header';

const app = document.createElement('div');
app.id = 'app';

const footer = document.createElement('footer');
footer.id = 'footer';

document.body.prepend(header, app, footer);

const victoryModal = createModal({
  title: 'WIN!',
  createContent(moves) {
    const message = document.createElement('p');
    message.textContent = `You found all the pairs! Number of moves: ${moves}.`;
    return message;
  },
  actions: [{ label: 'New Game', onClick: () => newGame() }],
});

createHeader(() => newGame());

const newCards = () => {
  const concatTwoCards = cards.concat(cards);
  return shuffle(concatTwoCards);
};

const headsUpDisplay = () => {
  const app = document.getElementById('app');
  const counter = document.createElement('p');
  counter.classList.add('counter');
  counter.textContent = 'pairs found: 0';
  app.append(counter);
};
headsUpDisplay();

const numbersOfMoves = () => {
  const app = document.getElementById('app');
  const move = document.createElement('p');
  move.classList.add('move');
  move.textContent = 'moves made: 0';
  app.append(move);
};
numbersOfMoves();

const shuffle = (arr) => {
  const random = function (num) {
    return Math.floor(Math.random() * num);
  };
  const helperArray = Array.from(arr);
  const result = [];

  for (let i = arr.length; i > 0; i--) {
    const ran = random(i);
    const item = helperArray.splice(ran, 1);
    result.push(item);
  }

  return result.flat();
};

const createSingleCart = () => {
  const app = document.getElementById('app');
  const cartWrapper = document.createElement('div');
  cartWrapper.classList.add('cart-wrapper');

  newCards().forEach((card) => {
    const cart = document.createElement('div');
    cart.classList.add('cart', 'hidden');
    cart.dataset.name = card.name;

    const img = document.createElement('img');
    img.classList.add('image-cart');
    img.alt = card.name;
    img.src = card.src;

    cart.append(img);
    cart.addEventListener('click', handleCardClick);
    cartWrapper.append(cart);
  });

  const previousWrapper = app.querySelector('.cart-wrapper');
  if (previousWrapper) {
    previousWrapper.replaceWith(cartWrapper);
  } else {
    app.append(cartWrapper);
  }
};
createSingleCart();

function handleCardClick(event) {
  const card = event.currentTarget;
  if (mismatchTimer !== null || !card.classList.contains('hidden')) {
    return;
  }

  card.classList.remove('hidden');
  if (!FLAG) {
    FIRST_ATTEMPT = card.dataset.name;
    firstCard = card;
    FLAG = true;
    return;
  }

  SECOND_ATTEMPT = card.dataset.name;
  FLAG = false;
  NUMBER_OF_MOVES += 1;
  makeSteps(NUMBER_OF_MOVES);

  if (FIRST_ATTEMPT !== SECOND_ATTEMPT) {
    const previousCard = firstCard;
    mismatchTimer = setTimeout(() => {
      previousCard.classList.add('hidden');
      card.classList.add('hidden');
      mismatchTimer = null;
    }, 700);
  } else {
    NAMES.push(FIRST_ATTEMPT);
    COUNTER_OF_PARES += 1;
    changeCount(COUNTER_OF_PARES);
    if (COUNTER_OF_PARES === cards.length) {
      victoryModal.open(NUMBER_OF_MOVES);
    }
  }
  firstCard = null;
  FIRST_ATTEMPT = '';
  SECOND_ATTEMPT = '';
}

const changeCount = (item) => {
  const counter = document.querySelector('.counter');
  counter.textContent = `pairs found: ${item}`;
};

const makeSteps = (item) => {
  const counter = document.querySelector('.move');
  counter.textContent = `moves made: ${item}`;
};

export const newGame = () => {
  victoryModal.close();
  clearTimeout(mismatchTimer);
  mismatchTimer = null;
  firstCard = null;
  NUMBER_OF_MOVES = 0;
  COUNTER_OF_PARES = 0;
  FIRST_ATTEMPT = '';
  SECOND_ATTEMPT = '';
  NAMES = [];
  FLAG = false;
  changeCount(COUNTER_OF_PARES);
  makeSteps(NUMBER_OF_MOVES);
  createSingleCart();
};
