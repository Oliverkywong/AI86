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

    // const topLeft = { x: this.left, y: this.top };
    // const topRight = { x: this.right, y: this.top };
    // const bottomLeft = { x: this.left, y: this.bottom };
    // const bottomRight = { x: this.right, y: this.bottom };

    // const topLeft = { x: 100, y: 200 };
    // const topRight = { x: 1100, y: 200};
    // const bottomLeft = { x: 10, y: 110 };
    // const bottomRight = { x: 110, y: 120};

    this.borders = [
    [(450, -235, 300, 0, 2 * Math.PI)],[(450, -235, 450, 0, 2 * Math.PI)]
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
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 1; i <= this.laneCount - 1; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);

      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      // ctx.moveTo(x, this.top);
      // ctx.lineTo(x, this.bottom);
      ctx.arc(450, -235, 380, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.setLineDash([]);
  

    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      // ctx.lineTo(border[1].x, border[1].y);

      ctx.arc(450, -235, 300, 0, 2 * Math.PI);
      ctx.arc(450, -235, 450, 0, 2 * Math.PI);
      // ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
      ctx.strokeStyle = "black";
      ctx.stroke();
    });
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
