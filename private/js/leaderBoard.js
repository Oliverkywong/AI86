async function getRanking() {
    const res = await fetch('/game/ranking')
    const ranking = await res.json()
    console.log(ranking)
    for (let i = 0; i < ranking.length; i++) {

        showtime = ranking[i].racetime
        second = (showtime / 1000) % 60;
        minute = (showtime / 1000 / 60) % 60;
        ranktime = `${Math.floor(minute)} m ${(Math.floor(second) % 60)} s ${(showtime % 1000)}` 

        document.getElementById('leaderboard').innerHTML +=
            `<div class="leaderBoardContent">
                <div>Player ID: ${ranking[i].player_id}</div>
                <div>Player Name: ${ranking[i].name}</div>
                <div>Map: ${ranking[i].map}</div>
                <div>Best Laptime: ${ranktime}</div>
                <div>Car ID: ${ranking[i].car_id}</div>
            </div>`
    }
}

getRanking();