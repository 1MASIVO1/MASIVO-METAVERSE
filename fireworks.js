const canvas = document.getElementById("fireworks")
const ctx = canvas.getContext("2d")

function resizeCanvas(){

canvas.width=window.innerWidth
canvas.height=220

}

resizeCanvas()

let particles=[]

function crearExplosion(x,y){

for(let i=0;i<70;i++){

particles.push({

x:x,
y:y,

vx:(Math.random()-0.5)*8,
vy:(Math.random()-0.5)*8,

life:100,

size:Math.random()*3+1,

color:`hsl(${Math.random()*360},100%,60%)`

})

}

}

function explosionLogo(){

const logo=document.getElementById("tituloLogo")

if(!logo) return

const rect=logo.getBoundingClientRect()

const canvasRect=canvas.getBoundingClientRect()

const x=rect.left+rect.width/2-canvasRect.left
const y=rect.top+rect.height/2-canvasRect.top

crearExplosion(x,y)

}

function animar(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.globalCompositeOperation="lighter"

particles.forEach(p=>{

p.x+=p.vx
p.y+=p.vy

p.life--

ctx.beginPath()

ctx.fillStyle=p.color
ctx.shadowColor=p.color
ctx.shadowBlur=15

ctx.arc(p.x,p.y,p.size,0,Math.PI*2)

ctx.fill()

})

particles=particles.filter(p=>p.life>0)

requestAnimationFrame(animar)

}

setInterval(explosionLogo,2500)

animar()

window.addEventListener("resize",resizeCanvas)
