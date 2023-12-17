import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/loginPage';
import RegisterPage from '../Pages/RegisterPage';
import LeaderboardPage from '../Pages/LeaderboardPage';
import TutorielPage from '../Pages/TutorielPage';
import MenuCat from '../Pages/MenuCat';
import CoffeeMenuPage from '../Pages/MenuCoffee'


const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/leaderboard': LeaderboardPage,
  '/tutoriel': TutorielPage,
  '/menucoffee' : CoffeeMenuPage,
  '/menucat': MenuCat
};

export default routes;
