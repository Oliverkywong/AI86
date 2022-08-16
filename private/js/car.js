class Car {
  constructor(x, y, width, height, controlType, maxSpeed = 3, color = "blue", model="../img/f1.png") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;


    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false;
    this.win = false;
    this.check = false;
    this.cheat = false;

    this.useBrain = controlType == "AI";

    if (controlType != "KEY") {
      this.sensor = new Sensor(this);
      this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
    }
    this.controls = new Controls(controlType);

    this.img = new Image();
    this.img.src = model

    this.mask = document.createElement("canvas");
    this.mask.width = width;
    this.mask.height = height;

    const maskCtx = this.mask.getContext("2d");
    this.img.onload = () => {
      maskCtx.fillStyle = color;
      maskCtx.rect(0, 0, this.width, this.height);
      maskCtx.fill();

      maskCtx.globalCompositeOperation = "destination-atop";
      maskCtx.drawImage(this.img, 0, 0, this.width, this.height);
    };
  }

  update(roadBorders, player, winborder, checkborder, cheatborder) {
    this.polygon = this.#createPolygon();
    this.cheat = this.#checkcheat(cheatborder);
    // console.log("cheat"+this.cheat)
    // console.log("check"+this.check)
    // console.log("win"+this.win)
    // if(!this.cheat){
      this.check = this.#checkcheck(checkborder);
      // if(!this.check){
        this.win = this.#checkwin(winborder);
        // this.win = this.#checkwin(winborder);
        // this.check = false
      // }
    // }
    if (!this.damaged) {
      this.#move();
      this.damaged = this.#assessDamage(roadBorders, player);
    } else {
      this.speed = 0;
      this.#move();
      this.damaged = false;
    }
    if (this.sensor) {
      this.sensor.update(roadBorders, player);
      const offsets = this.sensor.readings.map((s) =>
        s == null ? 0 : 1 - s.offset
      );
      const outputs = NeuralNetwork.feedForward(offsets, this.brain);

      if (this.useBrain) {
        this.controls.forward = outputs[0];
        this.controls.left = outputs[1];
        this.controls.right = outputs[2];
        this.controls.reverse = outputs[3];
      }
    }
  }

  #checkwin(winborder){
    const touch = getIntersection(
      {x:this.x,y:this.y-5},
      {x:this.x-5,y:this.y},
      winborder[0],
      winborder[1],
    );
    if (touch) {
      return true;
    }else{
      return false
    }
  }
  #checkcheck(checkborder){
    const touch = getIntersection(
      {x:this.x,y:this.y-this.height},
      {x:this.x-this.width,y:this.y},
      checkborder[0],
      checkborder[1],
    );
    if (touch) {
      return true;
    }else{
      return false
    }
  }
  #checkcheat(cheatborder){
        const touch = getIntersection(
          {x:this.x,y:this.y-this.height},
          {x:this.x-this.width,y:this.y},
          cheatborder[0],
          cheatborder[1],
        );
        if (touch) {
          return true;
        }else{
          return false
        }
  }

  // #checkwin(winborder){
  //   if(polysIntersect(this.polygon, winborder)){
  //     return true;
  //   }
  // }

  //   #checkcheck(checkborder){
  //   if(polysIntersect(this.polygon, checkborder)){
  //     return true;
  //   }
  // }

  // #checkcheat(cheatborder){
  //   if(polysIntersect(this.polygon, cheatborder)){
  //     return true;
  //   }
  // }

  #assessDamage(roadBorders, player) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    for (let i = 0; i < player.length; i++) {
      if (polysIntersect(this.polygon, player[i].polygon)) {
        return true;
      }
    }
    return false;
  }

  #createPolygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points;
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.05 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.05 * flip;
      }
    }
  

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx, drawSensor = false) {
    if (this.sensor && drawSensor) {
      this.sensor.draw(ctx);
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    if (!this.damaged) {
      ctx.drawImage(
        this.mask,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
      ctx.globalCompositeOperation = "multiply";
    }
    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
