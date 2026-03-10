// ocean3D.js - Pseudo-3D submarino animado
const canvas = document.getElementById('engineBackground');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- CONFIGURACIÓN ---
const animals = [];
const bubbles = [];
const corals = [];
const numWhales = 2;
const numSharks = 3;
const numFishes = 40;
const numBubbles = 80;
const numCorals = 20;

// Colores de corales
const coralColors = ['#ff5e5e','#ff9a5e','#ffde5e','#5effa0','#5ed1ff','#9a5eff'];

// --- CREAR ANIMALES ---
for (let i = 0; i < numWhales; i++) {
    animals.push({
        type: 'whale',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5 + canvas.height*0.2,
        size: 120,
        dx: 0.5 + Math.random()*0.3,
        dy: Math.sin(Math.random()*Math.PI*2)*0.3,
        color: '#2255ff',
        angle: 0
    });
}
for (let i = 0; i < numSharks; i++) {
    animals.push({
        type: 'shark',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.6 + canvas.height*0.2,
        size: 80,
        dx: 0.7 + Math.random()*0.3,
        dy: Math.sin(Math.random()*Math.PI*2)*0.3,
        color: '#444444',
        angle: 0
    });
}
for (let i = 0; i < numFishes; i++) {
    animals.push({
        type: 'fish',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10+Math.random()*15,
        dx: 1 + Math.random()*1.5,
        dy: Math.sin(Math.random()*Math.PI*2)*0.5,
        color: `hsl(${Math.random()*360},80%,60%)`,
        angle: 0
    });
}

// --- CREAR CORALES ---
for (let i = 0; i < numCorals; i++) {
    corals.push({
        x: Math.random() * canvas.width,
        y: canvas.height - 20,
        width: 10 + Math.random()*20,
        height: 30 + Math.random()*50,
        color: coralColors[Math.floor(Math.random()*coralColors.length)],
        sway: Math.random()*0.03,
        angle: Math.random()*Math.PI*2
    });
}

// --- CREAR BURBUJAS ---
for (let i = 0; i < numBubbles; i++) {
    bubbles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: 2 + Math.random()*4,
        dy: 0.5 + Math.random()*1,
        alpha: 0.3 + Math.random()*0.5
    });
}

// --- FUNCIONES DE DIBUJO ---
function drawBackground() {
    const grad = ctx.createLinearGradient(0,0,0,canvas.height);
    grad.addColorStop(0,'#1a9fff');
    grad.addColorStop(1,'#012a3c');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawCorals() {
    corals.forEach(c=>{
        ctx.save();
        ctx.translate(c.x,c.y);
        ctx.rotate(Math.sin(c.angle)*c.sway);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.width/2,-c.height,c.width,c.height);
        ctx.restore();
        c.angle += 0.01;
    });
}

function drawAnimals() {
    animals.forEach(a=>{
        ctx.save();
        ctx.translate(a.x,a.y);
        ctx.rotate(Math.sin(a.angle)*0.1);
        ctx.fillStyle = a.color;
        // Dibujar pseudo-3D según tipo
        if(a.type==='whale'){
            ctx.beginPath();
            ctx.ellipse(0,0,a.size*0.5,a.size*0.25,0,0,Math.PI*2);
            ctx.fill();
        } else if(a.type==='shark'){
            ctx.beginPath();
            ctx.moveTo(-a.size/2,0);
            ctx.lineTo(a.size/2,-a.size/4);
            ctx.lineTo(a.size/2,a.size/4);
            ctx.closePath();
            ctx.fill();
        } else { // fish
            ctx.beginPath();
            ctx.moveTo(-a.size/2,0);
            ctx.lineTo(a.size/2,-a.size/4);
            ctx.lineTo(a.size/2,a.size/4);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
        a.x += a.dx;
        a.y += a.dy;
        a.angle += 0.05;
        if(a.x>canvas.width + a.size) a.x=-a.size;
        if(a.y>canvas.height) a.y=0;
        if(a.y<0) a.y=canvas.height;
    });
}

function drawBubbles() {
    bubbles.forEach(b=>{
        ctx.beginPath();
        ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${b.alpha})`;
        ctx.fill();
        b.y -= b.dy;
        if(b.y<0) b.y = canvas.height;
    });
}

// --- ANIMACIÓN ---
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBackground();
    drawCorals();
    drawAnimals();
    drawBubbles();
    requestAnimationFrame(animate);
}
animate();
