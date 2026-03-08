const canvas=document.getElementById("metaverse")

const ctx=canvas.getContext("2d")

function resize(){

canvas.width=window.innerWidth

canvas.height=window.innerHeight

}

resize()

let stars=[]

for(let i=0;i<200;i++){

stars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*2,

speed:Math.random()*0.5

})

}

function animar(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="white"

stars.forEach(s=>{

s.y+=s.speed

if(s.y>canvas.height)s.y=0

ctx.beginPath()

ctx.arc(s.x,s.y,s.size,0,Math.PI*2)

ctx.fill()

})

requestAnimationFrame(animar)

}

animar()

window.addEventListener("resize",resize)
