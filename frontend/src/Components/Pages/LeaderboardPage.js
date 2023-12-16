import Navigate from "../Router/Navigate";
import homepageIcon from '../../img/accueil_button.png';
import homepageIconHover from '../../img/hovered_accueil.png';
import '../../stylesheets/leaderboard.css';
import backgroundImg from '../../img/background_clouds.png';


const LeaderboardPage = async () => {
    const main = document.querySelector("main");
    main.setAttribute("id", "leaderboard-main"); 
    main.innerHTML = '';
    const leaderPage = document.createElement("div");

    leaderPage.style.height = '100vh';
    leaderPage.style.backgroundImage = `url('${backgroundImg}')`;
    leaderPage.style.backgroundSize = 'cover';
    leaderPage.style.backgroundRepeat = 'no-repeat';
    leaderPage.style.backgroundPosition = 'center';
  

    leaderPage.setAttribute("class", "ldb")


    const btnGame = document.createElement("img");
    btnGame.src = homepageIcon;



    leaderPage.appendChild(btnGame);

    btnGame.addEventListener("mouseover", (() => {
        btnGame.src = homepageIconHover
    }));
    btnGame.addEventListener("mouseout", (() => {
        btnGame.src = homepageIcon
    }));
    btnGame.addEventListener("click", (event => {
        event.preventDefault();
        Navigate('/');
    }));

    const title = document.createElement("h1");
    title.innerText = "Meilleurs scores";

    leaderPage.appendChild(title);

    const result = await fetch(`${process.env.API_BASE_URL}/users/scores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const scores = await result.json();

    const table = document.createElement('table');
    const header = document.createElement('tr');
    header.innerHTML = '<th style="border-right: rgba(255, 255, 255, 0.5) dashed 1px; padding-bottom: 20px; padding-top: 20px; background-color: rgba(0, 0, 0, 0.1) ">Utilisateur</th>' +
        '<th style="background-color: rgba(0, 0, 0, 0.1) " >Score</th>';

    table.appendChild(header);
    scores.forEach(score => {
        const row = document.createElement('tr');
        row.innerHTML = `<th >${score.username}</td>
                         <td >${score.score}</td>`;
        table.appendChild(row);
    });

    leaderPage.appendChild(table);
    main.appendChild(leaderPage);
};

export default LeaderboardPage;