const canvas = document.getElementById("engineBackground")
const ctx = canvas.getContext("2d")

function resize(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

resize()
window.addEventListener("resize", resize)



/* CAMARA */

let cameraX = 0



/* EDIFICIOS */

let buildings=[]

for(let i=0;i<120;i++){

buildings.push({

x:Math.random()*8000,
width:Math.random()*120+60,
height:Math.random()*500+150,
windows:Math.floor(Math.random()*40)+10

})

}



/* PANTALLAS DIGITALES */

let billboards=[]

for(let i=0;i<40;i++){

billboards.push({

x:Math.random()*8000,
y:Math.random()*400+200,
width:Math.random()*120+80,
height:Math.random()*60+40,
color:`hsl(${Math.random()*360},80%,60%)`

})

}



/* TRAFICO DE DATOS */

let streams=[]

for(let i=0;i<60;i++){

streams.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
speed:Math.random()*4+1,
length:Math.random()*40+20

})

}



/* PARTICULAS */

let particles=[]

for(let i=0;i<200;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
speed:Math.random()*0.5,
size:Math.random()*2

})

}



/* CIELO */

function drawSky(){

let g=ctx.createLinearGradient(0,0,0,canvas.height)

g.addColorStop(0,"#0a0f2c")
g.addColorStop(1,"#151c48")

ctx.fillStyle=g
ctx.fillRect(0,0,canvas.width,canvas.height)

}



/* EDIFICIOS */

function drawBuildings(){

buildings.forEach(b=>{

let x=b.x-cameraX

ctx.fillStyle="#1b2a6d"

ctx.fillRect(
x,
canvas.height-b.height,
b.width,
b.height
)

/* ventanas */

for(let i=0;i<b.windows;i++){

let wx=x+10+(i%6)*15
let wy=canvas.height-b.height+20+Math.floor(i/6)*20

ctx.fillStyle="cyan"

ctx.fillRect(wx,wy,6,10)

}

})

}



/* PANTALLAS */

function drawBillboards(){

billboards.forEach(b=>{

let x=b.x-cameraX

ctx.fillStyle=b.color

ctx.fillRect(
x,
canvas.height-b.y,
b.width,
b.height
)

})

}



/* TRAFICO DIGITAL */

function drawStreams(){

streams.forEach(s=>{

s.x+=s.speed

if(s.x>canvas.width){

s.x=-100
s.y=Math.random()*canvas.height

}

ctx.strokeStyle="rgba(0,255,255,0.8)"
ctx.lineWidth=2

ctx.beginPath()

ctx.moveTo(s.x,s.y)
ctx.lineTo(s.x-s.length,s.y)

ctx.stroke()

})

}



/* PARTICULAS */

function drawParticles(){

ctx.fillStyle="white"

particles.forEach(p=>{

p.y+=p.speed

if(p.y>canvas.height){

p.y=0
p.x=Math.random()*canvas.width

}

ctx.beginPath()

ctx.arc(p.x,p.y,p.size,0,Math.PI*2)

ctx.fill()

})

}



/* SUELO */

function drawGround(){

ctx.fillStyle="#0a0f25"

ctx.fillRect(
0,
canvas.height-120,
canvas.width,
120
)

}



/* ANIMACION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

cameraX+=0.6

drawSky()
drawBuildings()
drawBillboards()
drawStreams()
drawParticles()
drawGround()

requestAnimationFrame(animate)

}

animate()
