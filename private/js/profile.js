function createCar() {
    const createCarForm = document.querySelector("#createCarForm");
    createCarForm.addEventListener('submit',async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const model = document.querySelector('#model').value;
        console.log('browser model value: ',model);
        const color = document.querySelector('#color').value;
        console.log('browser color value: ',color);
        await fetch('/game/createCar', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "model" : model,
                "color" : color
            }),
        })
    });
}
    
createCar();

function getOwnedCar () {
    const showCar = document.getElementById('ownedCar')
    const response = window.fetch('http://localhost:8989/game/showCar', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then ((data) => {
        for (let i = 0; i < data.length; i++) {
            showCar.innerHTML +=
            `<div class="card col">
                <img class="carPhoto" src="${data[i][0].model}">
                <div>Your car: ${i + 1}</div>
                <div id="id">car ID: ${data[i][0].id}</div>
                <div id="color">Color: ${data[i][0].color}</div>
            </div>`
            // `<div class="col" style="display:flex;">
            //     <div class="card" style="width: 18rem;">
            //     <img class="carPhoto" style="align-items:center" src="${data[i][0].model}" alt="Card image cap">
            //     <div class="card-body">
            //     <h5 class="card-title">car ID: ${data[i][0].id}</h5>
            //     <p class="card-text">Color: ${data[i][0].color}</p>
            //     <a href="#" class="btn btn-primary">Go somewhere</a>
            //     </div>
            // </div>`
        }
    })
}

getOwnedCar();
    
