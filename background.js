// background.js - Fondo oceánico profesional animado en Canvas 2D
const canvas = document.getElementById('engineBackground');
const ctx = canvas.getContext('2d');

// --- FUNCIONES AUXILIARES ---
function random(min, max) { return Math.random() * (max - min) + min; }

// --- REDIMENSIONAR CANVAS ---
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- CONFIGURACIÓN ELEMENTOS ---
const sharks = [], whales = [], fishes = [], corals = [], bubbles = [];
const numSharks = 3, numWhales = 2, numFishes = 40, numCorals = 20, numBubbles = 100;

// --- CREAR ELEMENTOS ---
for (let i = 0; i < numSharks; i++)
    sharks.push({ x: random(0, canvas.width), y: random(canvas.height/2, canvas.height*0.9), size: 100, dx: random(1,2), color:'#444', angle:0 });
for (let i = 0; i < numWhales; i++)
    whales.push({ x: random(0, canvas.width), y: random(canvas.height/3, canvas.height*0.7), size:180, dx:0.8, color:'#2255ff', angle:0 });
for (let i = 0; i < numFishes; i++)
    fishes.push({ x: random(0, canvas.width), y: random(0, canvas.height), size:10+random(5,15), dx:random(1,3), dy:Math.sin(random(0,Math.PI*2))*0.5, color:`hsl(${random(0,360)},80%,60%)`, angle:0 });
for (let i = 0; i < numBubbles; i++)
    bubbles.push({ x: random(0, canvas.width), y: random(0, canvas.height), radius: random(2,6), dy: random(0.5,1.5), alpha: random(0.3,0.8) });
for (let i = 0; i < numCorals; i++)
    corals.push({ x: random(0, canvas.width), y: canvas.height-30, width: random(10,30), height: random(20,60), color: `hsl(${random(0,360)},70%,50%)`, sway: random(0.01,0.03), angle:0 });

// --- FUNCIONES DE DIBUJO ---
function drawBackground() {
    const grad = ctx.createLinearGradient(0,0,0,canvas.height);
    grad.addColorStop(0,'#1a9fff'); // luz superficial
    grad.addColorStop(1,'#012a3c'); // profundidad
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSharks() {
    sharks.forEach(s => {
        ctx.save();
        ctx.translate(s.x,s.y);
        ctx.rotate(Math.sin(s.angle)*0.1);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(-s.size/2,0);
        ctx.lineTo(s.size/2,-s.size/4);
        ctx.lineTo(s.size/2,s.size/4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        s.x += s.dx;
        s.angle += 0.02;
        if(s.x > canvas.width + s.size) s.x = -s.size;
    });
}

function drawWhales() {
    whales.forEach(w => {
        ctx.save();
        ctx.translate(w.x,w.y);
        ctx.rotate(Math.sin(w.angle)*0.05);
        ctx.fillStyle = w.color;
        ctx.beginPath();
        ctx.ellipse(0,0,w.size/2,w.size/4,0,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
        w.x += w.dx;
        w.angle += 0.01;
        if(w.x > canvas.width + w.size) w.x = -w.size;
    });
}

function drawFishes() {
    fishes.forEach(f => {
        ctx.save();
        ctx.translate(f.x,f.y);
        ctx.rotate(Math.sin(f.angle)*0.5);
        ctx.fillStyle = f.color;
        ctx.beginPath();
        ctx.moveTo(-f.size/2,0);
        ctx.lineTo(f.size/2,-f.size/4);
        ctx.lineTo(f.size/2,f.size/4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        f.x += f.dx;
        f.y += f.dy;
        f.angle += 0.1;
        if(f.x > canvas.width+f.size) f.x = -f.size;
        if(f.y > canvas.height) f.y = 0;
        if(f.y < 0) f.y = canvas.height;
    });
}

function drawBubbles() {
    bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${b.alpha})`;
        ctx.fill();
        b.y -= b.dy;
        if(b.y < 0) b.y = canvas.height;
    });
}

function drawCorals() {
    corals.forEach(c => {
        ctx.save();
        ctx.translate(c.x,c.y);
        ctx.rotate(Math.sin(c.angle)*c.sway);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.width/2,-c.height,c.width,c.height);
        ctx.restore();
        c.angle += 0.02;
    });
}

// --- ANIMACIÓN PRINCIPAL ---
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBackground();
    drawCorals();
    drawSharks();
    drawWhales();
    drawFishes();
    drawBubbles();
    requestAnimationFrame(animate);
}
animate();
