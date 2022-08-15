function getOwnedCar () {
    const showCar = document.getElementById('ownedCar')
    const response = window.fetch('http://localhost:8989/game/showCar', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })

    // console.log('res here', JSON.stringify(response))
    // console.log(res);
    // console.log(response);
    // console.log(data);
    .then(response => response.json())

    // useable code
    // .then((showCar) => {
    //     console.log(showCar);
    //     return showCar;
    //   });

    // test code
    .then ((data) => {
        for (let i = 0; i < data.length; i++) {
            showCar.innerHTML +=
            `<div class="card">
                <p>Car info</p>
                <div id="id">ID: ${data[i][0].id}</div>
                <div id="model">Model: ${data[i][0].model}</div>
                <div id="color">Color: ${data[i][0].color}</div>
            </div>`
        }
    })
    //  test code ends
        // for (let i = 0; i < data.length; i++) {
        //     showCar.innerHTML +=
        //     `<div>
        //         <p>Car info</p>
        //         <div id="id">ID: ${data[i].id}</div>
        //         <div id="model">Model: ${data[i].model}</div>
        //         <div id="color">Color: ${data[i].color}</div>
        //     </div>`
        // }
    
}

getOwnedCar();