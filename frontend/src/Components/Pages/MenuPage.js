import backgroundImg from '../../img/background_clouds.png';
import quitImg from '../../img/close_button.png';
import catPinkButton from '../../img/chatspinkbutton.png';
import coffeePinkButton from '../../img/cafespinkbutton.png';
import catPurpleButton from '../../img/chatspurplebutton.png';
import coffeePurpleButton from '../../img/cafespurplebutton.png';

import Navigate from '../Router/Navigate';


const MenuPage = () => {
  const main = document.querySelector('main');
  const menuPage = `
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
    </div>`;
  main.innerHTML = menuPage;

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
  catButton?.addEventListener('mouseover', () => {
    catButton.src = catPurpleButton;
  });
  catButton?.addEventListener('mouseout', () => {
    catButton.src = catPinkButton;
  });
};

  function redirectToMenuCoffee() {
    Navigate('/menucoffee');
  }

  function redirectToMenuCat() {
    Navigate('/menucat');
  }
  export default MenuPage;