import Navigate from "../Router/Navigate";
import backgroundImg from '../../img/background_clouds.png';
import homepageIcon from '../../img/accueil_button.png';
import homepageIconHover from '../../img/hovered_accueil.png';

const LeaderboardPage = async () => {
    const main = document.querySelector("main");
    main.innerHTML = '';
    main.style.backgroundImage = `url('${backgroundImg}')`;
    main.style.backgroundSize = 'cover';
    main.style.backgroundRepeat = 'no-repeat';
    main.style.backgroundPosition = 'center';
    main.style.height = '100vh';
    main.style.width = '100vw';
    main.style.overflowY = 'scroll';


    const btnGame = document.createElement("img");
    btnGame.src = homepageIcon;
    btnGame.style.width = '240px';
    btnGame.style.height = '180px';
    btnGame.style.cursor = 'pointer';
    btnGame.style.position = 'fixed';
    btnGame.style.top = '20px';
    btnGame.style.left = '20px';


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
    title.style.textAlign = 'center';
    title.style.fontSize = '3rem';
    title.style.color = 'white';
    title.style.textShadow = '2px 2px 2px black';
    title.style.marginBottom = '50px';
    title.style.paddingTop = '30px';

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

    table.style.backgroundColor = 'rgba(230, 230, 230, 0.5)';
    table.style.border = '5px solid white';
    table.style.borderRadius = '10px';
    table.style.borderCollapse = 'inherit';
    table.style.margin = 'auto';
    table.style.width = '60%';
    table.style.textAlign = 'center';
    table.style.fontSize = '1.5rem';
    table.style.tableLayout = 'fixed';
    table.style.marginBottom = '50px';
    main.appendChild(table);
};

export default LeaderboardPage;