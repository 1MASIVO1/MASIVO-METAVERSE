const supabaseUrl = "https://rnkuxwsuztewgbdmjyxt.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)



// CARGAR STATS AL ABRIR
async function cargarStats(){

const { data, error } = await supabaseClient
.from("nfts")
.select("*")

if(error){
console.log(error)
return
}

data.forEach(nft => {

let card = document.querySelector(`.nft[data-id='${nft.id}']`)

if(!card) return

card.querySelector(".likes").innerText = "❤️ " + nft.likes
card.querySelector(".views").innerText = "👁 " + nft.views
card.querySelector(".downloads").innerText = "⬇ " + nft.downloads
card.querySelector(".shares").innerText = "🔗 " + nft.shares
card.querySelector(".logroNum").innerText = nft.logros

})

}

window.addEventListener("load", cargarStats)



// ABRIR NFT
function abrirNFT(img){

let modal = document.getElementById("nftModal")
let modalImg = document.getElementById("modalImg")

modal.style.display = "flex"
modalImg.src = img.src

let nft = img.closest(".nft")
let id = nft.dataset.id

sumarView(id,nft)

}



// CERRAR NFT
function cerrarNFT(){
document.getElementById("nftModal").style.display = "none"
}



// SUMAR VIEW (ANTI SPAM)
async function sumarView(id,nft){

if(localStorage.getItem("view_"+id)) return

localStorage.setItem("view_"+id,true)

const { data, error } = await supabaseClient
.from("nfts")
.select("views")
.eq("id", id)
.single()

if(error){
console.log(error)
return
}

let views = (data.views || 0) + 1

await supabaseClient
.from("nfts")
.update({ views: views })
.eq("id", id)

let span = nft.querySelector(".views")
span.innerText = "👁 " + views

checkLogro(id,nft,views)

}



// LIKE (ANTI SPAM)
async function like(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

if(localStorage.getItem("like_"+id)){
alert("Ya diste like a este NFT")
return
}

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

let span = nft.querySelector(".likes")
span.innerText = "❤️ " + likes

checkLogro(id,nft,likes)

}



// DESCARGAR
async function descargar(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

if(localStorage.getItem("download_"+id)){
alert("Ya descargaste este NFT")
return
}

localStorage.setItem("download_"+id,true)

let img = nft.querySelector("img").src

let a = document.createElement("a")
a.href = img
a.download = "nft.png"
a.click()

const { data } = await supabaseClient
.from("nfts")
.select("downloads")
.eq("id", id)
.single()

let downloads = (data.downloads || 0) + 1

await supabaseClient
.from("nfts")
.update({ downloads: downloads })
.eq("id", id)

let span = nft.querySelector(".downloads")
span.innerText = "⬇ " + downloads

checkLogro(id,nft,downloads)

}



// SHARE
async function share(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let link = window.location.origin + window.location.pathname + "?nft=" + id

navigator.clipboard.writeText(link)

alert("Link copiado")

if(localStorage.getItem("share_"+id)) return

localStorage.setItem("share_"+id,true)

const { data } = await supabaseClient
.from("nfts")
.select("shares")
.eq("id", id)
.single()

let shares = (data.shares || 0) + 1

await supabaseClient
.from("nfts")
.update({ shares: shares })
.eq("id", id)

let span = nft.querySelector(".shares")
span.innerText = "🔗 " + shares

checkLogro(id,nft,shares)

}



// SISTEMA DE LOGROS (GLOBAL)
async function checkLogro(id,nft,total){

if(total % 100 === 0){

let logroSpan = nft.querySelector(".logroNum")

let logros = parseInt(logroSpan.innerText) + 1

logroSpan.innerText = logros

await supabaseClient
.from("nfts")
.update({ logros: logros })
.eq("id", id)

activarLogroVisual(nft)

}

}



// ABRIR NFT DESDE LINK
window.onload = function(){

cargarStats()

let params = new URLSearchParams(window.location.search)

let nftID = params.get("nft")

if(nftID){

let nft = document.querySelector(`.nft[data-id='${nftID}']`)

if(nft){

let img = nft.querySelector("img")

abrirNFT(img)

}

}

}



////////////////////////////////////////////////////////
/////////////  NUEVO SISTEMA DE LOGRO VISUAL  /////////
////////////////////////////////////////////////////////

function activarLogroVisual(nft){

let sound = document.getElementById("achievementSound")
if(sound){
sound.currentTime = 0
sound.play()
}

mostrarVideoSobreNFT(nft)

lanzarFireworks()

}



function mostrarVideoSobreNFT(nft){

let viejo = nft.querySelector(".achievementVideo")
if(viejo) viejo.remove()

let video = document.createElement("video")

video.src = "achievement.mp4"
video.className = "achievementVideo"

video.autoplay = true
video.muted = true
video.playsInline = true

nft.appendChild(video)

setTimeout(()=>{
video.remove()
},4000)

}



////////////////////////////////////////////////////////
///////////////   FIREWORKS SYSTEM   //////////////////
////////////////////////////////////////////////////////

const canvas = document.getElementById("fireworks")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

function lanzarFireworks(){

for(let i=0;i<40;i++){

particles.push({
x: Math.random()*canvas.width,
y: Math.random()*canvas.height,
vx:(Math.random()-0.5)*6,
vy:(Math.random()-0.5)*6,
life:100
})

}

}

function animarFireworks(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach((p,i)=>{

p.x+=p.vx
p.y+=p.vy
p.life--

ctx.fillStyle="white"
ctx.beginPath()
ctx.arc(p.x,p.y,2,0,Math.PI*2)
ctx.fill()

if(p.life<=0){
particles.splice(i,1)
}

})

requestAnimationFrame(animarFireworks)

}

animarFireworks()
