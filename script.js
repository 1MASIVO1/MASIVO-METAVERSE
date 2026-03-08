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



// SUMAR VIEW
async function sumarView(id,nft){

let span = nft.querySelector(".views")

let views = parseInt(span.innerText.replace("👁","")) + 1

span.innerText = "👁 " + views

await supabaseClient
.from("nfts")
.update({ views: views })
.eq("id", id)

checkLogro(id,nft,views)

}



// LIKE
async function like(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")

let id = nft.dataset.id

let span = nft.querySelector(".likes")

let likes = parseInt(span.innerText.replace("❤️","")) + 1

span.innerText = "❤️ " + likes

await supabaseClient
.from("nfts")
.update({ likes: likes })
.eq("id", id)

checkLogro(id,nft,likes)

}



// DESCARGAR
async function descargar(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")

let id = nft.dataset.id

let img = nft.querySelector("img").src

let a = document.createElement("a")

a.href = img

a.download = "nft.png"

a.click()

let span = nft.querySelector(".downloads")

let downloads = parseInt(span.innerText.replace("⬇","")) + 1

span.innerText = "⬇ " + downloads

await supabaseClient
.from("nfts")
.update({ downloads: downloads })
.eq("id", id)

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

let span = nft.querySelector(".shares")

let shares = parseInt(span.innerText.replace("🔗","")) + 1

span.innerText = "🔗 " + shares

await supabaseClient
.from("nfts")
.update({ shares: shares })
.eq("id", id)

checkLogro(id,nft,shares)

}



// SISTEMA DE LOGROS
async function checkLogro(id,nft,total){

if(total % 100 === 0){

let logroSpan = nft.querySelector(".logroNum")

let logros = parseInt(logroSpan.innerText) + 1

logroSpan.innerText = logros

await supabaseClient
.from("nfts")
.update({ logros: logros })
.eq("id", id)

}

}



// ABRIR NFT DESDE LINK
window.onload = function(){

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
