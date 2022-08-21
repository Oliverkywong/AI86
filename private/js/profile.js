// Create car

const createCarForm = document.querySelector("#createCarForm");
createCarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let form = e.target;
    let formData = new FormData(form);

    let response = await fetch('/game/createCar', {
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
    const res = await fetch('/game/showCar')
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

// async function getOwnerCar() {
//     const res = await fetch('/game/showCar')
//     const showCar = await res.json()

//     for (let i = 0; i < showCar.length; i++) {
//         document.querySelector('#ownedCar').innerHTML +=
//             `<div class="card col">
//             <canvas id="carCanvas" ></canvas>
                
//                 <div>Your car: ${i + 1}</div>
//                 <div id="id">car ID: ${showCar[i][0].id}</div>
//                 <div id="color">Color: ${showCar[i][0].color}</div>
//             </div>`

// const carCanvas = document.getElementById(`${showCar[i][0].id}`);
// const carCtx = carCanvas.getContext("2d");  
// let car = new Image();
// car.src = `${showCar[i][0].model}`
// car.onload = function(){
// carCtx.fillStyle = showCar[i][0].color;

//     carCtx.drawImage(car,110,10, 80, 130); 

// }
// var img = new Image; img.onload = draw; img.src = `${showCar[i][0].model}`;
// var ctx = carCanvas.getContext("2d");

// function draw() {
//   // draw color
//   ctx.fillStyle = showCar[i][0].color;
//   ctx.fillRect(0, 0, carCanvas.width, carCanvas.height);
  
//   // set composite mode
//   ctx.globalCompositeOperation = "destination-in";
  
//   // draw image
//   ctx.drawImage(this,110,10, 80, 130);
// }

//     }

// }

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
// function getOwnedCar () {
//     const showCar = document.getElementById('ownedCar')
//     const response = window.fetch('http://localhost:8989/game/showCar', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json;charset=UTF-8',
//         },
//     })
//     .then(response => response.json())
//     .then ((data) => {
//         for (let i = 0; i < data.length; i++) {
//             showCar.innerHTML +=
//             `<div class="card col">
//                 <img class="carPhoto" src="${data[i][0].model}">
//                 <div>Your car: ${i + 1}</div>
//                 <div id="id">car ID: ${data[i][0].id}</div>
//                 <div id="color">Color: ${data[i][0].color}</div>
//             </div>`
//             // `<div class="col" style="display:flex;">
//             //     <div class="card" style="width: 18rem;">
//             //     <img class="carPhoto" style="align-items:center" src="${data[i][0].model}" alt="Card image cap">
//             //     <div class="card-body">
//             //     <h5 class="card-title">car ID: ${data[i][0].id}</h5>
//             //     <p class="card-text">Color: ${data[i][0].color}</p>
//             //     <a href="#" class="btn btn-primary">Go somewhere</a>
//             //     </div>
//             // </div>`
//         }
//     })
// }

// getOwnedCar();

