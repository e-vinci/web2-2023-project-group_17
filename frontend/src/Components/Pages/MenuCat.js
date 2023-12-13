import backgroundImg from '../../img/background_clouds.png';
import quitImg from '../../img/close_button.png';
import catPinkButton from '../../img/chatspinkbutton.png';
import coffeePinkButton from '../../img/cafespinkbutton.png';
import catPurpleButton from '../../img/chatspurplebutton.png';
import coffeePurpleButton from '../../img/cafespurplebutton.png';
import cat1Icon from '../../img/cat1_icon.png';
import cat2Icon from '../../img/cat2_icon.png';
import cat3Icon from '../../img/cat3_icon.png';
import cat4Icon from '../../img/cat4_icon.png';
import cat7Icon from '../../img/cat7_icon.png';
import cat8Icon from '../../img/cat8_icon.png';

import Navigate from '../Router/Navigate';
import { user } from '../Game/GameScene';

const cats = []

function createCat(name, bonusAppearing, bonusClick, picture, isAdopted, price, isActive){
  return{
    name,
    bonusAppearing,
    bonusClick,
    picture,
    isAdopted,
    isActive,
    price,
    adopter(){
      if(user.money>=this.price){
        this.isAdopted=true;
        user.money-=this.price;
        user.score+=this.price;
        localStorage.setItem('catData', JSON.stringify(cats));
      } 
    },
    desactiver(){
      this.isActive=false;
      localStorage.setItem('catData', JSON.stringify(cats));
    },
    activer(){
      let catsActive=0;

      cats.forEach(cat => {
        if(cat.isActive){
          catsActive+=1;
        }
      });

      if(catsActive<2){
      this.isActive=true;
      localStorage.setItem('catData', JSON.stringify(cats));
      }

    }
  }
}

const catsToCreate = [
  createCat('Salem', 0, 0, cat3Icon, true, 0, true),
  createCat('Rusty', 2, 0, cat7Icon, false, 100, false),
  createCat('Kali', 0, 2, cat1Icon, false, 400, false),
  createCat('Atchoum', 2, 2, cat2Icon, false, 500, false),
  createCat('Bubbles', 5, 0, cat4Icon, false, 1000, false),
  createCat('Pinkie', 0, 5, cat8Icon, false, 10000, false),
  ]
for (let i = 0; i < catsToCreate.length; i += 1) {
  cats.push(catsToCreate[i]);
}
function initializeCatData() {

  const storedCatData = localStorage.getItem('catData');

  if (storedCatData) {
    const parsedData = JSON.parse(storedCatData);
    for (let i = 0; i < cats.length; i += 1) {
      cats[i].isAdopted = parsedData[i].isAdopted;
      cats[i].isActive = parsedData[i].isActive;
    }
  } else {
    for (let i = 0; i < catsToCreate.length; i += 1) {
      cats.push(catsToCreate[i]);
    }
    localStorage.setItem('catData', JSON.stringify(cats));
  }
}

initializeCatData();

function generateCatHTML(cat, index) {
  return `
  
    <div class="col-md-3">
      <div class="encadrement">
        <h4>${cat.name}</h4>
        <img src="${cat.picture}" alt="Photo de ${cat.name}" style="width: 40%; height: 40%;">
        <br>
        <p>Bonus click : ${cat.bonusClick}
        <br>
        Bonus apparition client : ${cat.bonusAppearing}</p>

        <p>Cout adoption : ${cat.price} CatCoins</p>

        ${(() => {
          if (cat.isAdopted && cat.isActive) {
            return `<button id="cat-disable${index}" style="padding: 10px; font-size: 16px;">Désactiver !</button>`;
          } 
          if (cat.isAdopted) {
            return `<button id="cat-activating${index}" style="padding: 10px; font-size: 16px;">Activer!</button>`;
          } 
          return `<button id="cat-not-adopted${index}" style="padding: 10px; font-size: 16px;">Adopter !</button>`;
        })()}
      </div>
    </div>`;
}



const catHTML = `
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
      ${cats.map((cat, index) => generateCatHTML(cat, index)).join('')}
    </div>
  </div>
`;

function registerCatEventListeners() {
  const catContainer = document.querySelector('.row.justify-content-center');

  cats.forEach((cat, index) => {
    const adoptButton = document.querySelector(`#cat-not-adopted${index}`);
    const activateButton = document.querySelector(`#cat-activating${index}`);
    const desactivateButton = document.querySelector(`#cat-disable${index}`);

    if (adoptButton) {
      adoptButton.addEventListener('click', () => {
        cat.adopter();
        const moneyDisplay = document.getElementById(`money-display`);
        moneyDisplay.textContent = `${user.money} CatCoins`;
       
        updateCatContainer(catContainer);

      });
    }

  if (activateButton) {
    activateButton.addEventListener('click', () => {
      cat.activer();
      
      updateCatContainer(catContainer);

    });
  }

  if (desactivateButton) {
    desactivateButton.addEventListener('click', () => {
      cat.desactiver();
      
      updateCatContainer(catContainer);

    });
  }
});
}

function updateCatContainer(container) {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = cats.map((cat, index) => generateCatHTML(cat, index)).join('');
}
function generateMenuCat(){
  
  const menuCat = `
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
      <div id='money-display' style="position: absolute; top: 30%; right: 14%; background-color: #fff; color: #ffc0CB ;font-size: 25px;">
        ${user.money} CatCoins
      </div>
      <div id='catHtml' style="display: flex; justify-content: center;"> 
        ${catHTML}
      </div>
    </div>  
  </div>
  `;

  const main = document.querySelector('main');
  main.innerHTML = menuCat;

  // register event listeners for buttons
  const coffeeButton = document.querySelector('#coffee-button');
  coffeeButton?.addEventListener('click', redirectToMenuCoffee);
  coffeeButton?.addEventListener('mouseover', () => {
    coffeeButton.src = coffeePurpleButton;
  });
  coffeeButton?.addEventListener('mouseout', () => {
    coffeeButton.src = coffeePinkButton;
  });

  const catButton = document.querySelector('#cat-button');
  catButton?.addEventListener('click', redirectToMenuCat);
  catButton.src = catPurpleButton;

  const quitButton = document.querySelector('#quit-button');
  quitButton?.addEventListener('click', redirectToMenu);
}


const MenuCat = () => {
  document.title = 'Neko café';

  generateMenuCat();

  registerCatEventListeners();
};



function redirectToMenuCat() {
  Navigate('/menucat');
}
function redirectToMenuCoffee() {
  Navigate('/menucoffee');
}
function redirectToMenu() {
  Navigate('/game');
}

export { cats };
export default MenuCat;
