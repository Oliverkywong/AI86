class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    // const infinity = 1000;
    // this.top = -infinity;
    // this.bottom = infinity;
    this.top = 0;
    this.bottom = 720;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };

    // const topLeft = (450, -235, 300, 0, 2 * Math.PI);
    // const topRight = (450, -235, 450, 0, 2 * Math.PI);
    // const bottomLeft = (450, -235, 300, 0, 2 * Math.PI);
    // const bottomRight = (450, -235, 450, 0, 2 * Math.PI);

    this.borders = [
    [{x:55,y:363},{x:0,y:363},{x:0,y:0},{x:1280,y:0},{x:1280,y:363},{x:1057,y:363},{x:1121,y:346},{x:1174,y:324},{x:1222,y:286},{x:1256,y:223},{x:1251,y:161},{x:1217,y:97},{x:1153,y:48},{x:1079,y:27},{x:873,y:27},{x:824,y:40},{x:781,y:72},{x:761,y:105}, {x:761,y:418} , {x:359,y:428}, {x:343,y:413}, {x:358,y:400}, {x:697,y:400}, {x:727,y:374}, {x:743,y:351},{x:743,y:106},{x:719,y:65},{x:659,y:26},{x:605,y:17},{x:548,y:27},{x:411,y:116},{x:371,y:100},{x:250,y:29},{x:181,y:24},{x:120,y:48},{x:55,y:117}],
    [{x:0,y:363},{x:55,y:363},{x:55,y:598},{x:92,y:649},{x:142,y:679},{x:188,y:694},{x:243,y:700},{x:1075,y:700},{x:1155,y:683},{x:1226,y:624},{x:1245,y:556},{x:1238,y:486},{x:1185,y:407},{x:1115,y:372},{x:1057,y:363},{x:1280,y:363},{x:1280,y:720},{x:0,y:720}],[{x:210,y:150},{x:208,y:504},{x:208,y:534},{x:214,y:551},{x:241,y:566},{x:293,y:571},{x:1041,y:569},{x:1084,y:559},{x:1094,y:537},{x:1091,y:510},{x:1065,y:498},{x:1001,y:483},{x:951,y:458},{x:923,y:424},{x:911,y:380},{x:916,y:324},{x:955,y:270},{x:1006,y:237},{x:1060,y:234},{x:1093,y:228},{x:1110,y:205},{x:1111,y:180},{x:1099,y:155},{x:1074,y:146},{x:1050,y:140},{x:913,y:142},{x:896,y:151},{x:891,y:172},{x:891,y:439},{x:882,y:472},{x:861,y:494},{x:836,y:513},{x:796,y:526},{x:751,y:534},{x:350,y:532},{x:298,y:519},{x:253,y:496},{x:221,y:449},{x:219,y:398},{x:231,y:355},{x:259,y:319},{x:319,y:290},{x:359,y:289},{x:559,y:284},{x:584,y:279},{x:605,y:264},{x:607,y:240},{x:606,y:153},{x:481,y:231},{x:436,y:240},{x:389,y:239},{x:320,y:216}]
    ];}

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
  }

  draw(ctx) {
  
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = "white";

    // for (let i = 1; i <= this.laneCount - 1; i++) {
    //   const x = lerp(this.left, this.right, i / this.laneCount);

    //   ctx.setLineDash([20, 20]);
    //   ctx.beginPath();
    //   // ctx.moveTo(x, this.top);
    //   // ctx.lineTo(x, this.bottom);
    //   ctx.arc(450, -235, 380, 0, 2 * Math.PI);
    //   ctx.stroke();

    // }

    // ctx.setLineDash([]);

    // this.borders.forEach((border) => {
    //   ctx.beginPath();
    //   ctx.moveTo(border[0].x, border[0].y);
    //   ctx.lineTo(border[1].x, border[1].y);

    //   // ctx.arc(450, -235, 300, 0, 2 * Math.PI);
    //   // ctx.arc(450, -235, 450, 0, 2 * Math.PI);
    //   // ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
    //   ctx.strokeStyle = "black";
    //   ctx.stroke();
    //   // ctx.fill()
    // });

  

    for (let i = 0; i < this.borders[0].length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(this.borders[0][i].x, this.borders[0][i].y);
      ctx.lineTo(this.borders[0][i + 1].x, this.borders[0][i + 1].y);
      ctx.strokeStyle = "green";
      ctx.stroke();

    }    
    for (let i = 0; i < this.borders[1].length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(this.borders[1][i].x, this.borders[1][i].y);
      ctx.lineTo(this.borders[1][i + 1].x, this.borders[1][i + 1].y);
      ctx.strokeStyle = "black";
      ctx.stroke();

    }    
    for (let i = 0; i < this.borders[2].length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(this.borders[2][i].x, this.borders[2][i].y);
      ctx.lineTo(this.borders[2][i + 1].x, this.borders[2][i + 1].y);
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  }
}

// draw(ctx) {
//   ctx.lineWidth = 5;
//   ctx.strokeStyle = "white";

//   for (let i = 1; i <= this.laneCount - 1; i++) {
//     const x = lerp(this.left, this.right, i / this.laneCount);

//     ctx.setLineDash([20, 20]);
//     ctx.beginPath();
//     ctx.moveTo(x, this.top);
//     ctx.lineTo(x, this.bottom);
//     ctx.stroke();

//   }

//   ctx.setLineDash([]);
//   this.borders.forEach((border) => {
//     ctx.beginPath();
//     ctx.moveTo(border[0].x, border[0].y);
//     ctx.lineTo(border[1].x, border[1].y);
//     // ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
//     ctx.stroke();
//   });
// }
