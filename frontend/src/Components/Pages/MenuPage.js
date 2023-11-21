import backgroundImg from '../../img/background_clouds.png';
import quitImg from '../../img/close_button.png';

import Navigate from '../Router/Navigate';


const MenuPage = () => {
  const main = document.querySelector('main');
  const menuPage = `
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
    <div style="height:100%; width:100%;">
    <div style="position: absolute; top: 20%; right: 0; transform: translateY(-50%);">
      <img src="${quitImg}" alt="Bouton quitter" id="quit-button" style="width: 50px">
    </div>  
    <div style="height:100%; width:100%;">
      <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <button id="coffee-button" style="padding: 10px; font-size: 16px;">Cafés</button>
      <button id="cat-button" style="padding: 10px; font-size: 16px;">Chats</button>
      </div>
    </div>`;
  main.innerHTML = menuPage;

  const coffeeButton = document.querySelector('#coffee-button');
  coffeeButton?.addEventListener('click', redirectToMenuCoffee);
  coffeeButton?.addEventListener('mouseover', () => {
    coffeeButton.style.backgroundColor = 'pink';
  });
  coffeeButton?.addEventListener('mouseout', () => {
    coffeeButton.style.backgroundColor = 'white';
  });
  const catButton = document.querySelector('#cat-button');
  catButton?.addEventListener('click', redirectToMenuCat);
  catButton?.addEventListener('mouseover', () => {
    catButton.style.backgroundColor = 'pink';
  });
  catButton?.addEventListener('mouseout', () => {
    catButton.style.backgroundColor = 'white';
  });
};

  function redirectToMenuCoffee() {
    Navigate('/menucoffee');
  }

  function redirectToMenuCat() {
    Navigate('/menucat');
  }
  export default MenuPage;