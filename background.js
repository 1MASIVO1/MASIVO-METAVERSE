const canvas = document.getElementById("engineBackground")
const ctx = canvas.getContext("2d")

function resize(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

resize()
window.addEventListener("resize", resize)



/* PARTICULAS BLOCKCHAIN */

const particles=[]
const PARTICLE_COUNT=180

for(let i=0;i<PARTICLE_COUNT;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.7,
vy:(Math.random()-0.5)*0.7,
size:Math.random()*2+1
})

}



/* COMETAS DE ENERGIA */

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

let symbols=["₿","Ξ","◎","⬡","◈","₮","Ł","Ƀ"]

let floatingSymbols=[]

for(let i=0;i<25;i++){

floatingSymbols.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vy:Math.random()*0.3+0.2,
symbol:symbols[Math.floor(Math.random()*symbols.length)],
size:Math.random()*14+10

})

}



/* RAYOS ENERGIA */

let lightning=[]

function spawnLightning(){

lightning.push({

x:Math.random()*canvas.width,
life:10

})

}

setInterval(spawnLightning,4000)



/* ONDA DIGITAL */

let waves=[]

function spawnWave(){

waves.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
radius:10,
life:120

})

}

setInterval(spawnWave,3500)



/* CONEXIONES BLOCKCHAIN */

function drawConnections(){

for(let a=0;a<particles.length;a++){

for(let b=a+1;b<particles.length;b++){

let dx=particles[a].x-particles[b].x
let dy=particles[a].y-particles[b].y

let dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.strokeStyle="rgba(0,255,255,0.08)"

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

ctx.font="bold 16px monospace"

floatingSymbols.forEach(s=>{

s.y-=s.vy

if(s.y<-20) s.y=canvas.height+20

ctx.fillStyle="gold"

ctx.fillText(s.symbol,s.x,s.y)

})



/* LIGHTNING */

lightning.forEach(l=>{

l.life--

ctx.strokeStyle="rgba(0,255,255,0.8)"
ctx.lineWidth=2

ctx.beginPath()

ctx.moveTo(l.x,0)
ctx.lineTo(l.x+Math.random()*30-15,canvas.height)

ctx.stroke()

})

lightning=lightning.filter(l=>l.life>0)



/* WAVES */

waves.forEach(w=>{

w.radius+=2
w.life--

ctx.beginPath()

ctx.arc(w.x,w.y,w.radius,0,Math.PI*2)

ctx.strokeStyle="rgba(0,255,255,0.15)"

ctx.stroke()

})

waves=waves.filter(w=>w.life>0)



requestAnimationFrame(animate)

}

animate()
