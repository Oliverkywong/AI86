// Create car
const createCarForm = document.querySelector("#createCarForm");
createCarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let form = e.target;
    let formData = new FormData(form);

    let response = await fetch('/car', {
        method: 'post',
        body: formData,
    });
    let result = await response.json();
    if(result.create){
        window.location.reload();
    }
});

// Get Owned Car
async function getOwnerCar() {
    const res = await fetch('/car')
    const showCar = await res.json()

    for (let i = 0; i < showCar.length; i++) {
        document.querySelector('#ownedCar').innerHTML +=
            `<div class="card col">
                <img class="carPhoto" src="${showCar[i][0].model}">
                <div>Your car: ${i + 1}</div>
                <div id="id">car ID: ${showCar[i][0].id}</div>
                <div id="color">Color: ${showCar[i][0].color}</div>
            </div>`
    }
}

getOwnerCar();

// Get user info
async function getInfo() {
    const res = await fetch('/user/getInfo');
    const getInfo = await res.json();
    document.querySelector('#name').innerHTML = getInfo.userName;
    document.querySelector('#player_id').innerHTML = 'Player ID: ' + getInfo.userID;
    document.querySelector('#email').innerHTML = 'Email: ' + getInfo.email;
}

getInfo();