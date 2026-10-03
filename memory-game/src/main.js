import './style.css';
import heroImg from './assets/aaron.jpg';
// import javascriptLogo from './assets/javascript.svg';
// import viteLogo from './assets/vite.svg';
import { createHeader } from './header.js';
import { cards } from './data.js';

createHeader();


function createSingleCart() {
  cards.forEach((card) => {
    const app = document.getElementById('app')
    const cartWrapper = document.createElement('div');
    cartWrapper.classList.add('cart-wrapper')
  
    const img = document.createElement('img');
    img.classList.add('image-cart');
    img.setAttribute('alt', 'cart');
    img.src = card.src;
  
    cartWrapper.append(img)
    app.append(cartWrapper)
  })
}
createSingleCart();