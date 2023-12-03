import backgroundImg from '../../img/background_clouds.png';
import characterImg from '../../img/tutoriel_character.png';
import bubbleImg from '../../img/speech_bubble.png';

const TutorielPage = () => {
  const main = document.querySelector('main');
  document.title = 'Tutoriel';
  const tutorielPage = `
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div style="position: absolute; bottom: 0; left: 0;";>
          <img src="${characterImg}" alt="character-image" style="width: 400px;">
        </div>
      
        <div  style="position: absolute; width: 750px; z-index: 1; top: 50%; left: 50%;">
          <img src="${bubbleImg}" alt="bubble image">
        </div>
        <div style="font-family: 'Press Start 2P', cursive; position: absolute; z-index: 2; padding: 20px;  top: 50%; left: 50%; transform: translate(-50%, -50%);">
          
          <h6 style="font-size: 1em;">Bienvenue au Neko Café!</h6>  
            <br>
              <p style="font-size: 0.7em"> 
                <b> But du jeu : </b> Gagner de l'argent en vendant des cafés et en caressant des chats.
              </p>
          <p style="font-size: 0.7em">
            <b> Comment jouer ? </b> Inscrivez-vous via le bouton "nouveau compte" ou connectez-vous si vous avez déjà un compte.
          </p>
          <p style="font-size: 0.7em">
           <b> Améliorations des boissons et des chats: </b> Utilisez vos CatCoins dans l'onglet "Menu".Cela attirera plus de clients;)
          </p>
          <p style="font-size: 0.7em">
            <b> Tableau de classement: </b> Votre score est calculé sur base de l'argent gagné.
            <br>
            </br>
            Bonne partie !
          </p>
      </div>
    </div>
  `;

  main.innerHTML = tutorielPage;
};

export default TutorielPage;
