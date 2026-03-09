// background.js - Fondo animado básico estilo videojuegos (~300 líneas reducidas)

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Objetos
let clouds = [];
let mountains = [];
let particles = [];

// Crear objetos
for(let i=0;i<8;i++){
    clouds.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height/2,r:50+Math.random()*50,speed:0.2+Math.random()*0.3});
}
for(let i=0;i<6;i++){
    mountains.push({x:Math.random()*canvas.width,y:canvas.height-100-Math.random()*100,w:200+Math.random()*200,h:80+Math.random()*100});
}
for(let i=0;i<100;i++){
    particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*1,vy:(Math.random()-0.5)*1,r:1+Math.random()*2});
}

// Dibujar cielo simple
function drawSky(){
    let grad = ctx.createLinearGradient(0,0,0,canvas.height);
    grad.addColorStop(0,'rgb(30,30,80)');
    grad.addColorStop(1,'rgb(10,10,30)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// Dibujar nubes
function drawClouds(){
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    clouds.forEach(c=>{
        ctx.beginPath();
        ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
        ctx.fill();
        c.x-=c.speed;
        if(c.x+c.r<0)c.x=canvas.width+c.r;
    });
}

// Dibujar montañas simples
function drawMountains(){
    mountains.forEach(m=>{
        ctx.fillStyle='rgb(50,50,100)';
        ctx.beginPath();
        ctx.moveTo(m.x,canvas.height);
        ctx.lineTo(m.x+m.w/2,m.y);
        ctx.lineTo(m.x+m.w,canvas.height);
        ctx.closePath();
        ctx.fill();
        m.x-=0.3;
        if(m.x+m.w<0)m.x=canvas.width;
    });
}

// Dibujar partículas
function drawParticles(){
    particles.forEach(p=>{
        ctx.fillStyle='rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.x+=p.vx;
        p.y+=p.vy;
        if(p.x<0)p.x=canvas.width;
        if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height;
        if(p.y>canvas.height)p.y=0;
    });
}

// Animación principal
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawSky();
    drawMountains();
    drawClouds();
    drawParticles();
    requestAnimationFrame(animate);
}

animate();
