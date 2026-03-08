// ABRIR NFT
function abrirNFT(img){

let modal = document.getElementById("nftModal")
let modalImg = document.getElementById("modalImg")

modal.style.display = "flex"
modalImg.src = img.src

let nft = img.closest(".nft")

let views = nft.querySelector(".views")
let num = parseInt(views.innerText.replace("👁","")) + 1

views.innerText = "👁 " + num

checkViewsLogro(nft,num)

}


// CERRAR NFT
function cerrarNFT(){
document.getElementById("nftModal").style.display = "none"
}


// LIKE
function like(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")

let span = nft.querySelector(".likes")

let num = parseInt(span.innerText.replace("❤️","")) + 1

span.innerText = "❤️ " + num

checkLikeLogro(nft,num)

}


// DESCARGAR
function descargar(event,btn){

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

checkDownloadLogro(nft,num)

}


// SHARE
function share(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let link = window.location.origin + window.location.pathname + "?nft=" + id

navigator.clipboard.writeText(link)

alert("Link copiado")

let span = nft.querySelector(".shares")

let num = parseInt(span.innerText.replace("🔗","")) + 1

span.innerText = "🔗 " + num

checkShareLogro(nft,num)

}



// LOGRO LIKE
function checkLikeLogro(nft,num){

if(num % 100 === 0){

let logro = nft.querySelector(".logroNum")

logro.innerText = parseInt(logro.innerText) + 1

animacionLike(nft)

}

}


// LOGRO VIEWS
function checkViewsLogro(nft,num){

if(num % 100 === 0){

let logro = nft.querySelector(".logroNum")

logro.innerText = parseInt(logro.innerText) + 1

animacionViews(nft)

}

}


// LOGRO DOWNLOAD
function checkDownloadLogro(nft,num){

if(num % 100 === 0){

let logro = nft.querySelector(".logroNum")

logro.innerText = parseInt(logro.innerText) + 1

animacionDownload(nft)

}

}


// LOGRO SHARE
function checkShareLogro(nft,num){

if(num % 100 === 0){

let logro = nft.querySelector(".logroNum")

logro.innerText = parseInt(logro.innerText) + 1

animacionShare(nft)

}

}



// ANIMACIONES
function animacionLike(nft){

nft.classList.add("likeAnim")

setTimeout(()=>{
nft.classList.remove("likeAnim")
},1000)

}

function animacionViews(nft){

nft.classList.add("viewAnim")

setTimeout(()=>{
nft.classList.remove("viewAnim")
},1000)

}

function animacionDownload(nft){

nft.classList.add("downloadAnim")

setTimeout(()=>{
nft.classList.remove("downloadAnim")
},1000)

}

function animacionShare(nft){

nft.classList.add("shareAnim")

setTimeout(()=>{
nft.classList.remove("shareAnim")
},1000)

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
