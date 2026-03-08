const canvas=document.getElementById("fireworks")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=200

let particles=[]

function crear(){

let x=Math.random()*canvas.width
let y=Math.random()*200

for(let i=0;i<25;i++){

particles.push({
x:x,
y:y,
vx:(Math.random()-0.5)*4,
vy:(Math.random()-0.5)*4,
life:60
})

}

}

function animar(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

p.x+=p.vx
p.y+=p.vy
p.life--

ctx.fillStyle="cyan"
ctx.fillRect(p.x,p.y,2,2)

})

particles=particles.filter(p=>p.life>0)

requestAnimationFrame(animar)

}

setInterval(crear,2000)

animar()

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth
canvas.height=200

})
