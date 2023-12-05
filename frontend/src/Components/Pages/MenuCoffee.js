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

import { user } from '../Game/GameScene';

import Navigate from '../Router/Navigate';

const coffeeToCreate = [
  createCoffee('Meowcha Latte', meawchaImg, 5),
  createCoffee('Purrista Blend', purristaImg, 10),
  createCoffee('Pancat Stacks', pancatImg, 15),
  createCoffee('Tiramisu Tabby Treat', tiramisuImg, 20),
  createCoffee('Purrfectly Sweet Cookie Sundae', cookieImg, 25),
  createCoffee('Red Velvet Kitty Cake', redvelvetImg, 30),
  createCoffee('Lemon Mew Cheesecake', lemonImg, 35),
  createCoffee('Cinnamon Swirl Whiskers', cinnamonImg, 40),
  createCoffee('Meowy Christmas Log', chocologImg, 45),
  createCoffee('Catini Bliss', catiniImg, 50)
];

function createCoffee(name, picture, basePrice) {
  return {
    name,
    picture,
    level: 0,
    price: basePrice,
    setPrice() {
      if (this.level === 0) {
        this.price = basePrice;
      } else {
        this.price = basePrice * ((this.level * 5) / 2);
      }
    },
    levelUp() {
      if (user.money >= this.price) {
        user.money -= this.price;
        this.level += 1;
        this.price = basePrice * ((this.level * 5) / 2);
      }
    },
  };
}

const coffee = []

for (let i = 0; i < coffeeToCreate.length; i += 1) {
  coffee.push(coffeeToCreate[i]);
  coffee[i].setPrice();
}

function initializeCoffeeData() {
  const storedCoffeeData = localStorage.getItem('coffeeData');

  if (storedCoffeeData) {
    // Si des données sont stockées, chargez-les dans le tableau coffee
    const parsedData = JSON.parse(storedCoffeeData);

    for (let i = 0; i < coffee.length; i += 1) {
      coffee[i].level = parsedData[i].level;
      coffee[i].price = parsedData[i].price;
    }
  } else {
    // Sinon, initialisez le tableau coffee et stockez-le dans le localStorage
    for (let i = 0; i < coffeeToCreate.length; i += 1) {
      coffee.push(coffeeToCreate[i]);
      coffee[i].setPrice();
    }

    localStorage.setItem('coffeeData', JSON.stringify(coffee));
  }
}

initializeCoffeeData();

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
          (cof, index) => `
            <div class="col-md-3">
              <div class="encadrement">
                <h4 id="level-display-${index}">Niveau ${cof.level}</h4>
                <img src="${cof.picture}" alt="Photo de ${cof.name}" style="width: 60px; height: 60px;">
                <h2>${cof.name}</h2>
                <p id="price-display-${index}">Cout amélioration : ${cof.price} CatCoins</p>
                <button id="coffee-upgrade-${index}" class="coffee-upgrade-button" style="padding: 10px; font-size: 16px;">améliorer !</button>
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
  initializeCoffeeData();

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
        <div id="money-display" style="position: absolute; top: 30%; right: 14%; background-color: #fff; color: #ffc0CB ;font-size: 25px;;">
        ${user.money} CatCoins
        </div>
        <div style="display: flex; justify-content: center;"> 
          ${coffeeHTML}
        </div>
        </div>  
        </div>`;
  main.innerHTML = menuCoffee;


  coffee.forEach((cof, index) => {
    const levelDisplay = document.getElementById(`level-display-${index}`);
    const priceDisplay = document.getElementById(`price-display-${index}`);

    if (levelDisplay && priceDisplay) {
      levelDisplay.textContent = `Niveau ${cof.level}`;
      priceDisplay.textContent = `Cout amélioration : ${cof.price} CatCoins`;
    }
  });

  const coffeeUpgrade = []
  for (let i = 0; i < coffee.length; i += 1) {
    coffeeUpgrade.push(document.querySelector(`#coffee-upgrade-${i}`));
  }
  coffeeUpgrade.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = parseInt(event.target.id.split('-')[2], 10);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(index) && index >= 0 && index < coffee.length) {
        const selectedCoffee = coffee[index];
        if (user.money >= selectedCoffee.price) {
          selectedCoffee.levelUp();
          const levelDisplay = document.getElementById(`level-display-${index}`);
          const priceDisplay = document.getElementById(`price-display-${index}`);
          const moneyDisplay = document.getElementById(`money-display`);

          levelDisplay.textContent = `Niveau ${selectedCoffee.level}`;
          priceDisplay.textContent = `Cout amélioration : ${selectedCoffee.price} CatCoins`;
          moneyDisplay.textContent = `${user.money} CatCoins`;


          localStorage.setItem('coffeeData', JSON.stringify(coffee));
        } 
      }
    });
  });

  const coffeeButton = document.querySelector('#coffee-button');
  coffeeButton?.addEventListener('click', redirectToMenuCoffee);
  coffeeButton?.addEventListener('click', redirectToMenuCoffee);
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
  Navigate('/game');
}

export default MenuCoffee;
