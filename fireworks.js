const canvas = document.createElement("canvas")
document.body.appendChild(canvas)

canvas.style.position="fixed"
canvas.style.top="0"
canvas.style.left="0"
canvas.style.width="100%"
canvas.style.height="100%"
canvas.style.pointerEvents="none"
canvas.style.zIndex="0"

const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let fireworks=[]

function crearFuego(){

let x=Math.random()*canvas.width
let y=Math.random()*canvas.height/2

for(let i=0;i<40;i++){

fireworks.push({

x:x,
y:y,
dx:(Math.random()-0.5)*6,
dy:(Math.random()-0.5)*6,
life:100

})

}

}

function animar(){

ctx.clearRect(0,0,canvas.width,canvas.height)

fireworks.forEach((p,i)=>{

p.x+=p.dx
p.y+=p.dy
p.life--

ctx.beginPath()
ctx.arc(p.x,p.y,2,0,Math.PI*2)
ctx.fillStyle="cyan"
ctx.fill()

if(p.life<=0)fireworks.splice(i,1)

})

requestAnimationFrame(animar)

}

setInterval(crearFuego,1200)

animar()
