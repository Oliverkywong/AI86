async function getRanking() {
    const res = await fetch('/game/ranking')
    const ranking = await res.json()
    for (let i = 0; i < ranking.length; i++) {

        showtime = ranking[i].racetime
        second = (showtime / 1000) % 60;
        minute = (showtime / 1000 / 60) % 60;
        ranktime = `${Math.floor(minute)} m ${(Math.floor(second) % 60)} s ${(showtime % 1000)}`

        if (ranking[i].map == "map1") {
            document.getElementById('map1').innerHTML +=
                `<tr>
                <th>${ranking[i].player_id}</th>
                <th>${ranking[i].name}</th>
                <th>${ranking[i].car_id}</th>
                <th>${ranktime}</th>
                </tr>`
        } else {
            document.getElementById('map2').innerHTML +=
                `<tr>
                <th>${ranking[i].player_id}</th>
                <th>${ranking[i].name}</th>
                <th>${ranking[i].car_id}</th>
                <th>${ranktime}</th>
                </tr>`
        }
    }
}

getRanking();