const canvas = document.getElementById("engineBackground")
const ctx = canvas.getContext("2d")

function resize(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

resize()
window.addEventListener("resize", resize)



/* OBJETOS GAMER */

let objects=[]

const types=["controller","coin","heart","star","sword","pixel"]

for(let i=0;i<80;i++){

objects.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
type:types[Math.floor(Math.random()*types.length)],
size:Math.random()*20+10,
speedY:Math.random()*0.5+0.2,
speedX:(Math.random()-0.5)*0.5,
angle:Math.random()*Math.PI

})

}



/* DIBUJAR OBJETOS */

function drawObject(o){

ctx.save()
ctx.translate(o.x,o.y)
ctx.rotate(o.angle)

switch(o.type){

case "coin":

ctx.fillStyle="gold"
ctx.beginPath()
ctx.arc(0,0,o.size,0,Math.PI*2)
ctx.fill()

break


case "heart":

ctx.fillStyle="red"

ctx.beginPath()
ctx.moveTo(0,o.size/2)
ctx.bezierCurveTo(o.size,o.size*-0.3,o.size*-0.5,o.size*-1.2,0,-o.size*0.4)
ctx.bezierCurveTo(o.size*0.5,o.size*-1.2,-o.size,o.size*-0.3,0,o.size/2)
ctx.fill()

break


case "star":

ctx.fillStyle="yellow"

for(let i=0;i<5;i++){

ctx.lineTo(
Math.cos((18+i*72)/180*Math.PI)*o.size,
-Math.sin((18+i*72)/180*Math.PI)*o.size
)

ctx.lineTo(
Math.cos((54+i*72)/180*Math.PI)*(o.size/2),
-Math.sin((54+i*72)/180*Math.PI)*(o.size/2)
)

}

ctx.closePath()
ctx.fill()

break


case "controller":

ctx.fillStyle="#444"
ctx.fillRect(-o.size,o.size*-0.4,o.size*2,o.size*0.8)

ctx.fillStyle="black"
ctx.beginPath()
ctx.arc(-o.size*0.5,0,o.size*0.2,0,Math.PI*2)
ctx.arc(o.size*0.5,0,o.size*0.2,0,Math.PI*2)
ctx.fill()

break


case "sword":

ctx.fillStyle="silver"
ctx.fillRect(-2,-o.size,o.size*0.1,o.size)

ctx.fillStyle="#222"
ctx.fillRect(-o.size*0.3,0,o.size*0.6,4)

break


case "pixel":

ctx.fillStyle="#00ffff"
ctx.fillRect(-o.size/2,-o.size/2,o.size,o.size)

break

}

ctx.restore()

}



/* ANIMACION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

objects.forEach(o=>{

o.y+=o.speedY
o.x+=o.speedX
o.angle+=0.01

if(o.y>canvas.height+50){
o.y=-50
o.x=Math.random()*canvas.width
}

drawObject(o)

})

requestAnimationFrame(animate)

}

animate()
