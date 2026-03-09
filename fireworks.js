// fireworks.js
// Sistema de fuegos artificiales en canvas

class Firework {
  constructor(x, y, targetX, targetY, color) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.distanceToTarget = Math.hypot(targetX - x, targetY - y);
    this.distanceTraveled = 0;

    this.coordinates = [];
    this.coordinateCount = 3;

    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }

    this.angle = Math.atan2(targetY - y, targetX - x);
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = Math.random() * 50 + 50;
    this.targetRadius = 1;

    this.color = color;
  }

  update(index, particles, fireworks) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    if (this.targetRadius < 8) {
      this.targetRadius += 0.3;
    } else {
      this.targetRadius = 1;
    }

    this.speed *= this.acceleration;

    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;

    this.distanceTraveled = Math.hypot(this.x + vx - fireworks.cx, this.y + vy - fireworks.cy);

    if (this.distanceTraveled >= this.distanceToTarget) {
      fireworks.createParticles(this.targetX, this.targetY, this.color, particles);
      fireworks.list.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    const last = this.coordinates[this.coordinates.length - 1];
    ctx.moveTo(last[0], last[1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;

    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }

    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 10 + 1;

    this.friction = 0.95;
    this.gravity = 1;

    this.hue = color;
    this.brightness = Math.random() * 50 + 50;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.003;
  }

  update(index, particles) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.friction;

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;

    this.alpha -= this.decay;

    if (this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    const last = this.coordinates[this.coordinates.length - 1];
    ctx.moveTo(last[0], last[1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.stroke();
  }
}

export class FireworksSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.cw = canvas.width = window.innerWidth;
    this.ch = canvas.height = window.innerHeight;

    this.fireworks = [];
    this.particles = [];

    this.cx = this.cw / 2;
    this.cy = this.ch / 2;

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.cw = this.canvas.width = window.innerWidth;
    this.ch = this.canvas.height = window.innerHeight;
    this.cx = this.cw / 2;
    this.cy = this.ch / 2;
  }

  launch() {
    const startX = this.cw / 2;
    const startY = this.ch;
    const targetX = Math.random() * this.cw;
    const targetY = Math.random() * this.ch / 2;

    const hue = Math.floor(Math.random() * 360);

    this.fireworks.push(
      new Firework(startX, startY, targetX, targetY, hue)
    );
  }

  createParticles(x, y, hue, particles) {
    let count = 50;
    while (count--) {
      particles.push(new Particle(x, y, hue));
    }
  }

  update() {
    let i = this.fireworks.length;
    while (i--) {
      this.fireworks[i].update(i, this.particles, this);
    }

    let j = this.particles.length;
    while (j--) {
      this.particles[j].update(j, this.particles);
    }
  }

  draw() {
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.fillStyle = "rgba(0,0,0,0.5)";
    this.ctx.fillRect(0, 0, this.cw, this.ch);

    this.ctx.globalCompositeOperation = "lighter";

    this.fireworks.forEach(f => f.draw(this.ctx));
    this.particles.forEach(p => p.draw(this.ctx));
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    this.update();
    this.draw();

    if (Math.random() < 0.05) {
      this.launch();
    }
  }

  start() {
    this.loop();
  }
}
