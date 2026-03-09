// ===== CANVAS =====

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

window.addEventListener("resize",resize);
resize();


// ===== CIELO =====

function drawSky(){

let g = ctx.createLinearGradient(0,0,0,canvas.height);

g.addColorStop(0,"#00d2ff");
g.addColorStop(1,"#001022");

ctx.fillStyle = g;
ctx.fillRect(0,0,canvas.width,canvas.height);

}


// ===== PARTICULAS =====

let stars = [];

for(let i=0;i<300;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.2
});

}

function drawStars(){

ctx.fillStyle="#00ffff";

stars.forEach(s=>{

ctx.fillRect(s.x,s.y,s.size,s.size);

s.y -= s.speed;

if(s.y < 0){

s.y = canvas.height;
s.x = Math.random()*canvas.width;

}

});

}


// ===== EDIFICIOS =====

let buildings = [];

for(let i=0;i<120;i++){

let w = 40 + Math.random()*60;
let h = 200 + Math.random()*500;

buildings.push({

x: Math.random()*canvas.width,
w:w,
h:h,
color:"rgb("+(10+Math.random()*20)+","+(20+Math.random()*50)+","+(80+Math.random()*120)+")"

});

}


function drawBuildings(){

buildings.forEach(b=>{

ctx.fillStyle=b.color;

ctx.fillRect(
b.x,
canvas.height-b.h,
b.w,
b.h
);


// ventanas neon

for(let y=canvas.height-b.h+20;y<canvas.height;y+=25){

for(let x=b.x+10;x<b.x+b.w-10;x+=18){

if(Math.random()>0.6){

ctx.fillStyle="rgba(0,255,255,0.9)";
ctx.fillRect(x,y,6,10);

}

}

}


// carteles luminosos

if(Math.random()>0.97){

ctx.fillStyle="rgba(255,0,255,0.8)";
ctx.fillRect(b.x+10,canvas.height-b.h+30,40,18);

}

});

}


// ===== ICONOS FLOTANTES =====

let icons = [];

for(let i=0;i<40;i++){

icons.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height*0.6,
size:10+Math.random()*20,
speed:0.3+Math.random()*0.4

});

}

function drawIcons(){

icons.forEach(i=>{

ctx.fillStyle="rgba(255,255,255,0.8)";
ctx.fillRect(i.x,i.y,i.size,i.size);

i.y -= i.speed;

if(i.y < -20){

i.y = canvas.height;
i.x = Math.random()*canvas.width;

}

});

}


// ===== CARRETERA CENTRAL =====

let roadOffset = 0;

function drawRoad(){

ctx.strokeStyle="rgba(0,200,255,0.6)";
ctx.lineWidth=4;

for(let i=0;i<20;i++){

let x = canvas.width/2 + Math.sin(i)*200;

ctx.beginPath();
ctx.moveTo(x,canvas.height);
ctx.lineTo(x,canvas.height-400);
ctx.stroke();

}

}


// ===== TRAFICO =====

let cars = [];

for(let i=0;i<60;i++){

cars.push({

x:Math.random()*canvas.width,
y:canvas.height-100-Math.random()*200,
speed:1+Math.random()*2

});

}

function drawCars(){

cars.forEach(c=>{

ctx.fillStyle="rgba(255,80,200,0.9)";
ctx.fillRect(c.x,c.y,20,4);

c.x += c.speed;

if(c.x > canvas.width){

c.x = -20;

}

});

}


// ===== ANIMACION =====

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawSky();

drawStars();

drawBuildings();

drawIcons();

drawRoad();

drawCars();

requestAnimationFrame(animate);

}

animate();
