const canvas = document.getElementById("fireworks")
const ctx = canvas.getContext("2d")

const titulo = document.getElementById("tituloLogo")

const rect = titulo.getBoundingClientRect()

canvas.width = rect.width
canvas.height = rect.height + 20

canvas.style.width = rect.width + "px"
canvas.style.height = rect.height + "px"

let particles=[]

function createFirework(){

let x=Math.random()*canvas.width
let y=Math.random()*canvas.height/2

let colors=["#00ffff","#ff00ff","#00ff88","#ffcc00","#ff3355"]

for(let i=0;i<25;i++){

particles.push({

x:x,
y:y,
dx:(Math.random()-0.5)*5,
dy:(Math.random()-0.5)*5,
life:80,
color:colors[Math.floor(Math.random()*colors.length)]

})

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach((p,i)=>{

p.x+=p.dx
p.y+=p.dy
p.life--

ctx.beginPath()
ctx.arc(p.x,p.y,2,0,Math.PI*2)
ctx.fillStyle=p.color
ctx.fill()

if(p.life<=0){

particles.splice(i,1)

}

})

requestAnimationFrame(animate)

}

setInterval(createFirework,1200)

animate()
