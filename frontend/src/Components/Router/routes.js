import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/loginPage';
import RegisterPage from '../Pages/RegisterPage';
import LeaderboardPage from '../Pages/LeaderboardPage';
import TutorielPage from '../Pages/TutorielPage';
import MenuPage from '../Pages/MenuPage'


const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/leaderboard': LeaderboardPage,
  '/tutoriel': TutorielPage,
  '/menu' : MenuPage

};

export default routes;
