import Navigate from "../Router/Navigate";
import backgroundImg from '../../img/background_clouds.png';
import homepageIcon from '../../img/accueil_button.png';
import homepageIconHover from '../../img/hovered_accueil.png';
import '../../stylesheets/leaderboard.css';

const LeaderboardPage = async () => {
    const main = document.querySelector("main");
    main.innerHTML = '';
    main.style.backgroundImage = `url(${backgroundImg})`;

    const btnGame = document.createElement("img");
    btnGame.src = homepageIcon;



    main.appendChild(btnGame);

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

    main.appendChild(title);

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
        row.innerHTML = `<th style="border-right: rgba(255, 255, 255, 0.5) dashed 1px; border-top: rgba(255, 255, 255, 0.5) solid 1px; padding-bottom: 20px; padding-top: 20px">${score.username}</td>
                         <td style="border-top: rgba(255, 255, 255, 0.5) solid 1px; padding-bottom: 20px; padding-top:20px ;">${score.score}</td>`;
        table.appendChild(row);
    });

    main.appendChild(table);
};

export default LeaderboardPage;