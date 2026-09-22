let ants = [];
let mants = 0;
let r = 15; //size of the ants
let distTarget = r; //distance target
let ant;
let cx = 200;
let cy = 300;
let spdX = 1;
let spdY = 1;
let target; 
//images
let img;
let stimg;
let crimg;
//Layers
let front;
//GUI
let gui;
//game state variables
let hide = 1;
let gmst = 0;
let start = 0;
let move = -1;
//title colors
let hu = 360;

async function setup() {
  createCanvas(600, 450);
  textFont('Georgia');

  front = createGraphics(600,450);
  front.clear();
  gui = createGraphics(600,450);

  for (let i = 0; i < mants; i += 1) {
    let x = random(width); 
    let y = random(height);
    ants.push(new Ant(x, y, r, distTarget));
  }

  stimg = await loadImage('StartScreen.png');
  img = await loadImage('textu.jpg');
  crimg = await loadImage('creature3.PNG');
  
}

function draw() {

  gui.textFont('Georgia');
  
  if (start < 1){
   background(stimg);
   textAlign(CENTER);
   push();
   colorMode(HSB,360,100,100);
   if (hu < 1){
     hu = 360;
   } else{
     hu -=1;
   }
   stroke(0);
   fill(hu,100,100);
   textSize(83);
   text("InKritters",390,95);
   fill(95);
   stroke(hu,100,100);
   rectMode(CENTER);
   rect(485,150,120,50);
   fill(hu,100,100);
   noStroke();
   textSize(30);
   text("Start!",485,160);
   pop();
  }
  else{
  background(img); 
  if (gmst < 1) {
    gui.clear();
    gui.fill(100);
    gui.stroke(255);
    gui.rect(525,405,60,30);
    gui.fill(255);
    gui.noStroke();
    gui.textSize(14);
    gui.text("Done!",536,425);
    gui.fill(0);
    gui.text("Press Space to make the Critters Stop/Go!",14,425);
  } else {
    ants.length = 0;
    mants = 0;
    if (hide > 0){
    gui.clear();
    gui.fill(255);
    gui.stroke(100);
    gui.rect(525,405,60,30);
    gui.fill(0);
    gui.noStroke();
    gui.textSize(14);
    gui.text("Restart",533,425);
    gui.text("Press Space to hide/return the GUI",14,425);
    } else{
    gui.clear();
    }
    
  }

   //This goes BEFORE the moving ants. Idk why that fixes it but it does I guess???
   image(front,0,0);
    
  //draws/moves ants
  if (move < 0 ){
  for (let i = 0; i < mants; i += 1) {
    ants[i].show();
  } } else if (move > 0){
     for (let i = 0; i < mants; i += 1) {
    ants[i].show();
    ants[i].move(ants[i].target.x, ants[i].target.y, 0.03);
  } 
  }
    
   image(gui,0,0);
    
  }
}

function mousePressed() {
   if (start < 1){
     if (mouseX > 425 && mouseX < 545 && mouseY > 125 && mouseY < 175){
    start += 1;
     }
  }
  else{
  mants += 1;
  ants.push(new Ant(mouseX, mouseY, 15, distTarget));

  if (mouseX > 522 && mouseX < 585 && mouseY > 405 && mouseY < 435){
    if (gmst < 1){
      gmst += 1;
    } else if (gmst > 0){
      gmst = gmst - 1;
      front.clear();
      ants.length = 0;
      mants = 0;
    }
  }
 }
}

function keyPressed(){
  if (keyCode === 32 && gmst > 0){
    hide = hide * -1;
  } else if (keyCode === 32 && gmst < 1){
    move = move * -1;
  }
}

class Ant {
  constructor(x, y, r, distTarget) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.distTarget = distTarget;
    this.a = 0;
    this.timerx = random(10,60);
    this.timery = random(10,500);
    this.cr = random(255);
    this.cb = random(255);
    this.cg = random(255);
    
    this.target = createVector(random(width), random(height));
  }

  show() {

     front.fill(this.cr, this.cb, this.cg);
    noStroke();

    push();
    translate(this.x, this.y);
    rotate(this.a);

    //ants
    fill(0);
    imageMode(CENTER);
    image(crimg, 0, 0, this.r+1, this.r);
    stroke(255);
    pop();

    //colored ants
    front.noStroke();
    front.ellipse(this.x, this.y, this.r, this.r);
    
  }

  move(x, y, speed) {
    
    let dx = x - this.x;
    let dy = y - this.y;
    this.a = atan2(dy, dx);

    let distBtw = dist(x, y, this.x, this.y);
    if (distBtw > this.r / 2) {
      let distTravel = distBtw - this.distTarget;
      this.x += speed * distTravel * cos(this.a);
      this.y += speed * distTravel * sin(this.a);
    }

    this.x = constrain(this.x, -100, width);
    this.y = constrain(this.y, -100, height);

    if (this.timerx < 0){
      this.timerx = random(20,160);
      this.target.x = random(-50, 650);
      this.target.y = random(-50, 500);
    } else {
      this.timerx = this.timerx - 1;
    }

     if (this.timery < 0){
      this.timery = random(20,160);
      this.target.x = random(-50,650);
      this.target.y = random(-50,500);
    } else {
      this.timery = this.timery - 1;
    }
  }
}
