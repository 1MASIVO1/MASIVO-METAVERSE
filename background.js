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



/* TERRENO */

let ground=[]

for(let i=0;i<60;i++){

ground.push({
x:i*120,
height:Math.random()*80+80
})

}



/* PLATAFORMAS */

let platforms=[]

for(let i=0;i<20;i++){

platforms.push({

x:Math.random()*4000,
y:Math.random()*300+200,
width:80,
height:20

})

}



/* MONEDAS */

let coins=[]

for(let i=0;i<30;i++){

coins.push({

x:Math.random()*4000,
y:Math.random()*300+150,
size:10,
angle:Math.random()*Math.PI

})

}



/* NUBES */

let clouds=[]

for(let i=0;i<10;i++){

clouds.push({

x:Math.random()*canvas.width,
y:Math.random()*200,
size:Math.random()*80+60,
speed:Math.random()*0.2+0.05

})

}



/* DIBUJAR CIELO */

function drawSky(){

let gradient=ctx.createLinearGradient(0,0,0,canvas.height)

gradient.addColorStop(0,"#6ec6ff")
gradient.addColorStop(1,"#c9f0ff")

ctx.fillStyle=gradient
ctx.fillRect(0,0,canvas.width,canvas.height)

}



/* DIBUJAR NUBES */

function drawClouds(){

ctx.fillStyle="white"

clouds.forEach(c=>{

c.x-=c.speed

if(c.x<-c.size) c.x=canvas.width+c.size

ctx.beginPath()
ctx.arc(c.x,c.y,c.size*0.4,0,Math.PI*2)
ctx.arc(c.x+30,c.y+10,c.size*0.35,0,Math.PI*2)
ctx.arc(c.x-30,c.y+10,c.size*0.35,0,Math.PI*2)
ctx.fill()

})

}



/* DIBUJAR TERRENO */

function drawGround(){

ground.forEach(g=>{

let x=g.x-cameraX

ctx.fillStyle="#4caf50"

ctx.fillRect(
x,
canvas.height-g.height,
120,
g.height
)

ctx.fillStyle="#2e7d32"

ctx.fillRect(
x,
canvas.height-g.height,
120,
20
)

})

}



/* DIBUJAR PLATAFORMAS */

function drawPlatforms(){

ctx.fillStyle="#8d6e63"

platforms.forEach(p=>{

let x=p.x-cameraX

ctx.fillRect(
x,
canvas.height-p.y,
p.width,
p.height
)

})

}



/* DIBUJAR MONEDAS */

function drawCoins(){

coins.forEach(c=>{

c.angle+=0.1

let x=c.x-cameraX
let y=canvas.height-c.y

ctx.save()

ctx.translate(x,y)
ctx.rotate(c.angle)

ctx.fillStyle="gold"

ctx.beginPath()
ctx.arc(0,0,c.size,0,Math.PI*2)
ctx.fill()

ctx.restore()

})

}



/* ANIMACION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

cameraX+=1.2

drawSky()
drawClouds()
drawGround()
drawPlatforms()
drawCoins()

requestAnimationFrame(animate)

}

animate()
