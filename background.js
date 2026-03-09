const canvas = document.getElementById("engineBackground")
const ctx = canvas.getContext("2d")

function resize(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

resize()
window.addEventListener("resize", resize)



/* ESTRELLAS */

let stars=[]

for(let i=0;i<150;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
speed:Math.random()*0.6+0.2,
size:Math.random()*2,
alpha:Math.random(),
alphaSpeed:Math.random()*0.02

})

}



/* CUBOS FLOTANTES */

let cubes=[]

for(let i=0;i<20;i++){

cubes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*30+20,
vy:Math.random()*0.3+0.1,
angle:Math.random()*Math.PI,
rotation:(Math.random()-0.5)*0.01

})

}



/* OBJETOS TIPO METEORO */

let meteors=[]

function spawnMeteor(){

meteors.push({

x:Math.random()*canvas.width,
y:-20,
vx:(Math.random()-0.5)*2,
vy:Math.random()*3+2,
size:Math.random()*3+2,
life:200

})

}

setInterval(spawnMeteor,2000)



/* GRID TIPO VIDEOJUEGO */

function drawGrid(){

let gridSize=60

ctx.strokeStyle="rgba(0,200,200,0.15)"

for(let x=0;x<canvas.width;x+=gridSize){

ctx.beginPath()
ctx.moveTo(x,0)
ctx.lineTo(x,canvas.height)
ctx.stroke()

}

for(let y=0;y<canvas.height;y+=gridSize){

ctx.beginPath()
ctx.moveTo(0,y)
ctx.lineTo(canvas.width,y)
ctx.stroke()

}

}



/* SUELO ESTILO VIDEOJUEGO */

function drawGameFloor(){

let horizon = canvas.height*0.6
let lines = 40

ctx.strokeStyle="rgba(0,255,255,0.25)"

/* líneas horizontales perspectiva */

for(let i=0;i<lines;i++){

let y = horizon + (i*i*2)

ctx.beginPath()
ctx.moveTo(0,y)
ctx.lineTo(canvas.width,y)
ctx.stroke()

}

/* líneas verticales perspectiva */

for(let x=0;x<canvas.width;x+=80){

ctx.beginPath()
ctx.moveTo(x,horizon)
ctx.lineTo(canvas.width/2,canvas.height)
ctx.stroke()

}

}



/* ANIMACION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

/* GRID */

drawGrid()

/* SUELO */

drawGameFloor()



/* ESTRELLAS */

stars.forEach(s=>{

s.y+=s.speed

if(s.y>canvas.height) s.y=0

s.alpha+=s.alphaSpeed
if(s.alpha>1 || s.alpha<0) s.alphaSpeed*=-1

ctx.beginPath()
ctx.arc(s.x,s.y,s.size,0,Math.PI*2)
ctx.fillStyle=`rgba(255,255,255,${s.alpha})`
ctx.fill()

})



/* CUBOS */

cubes.forEach(c=>{

c.y-=c.vy
c.angle+=c.rotation

if(c.y<-c.size) c.y=canvas.height+c.size

ctx.save()
ctx.translate(c.x,c.y)
ctx.rotate(c.angle)

ctx.strokeStyle="cyan"
ctx.strokeRect(-c.size/2,-c.size/2,c.size,c.size)

ctx.restore()

})



/* METEOROS */

meteors.forEach(m=>{

m.x+=m.vx
m.y+=m.vy
m.life--

/* cola */

ctx.beginPath()
ctx.moveTo(m.x,m.y)
ctx.lineTo(m.x-m.vx*8,m.y-m.vy*8)
ctx.strokeStyle="orange"
ctx.lineWidth=2
ctx.stroke()

/* núcleo */

ctx.beginPath()
ctx.arc(m.x,m.y,m.size,0,Math.PI*2)
ctx.fillStyle="orange"
ctx.fill()

})

meteors=meteors.filter(m=>m.life>0)



requestAnimationFrame(animate)

}

animate()
