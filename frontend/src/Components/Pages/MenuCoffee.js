import backgroundImg from '../../img/background_clouds.png';
import catiniImg from '../../img/Catini_Bliss.png';
import purristaImg from '../../img/Purrista_Blend.png';
import meawchaImg from '../../img/Meowcha_Latte.png';
import pancatImg from '../../img/Pancakes_Berry.png';
import tiramisuImg from '../../img/Tiramisu.png';
import cookieImg from '../../img/CookieNCreamPot.png';
import redvelvetImg from '../../img/RedVelvetCake.png';
import lemonImg from '../../img/LemonCheesecake.png';
import cinnamonImg from '../../img/GlazedCinnamonroll.png';
import chocologImg from '../../img/ChocolateSwissRoll.png';

import quitImg from '../../img/close_button.png';
import catPinkButton from '../../img/chatspinkbutton.png';
import coffeePinkButton from '../../img/cafespinkbutton.png';
import catPurpleButton from '../../img/chatspurplebutton.png';
import coffeePurpleButton from '../../img/cafespurplebutton.png';


import Navigate from '../Router/Navigate';

const coffee = [
  {
    level: 1,
    price: '3 CatCoin',
    name: 'Meowcha Latte',
    picture: meawchaImg,
  },
  {
    level: 2,
    price: '9 CatCoin',
    name: 'Purrista Blend',
    picture: purristaImg,
  },
  {
    level: 3,
    price: '13 CatCoin',
    name: 'Pancat Stacks',
    picture: pancatImg,
  },
  {
    level: 4,
    price: '20 CatCoin',
    name: 'Tiramisu Tabby Treat',
    picture: tiramisuImg,
  },
  {
    level: 5,
    price: '25 CatCoin',
    name: 'Purrfectly Sweet Cookie Sundae',
    picture: cookieImg,
  },
  {
    level: 6,
    price: '31 CatCoin',
    name: 'Red Velvet Kitty Cake',
    picture: redvelvetImg,
  },
  {
    level: 7,
    price: '36 CatCoin',
    name: 'Lemon Mew Cheesecake',
    picture: lemonImg,
  },
  {
    level: 8,
    price: '38 CatCoin',
    name: 'Cinnamon Swirl Whiskers',
    picture: cinnamonImg,
  },
  {
    level: 9,
    price: '44 CatCoin',
    name: 'Meowy Christmas Log',
    picture: chocologImg,
  },
  {
    level: 10,
    price: '50 CatCoin',
    name: 'Catini Bliss',
    picture: catiniImg,
  },
];

const coffeeHTML = `
<style>
  .encadrement {
    border: 4px solid white;
    padding: 10px;
    text-align: center;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .col-md-3 {
    flex: 0 0 30%; 
  }
</style>

<div class="container mt-3">
  <div class="row justify-content-center">
    ${coffee
      .map(
        (cof) => `
          <div class="col-md-3">
            <div class="encadrement">
              <h4>Niveau ${cof.level}</h4>
              <img src="${cof.picture}" alt="Photo de ${cof.name}" style="width: 60px; height: 60px;">
              <h2>${cof.name}</h2>
              <p>Cout amélioration : ${cof.price}</p>
              <button id="coffee-upgrade" style="padding: 10px; font-size: 16px;">améliorer !</button>
            </div>
          </div>`
      )
      .join('')}
  </div>
</div>
`;

const MenuCoffee = () => {
  const main = document.querySelector('main');
  document.title = 'Neko café';

  const menuCoffee = `
      <div style="height: 100%; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: contain; background-repeat: repeat; background-position: center;">
      <div style="height:100%; width:100%;">
        <div class="container mt-5">
        <div class="row justify-content-center">
        <div class="col-md-3">
          <img src="${catPinkButton}" alt="Bouton 1" id="cat-button">
        </div>
        <div class="col-md-3">
          <img src="${coffeePinkButton}" alt="Bouton 2" id="coffee-button">
        </div>
        </div>
        </div>
        <div style="position: absolute; top: 5%; right: 0; transform: translateY(-50%);">
          <img src="${quitImg}" alt="Bouton quitter" id="quit-button" style="width: 50px">
        </div>
        <div style="display: flex; justify-content: center;"> 
          ${coffeeHTML}
        </div>
        </div>  
        </div>`;
  main.innerHTML = menuCoffee;

  const coffeeButton = document.querySelector('#coffee-button');
  coffeeButton?.addEventListener('click', redirectToMenuCoffee);
  coffeeButton?.addEventListener('click', redirectToMenuCat);
  coffeeButton.src = coffeePurpleButton;
  const catButton = document.querySelector('#cat-button');
  catButton?.addEventListener('click', redirectToMenuCat);
  catButton?.addEventListener('mouseover', () => {
    catButton.src = catPurpleButton;
  });
  catButton?.addEventListener('mouseout', () => {
    catButton.src = catPinkButton;
  });

  const quitButton = document.querySelector('#quit-button');
  quitButton?.addEventListener('click', redirectToMenu);
};

function redirectToMenuCat() {
  Navigate('/menucat');
}
function redirectToMenuCoffee() {
  Navigate('/menucoffee');
}
function redirectToMenu() {
  Navigate('/menu');
}

export default MenuCoffee;
