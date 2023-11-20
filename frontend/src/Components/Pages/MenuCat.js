import backgroundImg from '../../img/background_clouds.png';
import Navigate from '../Router/Navigate';

const MenuCat = () => {
    const main = document.querySelector('main');

    const menuCat = `
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div style="height:100%; width:100%;">
        <button id="coffee-button" style="padding: 10px; font-size: 16px;">Coffee Button</button>
        <button id="cat-button" style="padding: 10px; font-size: 16px;">Cat Button</button>
        LA PAGE CAT
      </div>`;
    main.innerHTML = menuCat;
  
    const coffeeButton = document.querySelector('#coffee-button');
    coffeeButton?.addEventListener('click', redirectToMenu);
    coffeeButton?.addEventListener('mouseover', () => {
      coffeeButton.style.backgroundColor = 'pink';
    });
    coffeeButton?.addEventListener('mouseout', () => {
      coffeeButton.style.backgroundColor = 'white';
    });
    const catButton = document.querySelector('#cat-button');
    catButton?.addEventListener('click', redirectToMenuCat);
    catButton.style.backgroundColor = 'pink';
  };

  function redirectToMenuCat () {
    Navigate('/menucat');
  }
  function redirectToMenu () {
    Navigate('/menu');
  }
  
  export default MenuCat;
