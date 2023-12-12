import Navigate from "../Router/Navigate";

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
  