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



/* MONTAÑAS */

let mountains=[]

for(let i=0;i<8;i++){
mountains.push({
x:i*600,
height:Math.random()*200+200
})
}



/* TERRENO */

let ground=[]

for(let i=0;i<120;i++){
ground.push({
x:i*120,
height:Math.random()*80+120
})
}



/* ARBOLES */

let trees=[]

for(let i=0;i<40;i++){
trees.push({
x:Math.random()*12000,
size:Math.random()*40+40
})
}



/* ROCAS */

let rocks=[]

for(let i=0;i<60;i++){
rocks.push({
x:Math.random()*12000,
size:Math.random()*20+10
})
}



/* NUBES */

let clouds=[]

for(let i=0;i<12;i++){
clouds.push({
x:Math.random()*canvas.width,
y:Math.random()*200,
size:Math.random()*100+80,
speed:Math.random()*0.3+0.05
})
}



/* PARTICULAS */

let particles=[]

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
speed:Math.random()*0.5+0.2,
size:Math.random()*2
})
}



/* CIELO */

function drawSky(){

let gradient=ctx.createLinearGradient(0,0,0,canvas.height)

gradient.addColorStop(0,"#5fa9ff")
gradient.addColorStop(1,"#dff4ff")

ctx.fillStyle=gradient
ctx.fillRect(0,0,canvas.width,canvas.height)

}



/* MONTAÑAS */

function drawMountains(){

ctx.fillStyle="#6c7a89"

mountains.forEach(m=>{

let x=(m.x-cameraX*0.2)

ctx.beginPath()
ctx.moveTo(x,canvas.height-200)
ctx.lineTo(x+300,canvas.height-m.height)
ctx.lineTo(x+600,canvas.height-200)
ctx.fill()

})

}



/* NUBES */

function drawClouds(){

ctx.fillStyle="white"

clouds.forEach(c=>{

c.x-=c.speed

if(c.x<-c.size) c.x=canvas.width+c.size

ctx.beginPath()
ctx.arc(c.x,c.y,c.size*0.4,0,Math.PI*2)
ctx.arc(c.x+40,c.y+10,c.size*0.35,0,Math.PI*2)
ctx.arc(c.x-40,c.y+10,c.size*0.35,0,Math.PI*2)
ctx.fill()

})

}



/* TERRENO */

function drawGround(){

ground.forEach(g=>{

let x=g.x-cameraX

ctx.fillStyle="#4c9a2a"

ctx.fillRect(
x,
canvas.height-g.height,
120,
g.height
)

ctx.fillStyle="#2f6d1a"

ctx.fillRect(
x,
canvas.height-g.height,
120,
25
)

})

}



/* ARBOLES */

function drawTrees(){

trees.forEach(t=>{

let x=t.x-cameraX

let y=canvas.height-200

ctx.fillStyle="#5b3a1e"

ctx.fillRect(x,y,t.size*0.2,t.size)

ctx.beginPath()
ctx.fillStyle="#2e7d32"
ctx.arc(x+t.size*0.1,y,t.size*0.6,0,Math.PI*2)
ctx.fill()

})

}



/* ROCAS */

function drawRocks(){

rocks.forEach(r=>{

let x=r.x-cameraX

ctx.fillStyle="#555"

ctx.beginPath()
ctx.arc(x,canvas.height-140,r.size,0,Math.PI*2)
ctx.fill()

})

}



/* PARTICULAS */

function drawParticles(){

ctx.fillStyle="rgba(255,255,255,0.4)"

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



/* ANIMACION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

cameraX+=1

drawSky()
drawMountains()
drawClouds()
drawGround()
drawTrees()
drawRocks()
drawParticles()

requestAnimationFrame(animate)

}

animate()
