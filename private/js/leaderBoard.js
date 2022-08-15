// const { idText } = require("typescript");
// const { id } = require("../../jest.config");

async function getRanking() {
	const res = await fetch('/game/ranking')
	const ranking = await res.json()
    // let res = fetch('http://localhost:8989/game/ranking', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({=})
    // })
    // for (let i = 0; i < 5; i++) {
    //     document.querySelector(`#${i}`).innerHTML = `<div>${res[i].playerID}</div>`
    // }

    // const response = window.fetch('http://localhost:8989/game/ranking', {
    //     // learn more about this API here: https://graphql-pokemon2.vercel.app/
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json;charset=UTF-8',
    //     },
    // })

    // .then(response => response.json())
    // .then((data) => {
    //     console.log( data);
        for (let i =0; i < ranking.length; i++) {
            document.getElementById('leaderboard').innerHTML +=

            `<div class="leaderBoardContent">
                <div>Player ID: ${ranking[i].player_id}</div>
                <div>Map: ${ranking[i].map}</div>
                <div>Best Laptime: ${ranking[i].racetime}</div>
                <div>Car ID: ${ranking[i].car_id}</div>
            </div>`
        }
    // })
}

getRanking();