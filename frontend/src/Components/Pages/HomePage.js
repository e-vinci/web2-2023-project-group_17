import backgroundImg from '../../img/background_clouds.png';


const HomePage = () => {
  const main = document.querySelector('main');
  const homePage = `
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('${backgroundImg}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
    <div style="height:100%; width:100%;">
  </div>
  `
  main.innerHTML = homePage;
};


export default HomePage;
