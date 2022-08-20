// const socket = io.connect('/game')


async function getSelectedCar() {
  const res = await fetch('/game/selectedCar')
  let selectedCar = await res.json()
  let sCarID = selectedCar.carID;
  let sCarColor = selectedCar.carColor;
  let sCarModel = selectedCar.carModel;
  const carCanvas = document.getElementById("carCanvas");
  const networkCanvas = document.getElementById("networkCanvas");

  networkCanvas.width = 500;
  networkCanvas.height = 500;

  let start = Date.now();
  let end;
  let gametime;
  let lapcount = 0
  let win = [];
  let carwidth = 30
  let carheight = 50
  let playerx = 100
  let playery = 550
  let AIx = 130
  let AIy = 550
  let model = sCarModel;
  let color = sCarColor;
  const carCtx = carCanvas.getContext("2d");
  const networkCtx = networkCanvas.getContext("2d");
  let map = "url('../img/FHrH8TJUcAAetQB_1280jpg.jpg')"
  let mapborad = 1

  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('map') == 2) {
    mapborad = 2
    map = "url('../img/STP58.jpg')"
    carwidth = 15
    carheight = 25
    playerx = 80
    playery = 550
    AIx = 100
    AIy = 550
  }


  const road = new Road(mapborad);

  const player = new Car(playerx, playery, carwidth, carheight, "KEYS", 5, color, model)

  const N = 100;
  const cars = generateCars(N);
  let bestCar = cars[0];
  let carcount = 0
  function generateCars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
      cars.push(new Car(AIx, AIy, carwidth, carheight, "AI", 3));
    }
    return cars;
  }

  //前一架車
  document.querySelector('#prevcar').addEventListener('click', () => {
    carcount++
    bestCar = cars[Math.abs(carcount % (N - 1))];
  });
  //後一架車
  document.querySelector('#followingcar').addEventListener('click', () => {
    carcount--
    bestCar = cars[Math.abs(carcount % (N - 1))];
  });

  document.querySelector('#use').addEventListener("click", async () => {
    const AIcar = await fetch('/traincar');
    const result = await AIcar.json();
    const ai = document.querySelector('#useai').value
    let found;
    for (let i = 0; i < result.length; i++) {
      if (ai == result[i][0]) {
        found = result[i][1]
      }
      // else{
      //   document.querySelector("#saveerr").innerHTML = `you dont save this AI`
      // }
    }
    const data = JSON.stringify(found);
    for (let i = 0; i < cars.length; i++) {
      cars[i].brain = JSON.parse(data);
      if (i != 0) {
        NeuralNetwork.mutate(cars[i].brain, 0.1);
      }
    }
  });

  document.querySelector("#save").addEventListener("click", async () => {
    const ai = document.querySelector('#saveai').value
    const AIcar = await fetch('/traincar');
    const result = await AIcar.json();

    Promise.all([ai, bestCar.brain]).then(async (values) => {
      await fetch('/traincar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
    });
  });

  let netopen = false;
  document.querySelector("#network").addEventListener("click", function () {
    if (netopen) {
      document.querySelector("#networkCanvas").classList.add('hidden');
      return netopen = false;
    } else {
      document.querySelector("#networkCanvas").classList.remove('hidden');
      return netopen = true;
    }
  });


  setTimeout(() => {
    animate()
  }, 3000)

  async function animate(time) {
    let showtime = Date.now() - start;
    let second = (showtime / 1000) % 60;
    let minute = (showtime / 1000 / 60) % 60;

    document.querySelector('#realtimespeed').innerHTML = `Speed: ${Math.round(player.speed * 20)}km/h`

    document.querySelector('#gametime').innerHTML = `Time:  ${Math.floor(minute)} m ${(Math.floor(second) % 60)} s ${(showtime % 1000)}`;

    document.getElementById("carCanvas").style.background = map
    carCanvas.width = 1280;
    carCanvas.height = 940;

    player.update(road.borders, [], road.winborder, road.checkborder, road.cheatborder);

    if (!player.cheat) {
      if (!player.check) {
        if (player.win) {
          win.push(showtime)
          if (lapcount == 0) {
            lap = win[lapcount]
          } else {
            lap = win[lapcount] - win[lapcount - 1]
          }
          // lapcount++
          showtime = lap
          second = (showtime / 1000) % 60;
          minute = (showtime / 1000 / 60) % 60;
          wintime = { time: `${Math.floor(minute)} m ${(Math.floor(second) % 60)} s ${(showtime % 1000)}` }
          document.querySelector('#playertime').innerHTML = `player lap time: ${wintime.time}`

          Promise.all([mapborad, showtime]).then(async (values) => {
            await fetch('/leaderboard', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            })
          });
        }
      }
    }

    for (let i = 0; i < cars.length; i++) {
      let win = [];
      cars[i].update(road.borders, player, road.winborder, road.checkborder, road.cheatborder);
      if (!cars[i].cheat) {
        if (!cars[i].check) {
          if (cars[i].win) {
            win.push(showtime)
            if (lapcount == 0) {
              lap = win[lapcount]
            } else {
              lap = win[lapcount] - win[lapcount - 1]
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
};

getSelectedCar();



