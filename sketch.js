let time = 0;
let x = [];
let y = [];
let slider;
let fourierY;
let fourierX;
let path = [];

function setup() {
  createCanvas(2000, 3000);
  scale(0.5);
  const skip = 8;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
  fourierX = dft(x);
  fourierY = dft(y);

  // fourierX.sort((a, b) => b.amp - a.amp);
  // fourierY.sort((a, b) => b.amp - a.amp);
}

function drawEpicycles(x, y, rotation, fourier){
  for (let i=0; i<fourier.length; i++){
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;

    let radius = fourier[i].amplitude;

    let phase = fourier[i].phase;

    x+= radius * cos(freq * time + phase + rotation);
    y+= radius * sin(freq * time + phase + rotation);
    strokeWeight(1);
    stroke(255);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);

  let vy = drawEpicycles(50, 300, PI/2, fourierY);
  let vx = drawEpicycles(400, 100, 0, fourierX);
  let v = createVector(vx.x, vy.y);

  path.unshift(v);

  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  beginShape();
  noFill();
  stroke(255);

  for (let i=1; i<path.length; i++){
    prevx = path[i-1].x;
    prevy = path[i-1].y;
    // strokeWeight(10);
    fill(255);
    circle(path[i].x, path[i].y, 10);
  }
  endShape();


  const dt = (TWO_PI / fourierY.length);

  time += dt;
}
