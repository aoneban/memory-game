import './style.css';
import heroImg from './assets/hero.png';
import javascriptLogo from './assets/javascript.svg';
import viteLogo from './assets/vite.svg';
import { setupCounter } from './counter.js';
import { createHeader } from './header.js';


createHeader();

document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
</section>

<section id="next-steps">
  <div id="docs">
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
</section>
`;

setupCounter(document.querySelector('#counter'));
