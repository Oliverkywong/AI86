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
    for(let i = 0; i < showCar.length; i++) {
        document.querySelector('#ownedCarID').innerHTML +=
        `<option>${showCar[i][0].id}</option>`
    }
}

getOwnerCarID();

// Select car

const selectCarForm = document.querySelector("#selectCarForm");
selectCarForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let form = e.target;
    const formObject = {}
    formObject['car_id'] = form.car_id.value


    const response = await fetch('/game/selectCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })



    let result = await response.json();
    alert(`${result}
    click the map and play`);
});