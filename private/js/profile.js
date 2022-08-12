const carColor = document.getElementById("carColor").value;
console.log(carColor);

document.getElementById("carColor").addEventListener('submit', function () {
    let colorInput = carColor;
    console.log(carColor);
    localStorage.setItem("carColor", colorInput);
})
// window.onload =  function () {
//     let colorInput = carColor;
//     console.log(carColor);
//     this.localStorage.setItem("carColor", colorInput);
// }
// document.querySelector()

