const canvas=document.getElementById("fireworks")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=200

let particles=[]

function crear(x,y){

for(let i=0;i<40;i++){

particles.push({
x:x,
y:y,
vx:(Math.random()-0.5)*6,
vy:(Math.random()-0.5)*6,
life:80,
color:"hsl("+Math.random()*360+",100%,60%)"
})

}

}

function explosionLogo(){

let logo=document.getElementById("tituloLogo")
let rect=logo.getBoundingClientRect()

let x=rect.left+rect.width/2
let y=rect.top+rect.height/2

crear(x,y)

}

function animar(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

p.x+=p.vx
p.y+=p.vy
p.life--

ctx.fillStyle=p.color
ctx.fillRect(p.x,p.y,3,3)

})

particles=particles.filter(p=>p.life>0)

requestAnimationFrame(animar)

}

setInterval(explosionLogo,3000)

animar()

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth
canvas.height=200

})
