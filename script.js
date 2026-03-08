// ABRIR NFT GRANDE
function abrirNFT(img){

let modal = document.getElementById("nftModal")
let modalImg = document.getElementById("modalImg")

modal.style.display = "flex"
modalImg.src = img.src

let nft = img.closest(".nft")
let views = nft.querySelector(".views")

let num = parseInt(views.innerText.replace("👁","")) + 1
views.innerText = "👁 " + num

}


// CERRAR NFT
function cerrarNFT(){

document.getElementById("nftModal").style.display = "none"

}


// LIKE
function like(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let span = nft.querySelector(".likes")

let num = parseInt(span.innerText.replace("❤️","")) + 1

span.innerText = "❤️ " + num

checkLogro(nft)

}


// VISTA MANUAL
function vista(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let span = nft.querySelector(".views")

let num = parseInt(span.innerText.replace("👁","")) + 1

span.innerText = "👁 " + num

checkLogro(nft)

}


// DESCARGAR
function descargar(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let img = nft.querySelector("img").src

let a = document.createElement("a")
a.href = img
a.download = "nft.png"
a.click()

let span = nft.querySelector(".downloads")

let num = parseInt(span.innerText.replace("⬇","")) + 1
span.innerText = "⬇ " + num

checkLogro(nft)

}


// SHARE
function share(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let link = window.location.origin + window.location.pathname + "?nft=" + id

navigator.clipboard.writeText(link)

alert("Link copiado")

let span = nft.querySelector(".shares")

let num = parseInt(span.innerText.replace("🔗","")) + 1

span.innerText = "🔗 " + num

checkLogro(nft)

}


// SISTEMA DE LOGROS
function checkLogro(nft){

let likes = parseInt(nft.querySelector(".likes").innerText.replace("❤️",""))
let views = parseInt(nft.querySelector(".views").innerText.replace("👁",""))
let downloads = parseInt(nft.querySelector(".downloads").innerText.replace("⬇",""))
let shares = parseInt(nft.querySelector(".shares").innerText.replace("🔗",""))

let total = likes + views + downloads + shares

let logro = nft.querySelector(".logroNum")

logro.innerText = Math.floor(total / 100)

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
