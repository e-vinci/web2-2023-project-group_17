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
import {getAutenticatedUser} from "../../utils/auths";

// create a list of coffee to create
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

/**
 * Creates a coffee object with the specified properties
 * @param {string} name - The name of the coffee
 * @param {string} picture - The picture of the coffee
 * @param {number} basePrice - The base price of the coffee
 * @returns {object} The coffee object.
 */
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
      const user = getAutenticatedUser();
      let {score} = user;
      if (user.money >= this.price) {
        user.money -= this.price;
        score+=this.price;
        user.score=score;
        this.level += 1;
        this.price = basePrice * ((this.level * 5) / 2);
      }
    }
  };
}

const coffee = []
// iterate through the list of coffee to create
for (let i = 0; i < coffeeToCreate.length; i += 1) {
  coffee.push(coffeeToCreate[i]);
  coffee[i].setPrice();
}

/**
 * initializes the coffee data by getting the data from local storage or creating new coffee objects if no data exists
 */
function initializeCoffeeData() {
  const storedCoffeeData = localStorage.getItem('coffeeData');
  // si storedCoffeeData est null, alors il n'y a pas de données stockées
  if (storedCoffeeData !== [{}]) {
    const parsedData = JSON.parse(storedCoffeeData);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < coffee.length; i++) {
      coffee[i].level = parsedData[i].level;
      coffee[i].price = parsedData[i].price;
    }
  } else {
    // if no data exists, create new coffee objects and set their properties
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < coffeeToCreate.length; i++) {
      coffee.push(coffeeToCreate[i]);
      coffee[i].setPrice();
    }
    // store the coffee data in local storage
    localStorage.setItem('coffeeData', JSON.stringify(coffee));
  }
}


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
/**
 * create the menu for the coffee upgrade
 */
const MenuCoffee = () => {
  const main = document.querySelector('main');
  document.title = 'Neko café';
  initializeCoffeeData();
  const user = getAutenticatedUser();

  main.innerHTML = `
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



/**
 * Redirects the user to the menu for the cat.
 */
function redirectToMenuCat() {
  Navigate('/menucat');
}

/**
 * Redirects the user to the menu for the coffee.
 */
function redirectToMenuCoffee() {
  Navigate('/menucoffee');
}

/**
 * Redirects the user to the game.
 */
function redirectToMenu() {
  Navigate('/game');
}

export default MenuCoffee;
