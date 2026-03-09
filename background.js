<canvas id="neonBg"></canvas>

<script>

const canvas = document.getElementById("neonBg")
const ctx = canvas.getContext("2d")

function resize(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

resize()
window.addEventListener("resize", resize)



let particles=[]

for(let i=0;i<200;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*1.5,
vy:(Math.random()-0.5)*1.5,
size:Math.random()*2+1

})

}



function drawConnections(){

for(let a=0;a<particles.length;a++){

for(let b=a+1;b<particles.length;b++){

let dx=particles[a].x-particles[b].x
let dy=particles[a].y-particles[b].y

let dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.strokeStyle="rgba(0,255,120,0.15)"

ctx.beginPath()
ctx.moveTo(particles[a].x,particles[a].y)
ctx.lineTo(particles[b].x,particles[b].y)
ctx.stroke()

}

}

}

}



function animate(){

ctx.fillStyle="rgba(0,0,0,0.25)"
ctx.fillRect(0,0,canvas.width,canvas.height)



particles.forEach(p=>{

p.x+=p.vx
p.y+=p.vy

if(p.x<0||p.x>canvas.width) p.vx*=-1
if(p.y<0||p.y>canvas.height) p.vy*=-1


ctx.shadowBlur=20
ctx.shadowColor="#00ff88"

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)

ctx.fillStyle="#00ff88"
ctx.fill()

})

drawConnections()

requestAnimationFrame(animate)

}

animate()

</script>
