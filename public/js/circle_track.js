function setup(){
    createCanvas(windowWidth, windowHeight);
    background (100);
}

function draw(){
    noFill();
    stroke(255)
    ellipse(width/2, height/2, 300, 300)
    ellipse(width/2, height/2, 600, 600)
}