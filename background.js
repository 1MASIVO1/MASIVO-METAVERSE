const canvas = document.getElementById("engineBackground")
const ctx = canvas.getContext("2d")

function resize(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

resize()
window.addEventListener("resize", resize)



/* PARTICULAS */

let particles=[]
const TOTAL=200

for(let i=0;i<TOTAL;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

vx:(Math.random()-0.5)*0.8,
vy:(Math.random()-0.5)*0.8,

size:Math.random()*2+1

})

}



/* COMETAS */

let comets=[]

function spawnComet(){

comets.push({

x:Math.random()*canvas.width,
y:-20,

vx:(Math.random()-0.5)*2,
vy:Math.random()*3+2,

life:200

})

}

setInterval(spawnComet,2500)



/* SIMBOLOS CRYPTO */

const symbols=["₿","Ξ","◎","⬡","◈","₮","Ł"]

let floating=[]

for(let i=0;i<30;i++){

floating.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

vy:Math.random()*0.4+0.2,

symbol:symbols[Math.floor(Math.random()*symbols.length)]

})

}



/* ONDAS */

let waves=[]

function spawnWave(){

waves.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

radius:10,
life:100

})

}

setInterval(spawnWave,3000)



/* CONEXIONES */

function drawConnections(){

for(let a=0;a<particles.length;a++){

for(let b=a+1;b<particles.length;b++){

let dx=particles[a].x-particles[b].x
let dy=particles[a].y-particles[b].y

let dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.strokeStyle="rgba(0,200,200,0.15)"

ctx.beginPath()

ctx.moveTo(particles[a].x,particles[a].y)
ctx.lineTo(particles[b].x,particles[b].y)

ctx.stroke()

}

}

}

}



/* ANIMACION */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)



/* PARTICLES */

particles.forEach(p=>{

p.x+=p.vx
p.y+=p.vy

if(p.x<0||p.x>canvas.width) p.vx*=-1
if(p.y<0||p.y>canvas.height) p.vy*=-1

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fillStyle="cyan"
ctx.fill()

})



drawConnections()



/* COMETS */

comets.forEach(c=>{

c.x+=c.vx
c.y+=c.vy
c.life--

ctx.beginPath()
ctx.arc(c.x,c.y,3,0,Math.PI*2)
ctx.fillStyle="white"
ctx.fill()

})

comets=comets.filter(c=>c.life>0)



/* SYMBOLS */

ctx.font="14px monospace"

floating.forEach(s=>{

s.y-=s.vy

if(s.y<-20) s.y=canvas.height+20

ctx.fillStyle="gold"

ctx.fillText(s.symbol,s.x,s.y)

})



/* WAVES */

waves.forEach(w=>{

w.radius+=2
w.life--

ctx.beginPath()

ctx.arc(w.x,w.y,w.radius,0,Math.PI*2)

ctx.strokeStyle="rgba(0,200,200,0.15)"

ctx.stroke()

})

waves=waves.filter(w=>w.life>0)



requestAnimationFrame(animate)

}

animate()
