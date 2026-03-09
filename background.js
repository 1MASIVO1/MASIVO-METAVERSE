// background.js - Fondo animado estilo Unreal Engine limpio

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ---- CONFIG ----
const skyParticles = [];
const streaks = [];
const colors = ['#ff8c00','#ffd700','#00ffff','#ff00ff'];

// ---- CREAR PARTICULAS ----
for(let i=0;i<200;i++){
    skyParticles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        radius: 1 + Math.random()*3,
        opacity: 0.2 + Math.random()*0.5,
        speed: 0.1 + Math.random()*0.3,
        color: colors[Math.floor(Math.random()*colors.length)]
    });
}

// ---- CREAR RAYOS DE LUZ ----
for(let i=0;i<50;i++){
    streaks.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        length: 50 + Math.random()*100,
        speed: 0.5 + Math.random()*1,
        angle: Math.random()*Math.PI*2,
        color: colors[Math.floor(Math.random()*colors.length)]
    });
}

// ---- DRAW ----
function drawSky(){
    const gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,'#0b0c1e');
    gradient.addColorStop(1,'#1a1b40');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawParticles(){
    skyParticles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle = p.color.replace(')', `,${p.opacity})`).replace('rgb','rgba');
        ctx.fill();
        p.x += p.speed;
        p.y += Math.sin(p.x/100)*0.5;
        if(p.x>canvas.width)p.x=0;
        if(p.y>canvas.height)p.y=0;
    });
}

function drawStreaks(){
    streaks.forEach(s=>{
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x,s.y);
        ctx.lineTo(s.x + Math.cos(s.angle)*s.length, s.y + Math.sin(s.angle)*s.length);
        ctx.stroke();
        s.x += Math.cos(s.angle)*s.speed;
        s.y += Math.sin(s.angle)*s.speed;
        if(s.x>canvas.width)s.x=0;
        if(s.y>canvas.height)s.y=0;
    });
}

// ---- ANIMATE ----
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawSky();
    drawParticles();
    drawStreaks();
    requestAnimationFrame(animate);
}

animate();
