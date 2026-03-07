function abrirNFT(img){

document.getElementById("modal").style.display="flex"
document.getElementById("nftGrande").src=img.src

}

function cerrarNFT(){

document.getElementById("modal").style.display="none"

}

function like(btn){

let count=localStorage.getItem("likes") || 0
count++
localStorage.setItem("likes",count)

guardarDato("like")

}

function vista(){

let count=localStorage.getItem("vistas") || 0
count++
localStorage.setItem("vistas",count)

guardarDato("vista")

}

function descargar(){

let count=localStorage.getItem("descargas") || 0
count++
localStorage.setItem("descargas",count)

guardarDato("descarga")

}

function share(){

let count=localStorage.getItem("shares") || 0
count++
localStorage.setItem("shares",count)

guardarDato("share")

}

function ranking(){

let grid=document.querySelector(".grid")

let items=[...document.querySelectorAll(".nft")]

items.sort(()=>Math.random()-0.5)

items.forEach(el=>grid.appendChild(el))

}

setInterval(ranking,5000)

/* SUPABASE */

const supabaseUrl="https://rnkuxwsuztewgbdmjyxt.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
const supabase=window.supabase.createClient(supabaseUrl,supabaseKey)

async function guardarDato(tipo){

await supabase.from("stats").insert({

tipo:tipo,
fecha:new Date()

})

}

/* FIREWORKS */

const canvas=document.getElementById("fireworks")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=200

let particles=[]

function firework(){

let x=Math.random()*canvas.width
let y=150

for(let i=0;i<30;i++){

particles.push({

x:x,
y:y,
vx:(Math.random()-0.5)*6,
vy:(Math.random()-0.5)*6,
life:60

})

}

}

setInterval(firework,1200)

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach((p,i)=>{

p.x+=p.vx
p.y+=p.vy
p.life--

ctx.fillStyle="cyan"
ctx.fillRect(p.x,p.y,3,3)

if(p.life<=0) particles.splice(i,1)

})

requestAnimationFrame(animate)

}

animate()

/* MOVIMIENTO NFT */

function moverNFT(){

document.querySelectorAll(".nft").forEach(nft=>{

let x=(Math.random()*20)-10
let y=(Math.random()*20)-10

nft.style.transform=`translate(${x}px,${y}px)`

})

}

setInterval(moverNFT,4000)
