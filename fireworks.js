const canvas = document.getElementById("fireworks")
const ctx = canvas.getContext("2d")

function resizeCanvas(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

resizeCanvas()
window.addEventListener("resize", resizeCanvas)



let particles = []



function crear(){

let x = Math.random() * canvas.width
let y = Math.random() * canvas.height * 0.5

let colores = ["cyan","magenta","yellow","lime","orange"]

for(let i=0;i<40;i++){

particles.push({

x:x,
y:y,

vx:(Math.random()-0.5)*6,
vy:(Math.random()-0.5)*6,

life:80,

color: colores[Math.floor(Math.random()*colores.length)]

})

}

}



function animar(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

p.x += p.vx
p.y += p.vy

p.vy += 0.03

p.life--

ctx.fillStyle = p.color

ctx.fillRect(p.x,p.y,3,3)

})

particles = particles.filter(p=>p.life>0)



requestAnimationFrame(animar)

}



setInterval(()=>{

if(particles.length < 500){

crear()

}

},2000)



animar()
