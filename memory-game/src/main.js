/* eslint-disable prefer-const */
import './style.css';
import { cards } from './data.js';
import { createHeader } from './header.js';

export let NUMBER_OF_MOVES = 0;
export let COUNTER_OF_PARES = 0;
export let FIRST_ATTEMPT = '';
export let SECOND_ATTEMPT = '';
export let NAMES = [];
export let FLAG = false;

const header = document.createElement('header');
header.id = 'header';

const app = document.createElement('div');
app.id = 'app';

const footer = document.createElement('footer');
footer.id = 'footer';

document.body.prepend(header, app, footer);
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
    img.setAttribute('alt', 'cart');
    img.src = card.src;

    cart.append(img);
    cartWrapper.append(cart);
    app.append(cartWrapper);
  });
};
createSingleCart();

const allCards = document.querySelectorAll('.cart');
allCards.forEach((el) => {
  el.addEventListener('click', function (event) {
    event.preventDefault();
    if (!FLAG) {
      FIRST_ATTEMPT = event.target.dataset.name;
      event.target.classList.remove('hidden');
      FLAG = true;
    } else {
      SECOND_ATTEMPT = event.target.dataset.name;
      event.target.classList.remove('hidden');
      FLAG = false;
      NUMBER_OF_MOVES += 1;
      makeSteps(NUMBER_OF_MOVES);

      if (FIRST_ATTEMPT !== SECOND_ATTEMPT) {
        setTimeout(() => {
          allCards.forEach((el) => {
            if (!NAMES.includes(el.dataset.name)) el.classList.add('hidden');
          });
        }, 700);
      } else {
        NAMES.push(FIRST_ATTEMPT);
        COUNTER_OF_PARES += 1;
        changeCount(COUNTER_OF_PARES);
      }
    }
  });
});

const changeCount = (item) => {
  const counter = document.querySelector('.counter');
  counter.textContent = `pairs found: ${item}`;
};

const makeSteps = (item) => {
  const counter = document.querySelector('.move');
  counter.textContent = `moves made: ${item}`;
};

export const newGame = () => {
  const allCards = document.querySelectorAll('.cart');
  allCards.forEach((el) => el.classList.add('hidden'));
  NUMBER_OF_MOVES = 0
  COUNTER_OF_PARES = 0
  changeCount(NUMBER_OF_MOVES);
  makeSteps(COUNTER_OF_PARES);
};
