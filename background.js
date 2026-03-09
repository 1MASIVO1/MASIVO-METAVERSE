const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

window.addEventListener("resize",resize);
resize();


/* PARTICULAS LUZ */

let lights = [];

for(let i=0;i<200;i++){
lights.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.3+0.1
})
}


/* EDIFICIOS */

let buildings = [];

for(let i=0;i<40;i++){

let w = 60 + Math.random()*80
let h = 200 + Math.random()*500

buildings.push({
x: i*120,
w,
h
})

}


/* CARRETERA */

let roadOffset = 0


function drawSky(){

let g = ctx.createLinearGradient(0,0,0,canvas.height)

g.addColorStop(0,"#00d0ff")
g.addColorStop(1,"#001533")

ctx.fillStyle = g
ctx.fillRect(0,0,canvas.width,canvas.height)

}


/* CIUDAD */

function drawBuildings(){

buildings.forEach(b=>{

ctx.fillStyle="#0a1c3a"

ctx.fillRect(b.x,canvas.height-b.h,b.w,b.h)


/* ventanas */

for(let y=canvas.height-b.h+20;y<canvas.height;y+=25){

for(let x=b.x+10;x<b.x+b.w-10;x+=20){

if(Math.random()>0.7){

ctx.fillStyle="rgba(0,255,255,0.8)"
ctx.fillRect(x,y,6,10)

}

}

}

/* carteles neon */

if(Math.random()>0.96){

ctx.fillStyle="rgba(255,0,255,0.9)"
ctx.fillRect(b.x+10,canvas.height-b.h+30,40,20)

}

})

}


/* PARTICULAS */

function drawLights(){

lights.forEach(l=>{

ctx.beginPath()

ctx.fillStyle="#00ffff"

ctx.arc(l.x,l.y,l.size,0,Math.PI*2)

ctx.fill()

l.y -= l.speed

if(l.y<0){

l.y = canvas.height
l.x = Math.random()*canvas.width

}

})

}


/* TRAFICO */

function drawTraffic(){

roadOffset += 2

for(let i=0;i<30;i++){

let x = (i*120 + roadOffset)%canvas.width
let y = canvas.height - 60 - Math.sin(i)*40

ctx.fillStyle="rgba(255,80,200,0.9)"

ctx.fillRect(x,y,20,4)

}

}


/* ANIMACION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

drawSky()

drawBuildings()

drawLights()

drawTraffic()

requestAnimationFrame(animate)

}

animate()
