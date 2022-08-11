const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");
const carColor = document.getElementById("carColor").value;
console.log(carColor);
networkCanvas.width = 500;
networkCanvas.height = 500;

let start = Date.now();
let end;
let gametime;
let check = true;
let check2 = true;
let lapcount = 0
let win = [];

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road();

const player = new Car(100, 550, 30, 50, "KEYS", 5, "yellow")
  // new Car(1000, 620, 30, 50, "KEYS", 10, "yellow")

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(150, 550, 30, 50, "AI",5));
  }
  return cars;
}

const N = 10;
const cars = generateCars(N);
let bestCar = cars[0];
let carcount = 0

//前一架車
document.querySelector('#prevcar').addEventListener('click', () => {
  carcount++
  bestCar = cars[Math.abs(carcount%(N-1))];
});
//後一架車
document.querySelector('#followingcar').addEventListener('click', () => {
  carcount--
  bestCar = cars[Math.abs(carcount%(N-1))];
});

document.querySelector('#use').addEventListener("click", async()=>{
  const AIcar = await fetch('/traincar');
  const result = await AIcar.json();
  const ai = document.querySelector('#useai').value
  let found;
  for(let i = 0; i < result.length; i++){
    if(ai==result[i][0]){
    found = result[i][1]
    }else{
      document.querySelector("#saveerr").innerHTML = `you dont save this AI`
    }
  }
  const data = JSON.stringify(found);
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(data);
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    }
  }
});

document.querySelector("#save").addEventListener("click", async()=> {
  const ai = document.querySelector('#saveai').value
  Promise.all([ai, bestCar.brain]).then(async(values) => {
    await fetch('/traincar',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
  });

  // switch (ai) {
  //   case "AI01":
  //     await fetch('/traincar',{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({AI01:bestCar.brain})
  //     })
  //     break;
  //   case "AI02":
  //     await fetch('/traincar',{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({AI02:bestCar.brain})
  //     })
  //     break;
  //   case "AI03":
  //     await fetch('/traincar',{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({AI03:bestCar.brain})
  //     })
  //     break;
  //   case "AI04":
  //     await fetch('/traincar',{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({AI04:bestCar.brain})
  //     })
  //     break;
  //   case "AI05":
  //     await fetch('/traincar',{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({AI05:bestCar.brain})
  //     })
  //     break;
  // }
});

document.querySelector("#del").addEventListener("click", function () {discard()});

let netopen = false;
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

animate();

async function animate(time) {
  let showtime = Date.now() - start;
  let second = (showtime / 1000) % 60;
  let minute = (showtime / 1000 / 60) % 60;

  document.querySelector('#realtimespeed').innerHTML = `Speed: ${Math.round(player.speed*20)}km/h`

  document.querySelector('#gametime').innerHTML = `Time:  ${ Math.floor(minute)} m ${(Math.floor(second) % 60)} s ${(showtime % 1000)}`;

  document.getElementById("carCanvas").style.background = "url('../img/FHrH8TJUcAAetQB_1280jpg.jpg')"
  carCanvas.width = 1280;
  carCanvas.height = 720;

    player.update(road.borders, [], road.winborder, road.checkborder, road.cheatborder);

    if(!player.cheat){
      if(!player.check){
        if(player.win){
          win.push(showtime)
          if(lapcount==0){
            lap = win[lapcount]
          }else{
            lap = win[lapcount]-win[lapcount-1]
          }
          // lapcount++
          showtime = lap
          second = (showtime / 1000) % 60;
          minute = (showtime / 1000 / 60) % 60;
          wintime =  `${Math.floor(minute)} m ${(Math.floor(second) % 60)} s ${(showtime % 1000)}`
          document.querySelector('#playertime').innerHTML = `player lap time: ${wintime}`
   
          await fetch('/leaderboard',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(wintime)
          })
        }
      }
    }

  for (let i = 0; i < cars.length; i++) {
    let win = [];
    cars[i].update(road.borders, player, road.winborder, road.checkborder, road.cheatborder);

    if(!cars[i].cheat){
      if(!cars[i].check){
        if(cars[i].win){
          win.push(showtime)
          if(lapcount==0){
            lap = win[lapcount]
          }else{
            lap = win[lapcount]-win[lapcount-1]
          }
          // lapcount++
          showtime = lap
          second = (showtime / 1000) % 60;
          minute = (showtime / 1000 / 60) % 60;
          document.querySelector('#aitime').innerHTML = `AI lap time: ${Math.floor(minute)} m ${(Math.floor(second) % 60)} s ${(showtime % 1000)} \n`
        }
      }
    }
  }

  carCtx.save();

  road.draw(carCtx);
  player.draw(carCtx);
  
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}

