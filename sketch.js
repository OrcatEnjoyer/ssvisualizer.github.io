let planets = [];
let sunRadius = 50;
let scaleFactor = 2;
let planetSpacing = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();


  planets.push(new Planet(15, 0.02, color(255, 165, 0), 'Mercury'));  
  planets.push(new Planet(22, 0.015, color(255, 192, 203), 'Venus')); 
  planets.push(new Planet(30, 0.01, color(0, 255, 0), 'Earth'));  
  planets.push(new Planet(18, 0.008, color(255, 0, 0), 'Mars')); 
  planets.push(new Planet(60, 0.005, color(255, 255, 0), 'Jupiter')); 
  planets.push(new Planet(52, 0.004, color(245, 222, 179), 'Saturn')); 
  planets.push(new Planet(40, 0.003, color(173, 216, 230), 'Uranus'));
  planets.push(new Planet(39, 0.002, color(0, 0, 255), 'Neptune')); 
  planets.push(new Planet(12, 0.001, color(255), 'Pluto')); 
}

function draw() {
  background(0);

  fill(255, 255, 150);
  ellipse(width / 2, height / 2, sunRadius * scaleFactor * 2, sunRadius * scaleFactor * 2);

  let maxRadius = max(planets.map(planet => planet.radius));

  for (let i = 0; i < planets.length; i++) {
    planets[i].update(scaleFactor, maxRadius);
    planets[i].display();
  }
}

class Planet {
  constructor(diameter, speed, color, label) {
    this.diameter = diameter;
    this.radius = this.diameter / 2;
    this.angle = random(TWO_PI); 
    this.speed = speed;
    this.color = color;
    this.label = label;
  }

  update(scaleFactor, maxRadius) {
    this.angle += this.speed;

    let scaledMaxRadius = maxRadius * scaleFactor;
    this.radius = (this.diameter / 2) * (scaledMaxRadius / maxRadius);
  }

  display() {
    let radiusOffset = (sunRadius * scaleFactor) + planetSpacing * (planets.indexOf(this) + 1); // Adjust the spacing between planets
    let x = width / 2 + cos(this.angle) * radiusOffset;
    let y = height / 2 + sin(this.angle) * radiusOffset;

    fill(this.color);
    ellipse(x, y, this.diameter, this.diameter);

    fill(255);
    textAlign(CENTER, CENTER);
    text(this.label, x, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
