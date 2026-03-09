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
size:Math.random()*2

})

}



/* CUBOS FLOTANTES */

let cubes=[]

for(let i=0;i<20;i++){

cubes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*30+20,
vy:Math.random()*0.3+0.1

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



/* ANIMACION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)



/* GRID */

drawGrid()



/* ESTRELLAS */

stars.forEach(s=>{

s.y+=s.speed

if(s.y>canvas.height) s.y=0

ctx.beginPath()
ctx.arc(s.x,s.y,s.size,0,Math.PI*2)
ctx.fillStyle="white"
ctx.fill()

})



/* CUBOS */

cubes.forEach(c=>{

c.y-=c.vy

if(c.y<-c.size) c.y=canvas.height+c.size

ctx.strokeStyle="cyan"

ctx.strokeRect(c.x,c.y,c.size,c.size)

})



/* METEOROS */

meteors.forEach(m=>{

m.x+=m.vx
m.y+=m.vy
m.life--

ctx.beginPath()
ctx.arc(m.x,m.y,m.size,0,Math.PI*2)
ctx.fillStyle="orange"
ctx.fill()

})

meteors=meteors.filter(m=>m.life>0)



requestAnimationFrame(animate)

}

animate()
