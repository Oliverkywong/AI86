class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 1000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };

    // const topLeft = (450, -235, 300, 0, 2 * Math.PI);
    // const topRight = (450, -235, 450, 0, 2 * Math.PI);
    // const bottomLeft = (450, -235, 300, 0, 2 * Math.PI);
    // const bottomRight = (450, -235, 450, 0, 2 * Math.PI);

    this.borders = [
      [{x:55,y:-600+363},{x:0,y:-600+363},{x:0,y:-600+0},{x:1280,y:-600+0},{x:1280,y:-600+363},{x:1057,y:-600+363},{x:1121,y:-600+346},{x:1174,y:-600+324},{x:1222,y:-600+286},{x:1256,y:-600+223},{x:1251,y:-600+161},{x:1217,y:-600+97},{x:1153,y:-600+48},{x:1079,y:-600+27},{x:873,y:-600+27},{x:824,y:-600+40},{x:781,y:-600+72},{x:761,y:-600+105}, {x:761,y:-600+418} , {x:359,y:-600+428}, {x:343,y:-600+413}, {x:358,y:-600+400}, {x:697,y:-600+400}, {x:727,y:-600+374}, {x:743,y:-600+351},{x:743,y:-600+106},{x:719,y:-600+65},{x:659,y:-600+26},{x:605,y:-600+17},{x:548,y:-600+27},{x:411,y:-600+116},{x:371,y:-600+100},{x:250,y:-600+29},{x:181,y:-600+24},{x:120,y:-600+48},{x:55,y:-600+117}            
      ],
      [{x:0,y:-600+363},{x:55,y:-600+363},{x:55,y:-600+598},{x:92,y:-600+649},{x:142,y:-600+679},{x:188,y:-600+694},{x:243,y:-600+700},{x:1075,y:-600+700},{x:1155,y:-600+683},{x:1226,y:-600+624},{x:1245,y:-600+556},{x:1238,y:-600+486},{x:1185,y:-600+407},{x:1115,y:-600+372},{x:1057,y:-600+363},{x:1280,y:-600+363},{x:1280,y:-600+720},{x:0,y:-600+720}],[{x:210,y:-600+150},{x:208,y:-600+504},{x:208,y:-600+534},{x:214,y:-600+551},{x:241,y:-600+566},{x:293,y:-600+571},{x:1041,y:-600+569},{x:1084,y:-600+559},{x:1094,y:-600+537},{x:1091,y:-600+510},{x:1065,y:-600+498},{x:1001,y:-600+483},{x:951,y:-600+458},{x:923,y:-600+424},{x:911,y:-600+380},{x:916,y:-600+324},{x:955,y:-600+270},{x:1006,y:-600+237},{x:1060,y:-600+234},{x:1093,y:-600+228},{x:1110,y:-600+205},{x:1111,y:-600+180},{x:1099,y:-600+155},{x:1074,y:-600+146},{x:1050,y:-600+140},{x:913,y:-600+142},{x:896,y:-600+151},{x:891,y:-600+172},{x:891,y:-600+439},{x:882,y:-600+472},{x:861,y:-600+494},{x:836,y:-600+513},{x:796,y:-600+526},{x:751,y:-600+534},{x:350,y:-600+532},{x:298,y:-600+519},{x:253,y:-600+496},{x:221,y:-600+449},{x:219,y:-600+398},{x:231,y:-600+355},{x:259,y:-600+319},{x:319,y:-600+290},{x:359,y:-600+289},{x:559,y:-600+284},{x:584,y:-600+279},{x:605,y:-600+264},{x:607,y:-600+240},{x:606,y:-600+153},{x:481,y:-600+231},{x:436,y:-600+240},{x:389,y:-600+239},{x:320,y:-600+216}]
      
    ];
  }

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
