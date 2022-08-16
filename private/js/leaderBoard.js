async function getRanking() {
    const res = await fetch('/game/ranking')
    const ranking = await res.json()
    for (let i = 0; i < ranking.length; i++) {
        document.getElementById('leaderboard').innerHTML +=
            `<div class="leaderBoardContent">
                <div>Player ID: ${ranking[i].player_id}</div>
                <div>Map: ${ranking[i].map}</div>
                <div>Best Laptime: ${ranking[i].racetime}</div>
                <div>Car ID: ${ranking[i].car_id}</div>
            </div>`
    }
}

getRanking();