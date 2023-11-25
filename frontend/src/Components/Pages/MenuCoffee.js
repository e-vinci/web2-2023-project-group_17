import backgroundImg from '../../img/background_clouds.png';
import catiniImg from '../../img/Catini_Bliss.jpg';
import purristaImg from '../../img/Purrista_Blend.jpg';
import meawchaImg from '../../img/Meowcha_Latte.jpg';
import quitImg from '../../img/close_button.png';
import catPinkButton from '../../img/chatspinkbutton.png';
import coffeePinkButton from '../../img/cafespinkbutton.png';
import catPurpleButton from '../../img/chatspurplebutton.png';
import coffeePurpleButton from '../../img/cafespurplebutton.png';

import Navigate from '../Router/Navigate';

const coffee = [
  {
    level: 5,
    price: '10 CatCoin',
    name: 'Catini Bliss',
    picture: catiniImg,
  },
  {
    level: 2,
    price: '9 CatCoin',
    name: 'Purrista Blend',
    picture: purristaImg,
  },
  {
    level: 0,
    price: '5 CatCoin',
    name: 'Meowcha Latte',
    picture: meawchaImg,
  },
];

const coffeeHTML = coffee
  .map(
    (cof) => `
    <style>
        .encadrement {
            border: 2px solid black;
            padding: 10px;
        }
    </style>
    <div class="encadrement" style="display: inline-block; text-align: center; margin: 10px;">
        <h4>Niveau ${cof.level}</h4>
        <img src="${cof.picture}" alt="Photo de ${cof.name}" style="width: 100px; height: 100px;">
        <h2>${cof.name}</h2>
        <p>Cout amélioration : ${cof.price}</p>
        <button id="coffee-upgrade" style="padding: 10px; font-size: 16px;">améliorer !</button>
    </div>
`,
  )
  .join('');

const MenuCoffee = () => {
  const main = document.querySelector('main');

  const menuCoffee = `
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
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
        <div style="position: absolute; top: 20%; right: 0; transform: translateY(-50%);">
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
  quitButton?.addEventListener('click',redirectToMenu);
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
