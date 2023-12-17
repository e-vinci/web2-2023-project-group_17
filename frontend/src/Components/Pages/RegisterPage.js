import backgroundImg from '../../img/background_clouds.png';
import registerTxt from '../../img/register_txt.png';

import {setAutenticatedUser, isAuthenticated, clearAuthenticatedUser} from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {

  clearPage();

  renderLoginForm();

  // get form and adding listener
  const form = document.querySelector('form');

  // get home button and adding listener
  if(!isAuthenticated()) {
    form.addEventListener('submit', onRegister);
  }
};
  
function renderLoginForm(){
  const main = document.querySelector('main');

  if (isAuthenticated()) {
    main.innerHTML +=
      '<div class="max-h-screen max-w-screen"> You are already register and login </div>';
      const form = document.createElement('form');
      const submitButton = document.createElement('input');
      submitButton.type = 'submit';
      submitButton.value = 'Logout';
      submitButton.style.backgroundColor = '#ffebf0';  
      submitButton.style.fontSize='30px'
      form.appendChild(submitButton);
  
      form.addEventListener('submit', onLogout);
  
      main.appendChild(form);
    return;
  }

  const outerDiv = document.createElement('div');
  outerDiv.style.height = '100vh';
  outerDiv.style.display = 'flex';
  outerDiv.style.alignItems = 'center';
  outerDiv.style.justifyContent = 'center';
  outerDiv.style.backgroundImage = `url('${backgroundImg}')`;
  outerDiv.style.backgroundSize = 'cover';
  outerDiv.style.backgroundRepeat = 'no-repeat';
  outerDiv.style.backgroundPosition = 'center';
  

  const section = document.createElement('section');
  section.className = 'section';
  section.style.position = 'absolute';
  section.style.top = '8%';

  const title = document.createElement('div');
  title.style.backgroundSize = 'cover';
  title.style.backgroundImage=`url('${registerTxt}')`;
  title.style.width = '320px';  
  title.style.height = '210px';  
  section.appendChild(title);

  // Create form
  const form = document.createElement('form');

  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.name = 'username';
  usernameInput.placeholder = 'Username';
  usernameInput.required ='required';
  usernameInput.style.fontSize = '30px';
  usernameInput.style.height='50px';
  usernameInput.style.backgroundColor = '#ffebf0';  

  form.appendChild(usernameInput);

  const spacer = document.createElement('div');
  spacer.style.height='30px';
  form.appendChild(spacer);

  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.name = 'password';
  passwordInput.placeholder = 'Password';
  passwordInput.required ='required';
  passwordInput.style.fontSize = '30px';
  passwordInput.style.height='50px';
  passwordInput.style.backgroundColor = '#ffebf0';  
  form.appendChild(passwordInput);

  const errorMessage = document.createElement('div');
  errorMessage.id = 'error-passwprd';
  errorMessage.className = 'font-mono text-red';
  errorMessage.style.fontSize = '30px';
  form.appendChild(errorMessage);

  const spacer2 = document.createElement('div');
  spacer2.style.height='30px';
  form.appendChild(spacer2);

  const passwordConfirmInput = document.createElement('input');
  passwordConfirmInput.type = 'password';
  passwordConfirmInput.name = 'passwordConfirm';
  passwordConfirmInput.placeholder = 'Confirm Password';
  passwordConfirmInput.required = 'required';
  passwordConfirmInput.style.fontSize = '30px';
  passwordConfirmInput.style.height='50px';
  passwordConfirmInput.style.backgroundColor = '#ffebf0';  
  form.appendChild(passwordConfirmInput);

  const spacer3 = document.createElement('div');
  spacer3.style.height='30px';
  form.appendChild(spacer3);

  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Register';
  submitButton.style.backgroundColor = '#ffebf0';  
  submitButton.style.fontSize='30px'
  form.appendChild(submitButton);


  section.appendChild(form);
  
  outerDiv.appendChild(section);  
  main.appendChild(outerDiv);
  

}

/**
 * Register a new user in the API and redirect the user to the game
 * @param {event} event - the form submit event
 */
async function onRegister(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;
  const passwordConfirm = event.target.passwordConfirm.value;

  if(password !== passwordConfirm) {
    RegisterPage();
    const errorArea = document.querySelector('#error-passwprd');
    const error =  '<div class="font-mono text-red"> Les mots de passe doivent correspondre</div>';
    errorArea.innerHTML += error;
    return;
  }

  const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {throw new Error(`fetch error : ${response.status} : ${response.statusText}`);}

  const authenticatedUser = await response.json();

  setAutenticatedUser(authenticatedUser);

  redirectToGame();
}

/**
 * clear the authenticated user and redirect the user to the homepage when the page is unloaded
 * @param {event}
 */
async function onLogout(event) {
  event.preventDefault();
  clearAuthenticatedUser();
  Navigate('/');
}


/**
 * Redirects the user to the game page
 */
function redirectToGame() {
  Navigate('/game')
}


  export default RegisterPage;
  