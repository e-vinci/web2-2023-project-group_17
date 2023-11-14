/* eslint-disable no-unused-vars */
import backgroundImg from '../../img/background_clouds.png';
import logo from '../../img/logo_nekocafe.png';
import connexionIcone from '../../img/connexion_icone.png';
import meilleursScoresIcone from '../../img/meilleursScores_icone.png';
import nvCompteIcone from '../../img/nouveauCompte_icone.png';
import tutorielIcone from '../../img/tutoriel_icone.png';


const HomePage = () => {
  const main = document.querySelector('main');
  document.title='Neko café'
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
    <img src="${connexionIcone}" alt="Bouton 1">
  </div>
  <div class="col-md-3">
    <img src="${nvCompteIcone}" alt="Bouton 2">
  </div>
  <div class="col-md-3">
    <img src="${meilleursScoresIcone}" alt="Bouton 3">
  </div>
  <div class="col-md-3">
    <img src="${tutorielIcone}" alt="Bouton 4">
  </div>
</div>
</div>
  `
  main.innerHTML = homePage;
};


export default HomePage;
