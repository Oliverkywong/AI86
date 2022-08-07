const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 500;
networkCanvas.height = 500;

let start = Date.now();
let end;
let gametime;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

// let background = new Image();
// background.src = "../img/FHrH8TJUcAAetQB_1280jpg.jpg";


// background.onload = function(){
//   carCtx.drawImage(background,300,-600,carCanvas.width,carCanvas.height);   }

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const player = new Car(130, 150, 20, 35, "KEYS", 12, "green");

const N = 1;
const cars = generateCars(N);
let bestCar = cars[0];

document.querySelector('#use').addEventListener("click", async()=>{
  const AIcar = await fetch('/traincar');
  const result = await AIcar.json();
  const data = JSON.stringify(result[0]["AI01"]);
  console.log(data)
  console.log(JSON.stringify(result[0]["AI01"]))
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(data);
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    }
  }
});

const traffic = [
  new Car(100, 550, 30, 50, "KEYS", 12, "red")
  // new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
  // new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
  // new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
  // new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
  // new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
  // new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
  // new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
];

animate();

document.querySelector("#save").addEventListener("click", async()=> {
  const result = await fetch('/traincar',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bestCar.brain)
  })
});

document.querySelector("#del").addEventListener("click", function () {discard()});

let netopen = true;
document.querySelector("#network").addEventListener("click", function () {
  if(netopen){
    document.querySelector("#networkCanvas").classList.add('hidden');
    return netopen = false;
  }else{
    document.querySelector("#networkCanvas").classList.remove('hidden');
    return netopen = true;
  }
});

function discard() {
  localStorage.removeItem("bestBrain");
}

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(150, 550, 30, 50, "AI"));
  }
  return cars;
}

function animate(time) {
  let showtime = Date.now() - start;
  let second = (showtime / 1000) % 60;
  let minute = (showtime / 1000 / 60) % 60;

  document.querySelector('#gametime').innerHTML =   `Time:  ${ Math.floor(minute)} m ${(Math.floor(second) % 60)} s ${(showtime % 1000)}`;

  document.getElementById("carCanvas").style.background = "url('../img/FHrH8TJUcAAetQB_1280jpg.jpg')"
  carCanvas.width = 1280;
  carCanvas.height = 720;

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  // bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  player.update(road.borders, traffic);

  carCtx.save();

  // carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);

  player.draw(carCtx);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}
