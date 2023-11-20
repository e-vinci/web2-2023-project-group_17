import backgroundImg from '../../img/background_clouds.png';
import buddyImg from '../../img/cat_buddy.png';
import whiskersImg from '../../img/cat_whiskers.png';
import miaouImg from '../../img/cat_miaou.png';
import quitImg from '../../img/close_button.png';

import Navigate from '../Router/Navigate';

const cats = [
  {
    name: 'Buddy',
    bonus: 10,
    photo: buddyImg,
  },
  {
    name: 'Whiskers',
    bonus: 5,
    photo: whiskersImg,
  },
  {
    name: 'Miaou',
    bonus: 20,
    photo: miaouImg,
  },
];

const catHTML = cats
  .map(
    (cat) => `
    <div style="display: inline-block; text-align: center; margin: 10px;">
        <img src="${cat.photo}" alt="Photo de ${cat.name}" style="width: 100px; height: 100px;">
        <h2>${cat.name}</h2>
        <p>Bonus: ${cat.bonus}</p>
    </div>
`,
  )
  .join('');

const MenuCat = () => {
  const main = document.querySelector('main');

  const menuCat = `
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
          
          <div style="height:100%; width:100%;">
            <div style="position: absolute; top: 20%; left: 0; transform: translateY(-50%);">
              <img src="${quitImg}" alt="Bouton quitter" id="quit-button" style="width: 50px; height: 50px;">
            </div>
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
              <button id="coffee-button" style="padding: 10px; font-size: 16px;">Coffee Button</button>
              <button id="cat-button" style="padding: 10px; font-size: 16px;">Cat Button</button>
            </div>
            <div style="display: flex; justify-content: center;"> 
              ${catHTML}
            </div>
          </div>  
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
  
  const quitButton = document.querySelector('#quit-button');
  quitButton?.addEventListener('click',redirectToMenu);
};

function redirectToMenuCat() {
  Navigate('/menucat');
}
function redirectToMenu() {
  Navigate('/menu');
}

export default MenuCat;
