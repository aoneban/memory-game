import './style.css';
// import javascriptLogo from './assets/javascript.svg';
// import viteLogo from './assets/vite.svg';
import { createHeader } from './header.js';
import { cards } from './data.js';

createHeader();

const newCards = () => {
  const concatTwoCards = cards.concat(cards);
  return shuffle(concatTwoCards);
};

const shuffle = (arr) => {
  const random = function (num) {
    return Math.floor(Math.random() * num);
  };
  const helperArray = Array.from(arr)
  const result = [];

  for (let i = arr.length; i > 0; i--) {
    const ran = random(i)
    const item = helperArray.splice(ran, 1)
    result.push(item)
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

    const img = document.createElement('img');
    img.classList.add('image-cart');
    img.setAttribute('alt', 'cart');
    img.src = card.src;

    cart.append(img);
    cartWrapper.append(cart);
    app.append(cartWrapper);
  });
}
createSingleCart();
