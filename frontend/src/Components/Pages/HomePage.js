/* eslint-disable no-unused-vars */
import backgroundImg from '../../img/background_clouds.png';
import logo from '../../img/logo_nekocafe.png';
import connexionIcone from '../../img/connexion_icone.png';
import meilleursScoresIcone from '../../img/meilleursScores_icone.png';
import nvCompteIcone from '../../img/nouveauCompte_icone.png';
import tutorielIcone from '../../img/tutoriel_icone.png';
import connexionIconeHover from '../../img/loginIcon_hover.png';
import meilleursScoresIconeHover from '../../img/leaderboardIcon_hover.png';
import nvCompteIconeHover from '../../img/registerIcon_hover.png';
import tutorielIconeHover from '../../img/tutorialIcon_hover.png';
import { isAuthenticated } from '../../utils/auths';




import Navigate from '../Router/Navigate';


const HomePage = () => {
  
  // if the player is still connected, redirect them to gamePage
  if (isAuthenticated()) {
    Navigate('/game');
    return;
  }

  const main = document.querySelector('main');
  document.title='Neko café'

 
// creating the html with the different buttons
  const homePage = `
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
    <div style="height:100%; width:100%;">
  </div>

  <div class="col-md-2 logo-move">
  <img src="${logo}" alt="logo">
</div>
<div></div>
  <div class="row mt-4 icon-move">
  <div class="col-md-3">
    <img src="${connexionIcone}" alt="Bouton 1"id="connexion-button">
  </div>
  <div class="col-md-3">
    <img src="${nvCompteIcone}" alt="Bouton 2" id="register-button">
  </div>
  <div class="col-md-3">
    <img src="${meilleursScoresIcone}" alt="Bouton 3" id="leaderboard-button">
  </div>
  <div class="col-md-3">
    <img src="${tutorielIcone}" alt="Bouton 4" id="tutoriel-button">
  </div>
</div>
</div>
  `
  main.innerHTML = homePage;

// adding event listeners to the buttons so they redirect to their respective page
// and making them change color when hovering over them
  const connexionButton = document.querySelector('#connexion-button');
  connexionButton?.addEventListener('click', redirectToLogin);
  connexionButton?.addEventListener('mouseover', () => {
    connexionButton.src = connexionIconeHover;
  });
  connexionButton?.addEventListener('mouseout', () => {
    connexionButton.src = connexionIcone;
  });


  const leaderboardButton = document.querySelector('#leaderboard-button');
  leaderboardButton?.addEventListener('click', redirectToLeaderboard);
  leaderboardButton?.addEventListener('mouseover', () => {
    leaderboardButton.src = meilleursScoresIconeHover;
  });
  leaderboardButton?.addEventListener('mouseout', () => {
    leaderboardButton.src = meilleursScoresIcone;
  });

  const registerButton = document.querySelector('#register-button');
  registerButton?.addEventListener('click', redirectToRegister);
  registerButton?.addEventListener('mouseover', () => {
    registerButton.src = nvCompteIconeHover;
  });
  registerButton?.addEventListener('mouseout', () => {
    registerButton.src = nvCompteIcone;
  });

  const tutorielButton = document.querySelector('#tutoriel-button');
  tutorielButton?.addEventListener('click', redirectToTutoriel);
  tutorielButton?.addEventListener('mouseover', () => {
    tutorielButton.src = tutorielIconeHover;
  });
  tutorielButton?.addEventListener('mouseout', () => {
    tutorielButton.src = tutorielIcone;
  });
};


// functions to redirect to another page when clicking a button
function redirectToLogin() {
  Navigate('/login');
}

function redirectToRegister() {
  Navigate('/register');
}

function redirectToLeaderboard() {
  Navigate('/leaderboard');
}

function redirectToTutoriel() {
  Navigate('/tutoriel');
}


export default HomePage;
