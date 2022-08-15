// const e = require("express");

// const carColor = document.getElementById("carColor").value;
// console.log(carColor);


function createCar() {
const createCarForm = document.querySelector("#createCarForm");
createCarForm.addEventListener('submit',async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const model = document.querySelector('#model').value;
    console.log('browser model value: ',model);
    const color = document.querySelector('#color').value;
    console.log('browser color value: ',color);
    // let data = {"model":model, "color":color};
    // Promise.all([model, color]).then(async(values) => {
    // console.log("test");
    await fetch('/game/createCar', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "model" : model,
            "color" : color
        }),
    })

    
    // console.log(JSON.stringify({model:model, color:color}));
    // let json = await response.json()
    // preventDefault();
    // document.querySelector('#createCar').reset()
});
// });
}

createCar();


// Old project method (Didn't work)
// const carCreate = document.querySelector("#createCarForm");
// carCreate.addEventListener("submit", async function (event) {
//   // console.log("Submit", dogCreate);
//   event.preventDefault();
//   let form = event.target;
//   // console.log("create submit stopped");
//   let formData = new FormData(form);
//   console.log(formData);
//   // console.log("line 25");
//   let response = await fetch("/game/createCar", {
//     method: "POST",
//     body: formData,
//   });
//   let result = await response.json();
//   if (result.message) {
//     alert(result.message);
//   }
// });


// window.onload =  function () {
//     let colorInput = carColor;
//     console.log(carColor);
//     this.localStorage.setItem("carColor", colorInput);
// }
// document.querySelector()
