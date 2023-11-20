import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/loginPage';
import RegisterPage from '../Pages/RegisterPage';
import LeaderboardPage from '../Pages/LeaderboardPage';
import TutorielPage from '../Pages/TutorielPage';
import MenuPage from '../Pages/MenuPage'
import CoffeeMenuPage from '../Pages/MenuCoffee'


const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/leaderboard': LeaderboardPage,
  '/tutoriel': TutorielPage,
  '/menu' : MenuPage,
  '/menucoffee' : CoffeeMenuPage

};

export default routes;
