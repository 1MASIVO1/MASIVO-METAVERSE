const canvas = document.getElementById("engineBackground")
const ctx = canvas.getContext("2d")

function resize(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

resize()
window.addEventListener("resize", resize)



const PARTICLES = 160
const MAX_DIST = 130

let nodes = []
let symbols = ["₿","Ξ","◎","◈","⬡"]



for(let i=0;i<PARTICLES;i++){

nodes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

vx:(Math.random()-0.5)*0.6,
vy:(Math.random()-0.5)*0.6,

size:Math.random()*2+1,

symbol:symbols[Math.floor(Math.random()*symbols.length)],

})

}



function drawNodes(){

nodes.forEach(n=>{

n.x += n.vx
n.y += n.vy

if(n.x<0||n.x>canvas.width) n.vx*=-1
if(n.y<0||n.y>canvas.height) n.vy*=-1


ctx.beginPath()
ctx.arc(n.x,n.y,n.size,0,Math.PI*2)
ctx.fillStyle="rgba(0,255,255,0.9)"
ctx.fill()

})

}



function drawConnections(){

for(let a=0;a<nodes.length;a++){

for(let b=a+1;b<nodes.length;b++){

let dx = nodes[a].x - nodes[b].x
let dy = nodes[a].y - nodes[b].y
let dist = Math.sqrt(dx*dx + dy*dy)

if(dist < MAX_DIST){

ctx.strokeStyle = "rgba(0,255,255,0.08)"
ctx.lineWidth = 1

ctx.beginPath()
ctx.moveTo(nodes[a].x,nodes[a].y)
ctx.lineTo(nodes[b].x,nodes[b].y)
ctx.stroke()

}

}

}

}



function drawSymbols(){

ctx.font="14px monospace"

nodes.forEach(n=>{

if(Math.random()<0.003){

ctx.fillStyle="rgba(255,215,0,0.8)"

ctx.fillText(n.symbol,n.x+6,n.y+6)

}

})

}



function glowPulse(){

let gradient = ctx.createRadialGradient(
canvas.width/2,
canvas.height/2,
0,
canvas.width/2,
canvas.height/2,
canvas.width
)

gradient.addColorStop(0,"rgba(0,255,255,0.05)")
gradient.addColorStop(1,"rgba(0,0,0,0.6)")

ctx.fillStyle=gradient
ctx.fillRect(0,0,canvas.width,canvas.height)

}



function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

glowPulse()

drawConnections()

drawNodes()

drawSymbols()

requestAnimationFrame(animate)

}



animate()
