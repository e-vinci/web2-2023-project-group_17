import Navigate from "../Router/Navigate";
import backgroundImg from '../../img/background_clouds.png';
import homepageIcone from '../../img/accueil_button.png';
import homepageIconeHover from '../../img/hovered_accueil.png';

const buildTab = (scores) => {
    const headHtml =`<tr>
        <th>Pseudo</th>
        <th>Score</th>
    </tr>`

    const tab = document.createElement('table')
    tab.style = "border: 3px solid"

    const tabThead = tab.createTHead()
    tabThead.innerHTML = headHtml

    const tabBody = tab.createTBody()
    scores.forEach((player) => {
        const row = document.createElement("tr")
        const cellUser = document.createElement("td")
        cellUser.innerText = `${player.username}`
        row.appendChild(cellUser)

        const cellScore = document.createElement("td")
        cellScore.innerText = `${player.score}`
        row.appendChild(cellScore)

        tabBody.appendChild(row)
    })

    return tab
}

const LeaderboardPage = async () => {
    const main = document.querySelector("main");
    main.innerHTML = ``

    main.style.backgroundImage = `url('${backgroundImg}')`;
    main.style.backgroundSize = 'cover'; 

    
  const section = document.createElement('section');
  section.className = 'section';
  section.style.position = 'absolute';
  section.style.top = '20%';
  
    const title = document.createElement("h1")
    title.style.marginLeft = "38%";
    title.style.marginTop = "3%";
    section.appendChild(title);


    title.innerText = "Meilleurs scores"
    main.appendChild(title)

    const result = await fetch(`${process.env.API_BASE_URL}/users/scores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const scores = await result.json();

    main.appendChild(buildTab(scores));

    // const btnGame = document.createElement("button")
    // btnGame.innerText = "Retournez au jeu"

    // main.appendChild(btnGame)
    const btnGame = document.createElement("img");

    btnGame.src = homepageIcone;
    btnGame.style.width = '240px';  
    btnGame.style.height = '180px'; 
    btnGame.style.marginTop = "24%";

    main.appendChild(btnGame)

    btnGame.addEventListener("mouseover", () => {
        btnGame.src = homepageIconeHover;
    });
    
    btnGame.addEventListener("mouseout", () => {
        btnGame.src = homepageIcone;
    });
    

    btnGame.addEventListener("click", (event => {
        event.preventDefault()
        Navigate('/')
    }))
};
  
  export default LeaderboardPage;
  