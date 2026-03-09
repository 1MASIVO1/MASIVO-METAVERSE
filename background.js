// background.js - fondo videojuego AAA solo Canvas 2D

const canvas = document.getElementById('engineBackground');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

// --- CONFIGURACIÓN ---
const numCharacters = 6;
const numObjects = 10;
const numParticles = 80;

const characters = [];
const objects = [];
const particles = [];

// --- PERSONAJES ---
for(let i=0;i<numCharacters;i++){
    characters.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height/2 + canvas.height/4,
        width: 30,
        height: 50,
        color: '#00ffff',
        dx: (Math.random()-0.5)*2,
        dy: (Math.random()-0.5)*2,
        angle: Math.random()*Math.PI*2
    });
}

// --- OBJETOS FLOTANTES ---
for(let i=0;i<numObjects;i++){
    objects.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: 20 + Math.random()*20,
        color: 'rgba(255,0,255,0.7)',
        dx: (Math.random()-0.5)*1,
        dy: (Math.random()-0.5)*1,
        angle: Math.random()*Math.PI*2
    });
}

// --- PARTICULAS ---
for(let i=0;i<numParticles;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        radius: 2 + Math.random()*3,
        color: 'rgba(255,170,0,0.6)',
        dy: 0.5 + Math.random()
    });
}

// --- FUNCIÓN DE DIBUJO ---
function drawBackground(){
    const gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,'#0d0d1a');
    gradient.addColorStop(1,'#1a1a3d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawCharacters(){
    characters.forEach(c=>{
        ctx.save();
        ctx.translate(c.x,c.y);
        ctx.rotate(Math.sin(Date.now()*0.001 + c.angle)*0.5);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.width/2,-c.height/2,c.width,c.height);
        ctx.restore();

        c.x += c.dx;
        c.y += c.dy;
        if(c.x<0) c.x=canvas.width;
        if(c.x>canvas.width) c.x=0;
        if(c.y<0) c.y=canvas.height;
        if(c.y>canvas.height) c.y=0;
    });
}

function drawObjects(){
    objects.forEach(o=>{
        ctx.save();
        ctx.translate(o.x,o.y);
        ctx.rotate(Math.sin(Date.now()*0.001 + o.angle));
        ctx.fillStyle = o.color;
        ctx.fillRect(-o.size/2,-o.size/2,o.size,o.size);
        ctx.restore();

        o.x += o.dx;
        o.y += o.dy;
        if(o.x<0) o.x=canvas.width;
        if(o.x>canvas.width) o.x=0;
        if(o.y<0) o.y=canvas.height;
        if(o.y>canvas.height) o.y=0;
    });
}

function drawParticles(){
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y -= p.dy;
        if(p.y<0) p.y=canvas.height;
    });
}

// --- ANIMACIÓN ---
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBackground();
    drawObjects();
    drawCharacters();
    drawParticles();
    requestAnimationFrame(animate);
}

animate();

// --- RESPONSIVE ---
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
