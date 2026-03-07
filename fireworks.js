const canvas = document.getElementById("logoFireworks")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = 150

let particles=[]

function firework(){

let x=Math.random()*canvas.width
let y=Math.random()*120

let colors=["#ff0040","#00ffff","#ffcc00","#00ff6a","#ff00ff"]

for(let i=0;i<30;i++){

particles.push({

x:x,
y:y,
dx:(Math.random()-0.5)*6,
dy:(Math.random()-0.5)*6,
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

setInterval(firework,1500)

animate()
