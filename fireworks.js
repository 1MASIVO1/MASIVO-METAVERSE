const canvas = document.getElementById("fireworks")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

class Particle{

constructor(x,y){

this.x = x
this.y = y

this.speedX = (Math.random()-0.5)*6
this.speedY = (Math.random()-0.5)*6

this.life = 100

}

update(){

this.x += this.speedX
this.y += this.speedY
this.life--

}

draw(){

ctx.fillStyle="white"

ctx.beginPath()

ctx.arc(this.x,this.y,2,0,Math.PI*2)

ctx.fill()

}

}

function explode(x,y){

for(let i=0;i<40;i++){

particles.push(new Particle(x,y))

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach((p,i)=>{

p.update()
p.draw()

if(p.life<=0){

particles.splice(i,1)

}

})

requestAnimationFrame(animate)

}

setInterval(()=>{

explode(Math.random()*canvas.width,Math.random()*canvas.height)

},800)

animate()
