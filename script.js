const supabaseUrl = "https://rnkuxwsuztewgbdmjyxt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)



async function cargarStats(){

const { data } = await supabaseClient
.from("nfts")
.select("*")

data.forEach(nft => {

let card = document.querySelector(`.nft[data-id='${nft.id}']`)

if(!card) return

card.querySelector(".likes").innerText = "❤️ " + nft.likes
card.querySelector(".views").innerText = "👁 " + nft.views
card.querySelector(".downloads").innerText = "⬇ " + nft.downloads
card.querySelector(".shares").innerText = "🔗 " + nft.shares
card.querySelector(".logroNum").innerText = nft.logros

aplicarEvolucion(card,nft.likes)

})

generarRanking(data)

}

window.addEventListener("load", cargarStats)



function aplicarEvolucion(nft,likes){

if(likes>=1000000) nft.classList.add("evolucion4")
else if(likes>=100000) nft.classList.add("evolucion3")
else if(likes>=10000) nft.classList.add("evolucion2")
else if(likes>=1000) nft.classList.add("evolucion1")

}



function generarRanking(data){

let orden = [...data].sort((a,b)=>b.likes-a.likes)

let board = document.getElementById("rankingBoard")

board.innerHTML = "🏆 TOP NFTs: "

orden.slice(0,3).forEach((n,i)=>{

board.innerHTML += `#${i+1} NFT ${n.id} (${n.likes} likes) `

})

}



function abrirNFT(img){

let modal = document.getElementById("nftModal")
let modalImg = document.getElementById("modalImg")

modal.style.display = "flex"
modalImg.src = img.src

}



function cerrarNFT(){
document.getElementById("nftModal").style.display = "none"
}



async function like(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

if(localStorage.getItem("like_"+id)) return

localStorage.setItem("like_"+id,true)

const { data } = await supabaseClient
.from("nfts")
.select("likes")
.eq("id", id)
.single()

let likes = (data.likes || 0) + 1

await supabaseClient
.from("nfts")
.update({ likes: likes })
.eq("id", id)

nft.querySelector(".likes").innerText = "❤️ " + likes

aplicarEvolucion(nft,likes)

}



function descargar(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")

let img = nft.querySelector("img").src

let a = document.createElement("a")
a.href = img
a.download = "nft.png"
a.click()

}



function share(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

navigator.clipboard.writeText(window.location.href + "?nft="+id)

alert("Link copiado")

}



function openAchievements(event,btn){

event.stopPropagation()

let modal = document.getElementById("achModal")

modal.style.display="flex"

}



function closeAchievements(){

document.getElementById("achModal").style.display="none"

}



/* BACKGROUND ENGINE */

const canvas = document.getElementById("bgCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

for(let i=0;i<200;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.3
})

}

function animateBG(){

ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="cyan"

particles.forEach(p=>{

p.y += p.speed

if(p.y > canvas.height) p.y=0

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

})

requestAnimationFrame(animateBG)

}

animateBG()
