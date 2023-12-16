import backgroundImg from '../../img/background_clouds.png';
import loginTxt from '../../img/login_txt.png';

import {
  setAutenticatedUser,
  getAutenticatedUser,
  isAuthenticated,
  clearAuthenticatedUser
} from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  
  clearPage();
  
  renderLoginForm();

  // get form and adding listener
  const form = document.querySelector('form');

  // get home button and adding listener
  if(!isAuthenticated()) {
    form.addEventListener('submit', onLogin);
  }
};

function renderLoginForm(){
  const main = document.querySelector('main');

  if (isAuthenticated()) {
    main.innerHTML += '<div class="max-h-screen max-w-screen"> You are already login </div>';
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
  section.style.top = '20%';

  const title = document.createElement('div');
  title.style.backgroundSize = 'cover';
  title.style.backgroundImage=`url('${loginTxt}')`;
  title.style.width = '250px';  
  title.style.height = '175px';  
  section.appendChild(title);

  // Create form
  const form = document.createElement('form');

  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.name = 'username';
  usernameInput.id = 'username';
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
  passwordInput.id = 'password';
  passwordInput.placeholder = 'Password';
  passwordInput.required ='required';
  passwordInput.style.fontSize = '30px';
  passwordInput.style.height='50px';
  passwordInput.style.backgroundColor = '#ffebf0';  
  form.appendChild(passwordInput);
  
  const errorMessage = document.createElement('div');
  errorMessage.id = 'error-area';
  errorMessage.className = 'font-mono text-red';
  errorMessage.style.fontSize = '30px';
  form.appendChild(errorMessage);  
  
  const spacer2 = document.createElement('div');
  spacer2.style.height='30px';
  form.appendChild(spacer2);

  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Login';
  submitButton.style.backgroundColor = '#ffebf0';  
  submitButton.style.fontSize='30px'
  form.appendChild(submitButton);


  section.appendChild(form);
  
  outerDiv.appendChild(section);  
  main.appendChild(outerDiv);
  

}

async function onLogin(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 401) {
    const errorArea = document.querySelector('#error-area');
    const errorMessage401 = document.createElement ('div');
    errorMessage401.innerHTML = 'Your password is incorrect';
    errorMessage401.className = 'font-mono text-red';
    errorArea.appendChild(errorMessage401);
    throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }else if (!response.ok) {throw new Error(`fetch error : ${response.status} : ${response.statusText}`);}

  const responseJson = await response.json();
  const authenticatedUser = getAutenticatedUser() === undefined ? {"username": "", "token": "", "score": "", "money": ""} : getAutenticatedUser() ;

  authenticatedUser.username = responseJson.username;
  authenticatedUser.token = responseJson.token;
  authenticatedUser.score = responseJson.score;
  authenticatedUser.money = responseJson.money;

  setAutenticatedUser(authenticatedUser);

  redirectToGame();
}

async function onLogout(event) {
  event.preventDefault();
  clearAuthenticatedUser();
  Navigate('/');
}

function redirectToGame() {
  Navigate('/game')
}



export default LoginPage;
