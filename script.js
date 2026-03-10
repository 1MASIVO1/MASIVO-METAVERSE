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

card.querySelector(".likes").innerText = "❤️ " + (nft.likes || 0)
card.querySelector(".views").innerText = "👁 " + (nft.views || 0)
card.querySelector(".downloads").innerText = "⬇ " + (nft.downloads || 0)
card.querySelector(".shares").innerText = "🔗 " + (nft.shares || 0)
card.querySelector(".logroNum").innerText = nft.logros || 0

})

}



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



// SUMAR VIEW
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

checkLogro(id,nft)

}



// LIKE
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

checkLogro(id,nft)

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

checkLogro(id,nft)

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

checkLogro(id,nft)

}



// SISTEMA DE LOGROS
async function checkLogro(id,nft){

const { data, error } = await supabaseClient
.from("nfts")
.select("likes,views,downloads,shares,logros")
.eq("id", id)
.single()

if(error){
console.log(error)
return
}

let likes = data.likes || 0
let views = data.views || 0
let downloads = data.downloads || 0
let shares = data.shares || 0

let nuevosLogros =
Math.floor(likes/100) +
Math.floor(views/100) +
Math.floor(downloads/100) +
Math.floor(shares/100)

let logrosActuales = data.logros || 0

if(nuevosLogros <= logrosActuales) return

await supabaseClient
.from("nfts")
.update({ logros: nuevosLogros })
.eq("id", id)

nft.querySelector(".logroNum").innerText = nuevosLogros

mostrarLogro(nft)

}



// MOSTRAR VIDEO DE LOGRO
function mostrarLogro(nft){

let cont = nft.querySelector(".videoLogro")

cont.innerHTML = `
<video autoplay muted playsinline>
<source src="achievement.mp4" type="video/mp4">
</video>
`

setTimeout(()=>{
cont.innerHTML = ""
},4000)



// OVERLAY GLOBAL
let overlay = document.getElementById("achievementOverlay")

overlay.innerHTML = `
<video autoplay muted playsinline>
<source src="achievement.mp4" type="video/mp4">
</video>
`

overlay.style.display = "flex"

setTimeout(()=>{
overlay.style.display = "none"
overlay.innerHTML = ""
},4000)



// SONIDO
let sonido = document.getElementById("achievementSound")

if(sonido){
sonido.currentTime = 0
sonido.play().catch(()=>{})
}

}



// ABRIR NFT DESDE LINK
function abrirDesdeLink(){

let params = new URLSearchParams(window.location.search)

let nftID = params.get("nft")

if(!nftID) return

let nft = document.querySelector(`.nft[data-id='${nftID}']`)

if(!nft) return

let img = nft.querySelector("img")

abrirNFT(img)

}



// INICIO
window.addEventListener("load", () => {

cargarStats()

abrirDesdeLink()

})
