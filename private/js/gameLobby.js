document.querySelector('#map1').addEventListener('click', () => {
    window.location.href = '../gamepage.html'
})

document.querySelector('#map2').addEventListener('click', () => {
    window.location.href = '../gamepage.html?map=2'
})

// Get Owned Car ID

async function getOwnerCarID() {
    const res = await fetch('/game/showCar')
    const showCar = await res.json()
    console.log(showCar[0][0].id);
    for(let i = 0; i < showCar.length; i++) {
        document.querySelector('#ownedCarID').innerHTML +=
        `<option>${showCar[i][0].id}</option>`
    }
}

getOwnerCarID();