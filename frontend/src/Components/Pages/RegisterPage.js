import backgroundImg from '../../img/background_clouds.png';
import loginTxt from '../../img/login_txt.png';

import { clearPage} from '../../utils/render';

const RegisterPage = () => {

  clearPage();
  renderLoginForm();

};
  
function renderLoginForm(){
  const main = document.querySelector('main');

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
  usernameInput.placeholder = 'Username';
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
  passwordInput.style.fontSize = '30px';
  passwordInput.style.height='50px';
  passwordInput.style.backgroundColor = '#ffebf0';  
  form.appendChild(passwordInput);

  const spacer2 = document.createElement('div');
  spacer2.style.height='30px';
  form.appendChild(spacer2);

  const passwordConfirmInput = document.createElement('input');
  passwordConfirmInput.type = 'password';
  passwordConfirmInput.name = 'passwordConfirm';
  passwordConfirmInput.placeholder = 'Confirm Password';
  passwordConfirmInput.style.fontSize = '30px';
  passwordConfirmInput.style.height='50px';
  passwordConfirmInput.style.backgroundColor = '#ffebf0';  
  form.appendChild(passwordConfirmInput);

  const spacer3 = document.createElement('div');
  spacer3.style.height='30px';
  form.appendChild(spacer3);

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


  export default RegisterPage;
  