import backgroundImg from '../../img/background_clouds.png';
import logo from '../../img/logo_nekocafe.png';


const HomePage = () => {
  const main = document.querySelector('main');
  const homePage = `
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
    <div style="height:100%; width:100%;">
  </div>

  <img src="${logo}" alt="Your Image" class="center-logo">

  `
  main.innerHTML = homePage;
};


export default HomePage;
