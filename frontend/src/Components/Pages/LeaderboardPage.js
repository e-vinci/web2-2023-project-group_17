import Navigate from "../Router/Navigate";

const scores = [
    {
        user : "player 1",
        score : 200
    },
    {
        user : "player 2",
        score : 3
    },
    {
        user : "player 3",
        score : 210
    },
    {
        user : "player 4",
        score : 20
    },
    {
        user : "player 5",
        score : 400
    }
]

const buildTab = () => {
    const headHtml =`<tr>
        <th>Pseudo</th>
        <th>Score</th>
    </tr>`

    const tab = document.createElement('table')
    tab.style = "border: 3px solid"

    const tabThead = tab.createTHead()
    tabThead.innerHTML = headHtml

    const tabBody = tab.createTBody()
    scores.sort((a, b) => b.score-a.score)
    scores.forEach((info) => {
        const row = document.createElement("tr")
        const cellUser = document.createElement("td")
        cellUser.innerText = `${info.user}`
        row.appendChild(cellUser)

        const cellScore = document.createElement("td")
        cellScore.innerText = `${info.score}`
        row.appendChild(cellScore)

        tabBody.appendChild(row)
    })

    return tab
}

const LeaderboardPage = () => {
    const main = document.querySelector("main");
    main.innerHTML = ``

    main.appendChild(buildTab());

    const btnGame = document.createElement("button")
    btnGame.innerText = "Retournez au jeu"

    main.appendChild(btnGame)

    btnGame.addEventListener("click", (event => {
        event.preventDefault()
        Navigate('/game')
    }))
  };
  
  export default LeaderboardPage;
  