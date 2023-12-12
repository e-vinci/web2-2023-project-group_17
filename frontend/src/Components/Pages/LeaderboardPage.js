import Navigate from "../Router/Navigate";
import {getAutenticatedUser} from "../../utils/auths";

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

    const title = document.createElement("h1")
    title.innerText = "Meilleurs scores"
    main.appendChild(title)
    if (getAutenticatedUser()) {
        const result = await fetch(`${process.env.API_BASE_URL}/users/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getAutenticatedUser().token}`,
            },
        });
        const userScore = await result.json();
        const userScoreHtml = document.createElement("p")
        userScoreHtml.innerText = `Votre score : ${userScore.score}`
        main.appendChild(userScoreHtml)
    }

    const result = await fetch(`${process.env.API_BASE_URL}/users/scores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const scores = await result.json();

    main.appendChild(buildTab(scores));

    const btnGame = document.createElement("button")
    btnGame.innerText = "Retournez au jeu"

    main.appendChild(btnGame)

    btnGame.addEventListener("click", (event => {
        event.preventDefault()
        Navigate('/game')
    }))
};
  
  export default LeaderboardPage;
  