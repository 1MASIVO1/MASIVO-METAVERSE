const canvas = document.getElementById("engineBackground")
const ctx = canvas.getContext("2d")

function resizeCanvas(){

canvas.width = window.innerWidth
canvas.height = window.innerHeight

}

resizeCanvas()

window.addEventListener("resize", resizeCanvas)



let particles = []

const PARTICLE_COUNT = 120



for(let i=0;i<PARTICLE_COUNT;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

size:Math.random()*2+1,

speedX:(Math.random()-0.5)*0.6,
speedY:(Math.random()-0.5)*0.6

})

}



function drawConnections(){

for(let a=0;a<particles.length;a++){

for(let b=a+1;b<particles.length;b++){

let dx = particles[a].x - particles[b].x
let dy = particles[a].y - particles[b].y

let distance = Math.sqrt(dx*dx + dy*dy)

if(distance < 120){

ctx.strokeStyle = "rgba(255,255,255,0.08)"
ctx.lineWidth = 1

ctx.beginPath()

ctx.moveTo(particles[a].x,particles[a].y)
ctx.lineTo(particles[b].x,particles[b].y)

ctx.stroke()

}

}

}

}



function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)



particles.forEach(p=>{

p.x += p.speedX
p.y += p.speedY



if(p.x<0||p.x>canvas.width) p.speedX *= -1
if(p.y<0||p.y>canvas.height) p.speedY *= -1



ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)

ctx.fillStyle = "white"
ctx.fill()

})



drawConnections()



requestAnimationFrame(animate)

}



animate()
