// CONEXION SUPABASE
const SUPABASE_URL = https://rnkuxwsuztewgbdmjyxt.supabase.co
const SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)



// CARGAR DATOS GUARDADOS
async function cargarDatos(){

let { data } = await db.from("nft_stats").select("*")

data.forEach(nft => {

let card = document.querySelector(`.nft[data-id="${nft.id}"]`)

if(card){

card.querySelector(".likes").innerText = "❤️ " + nft.likes
card.querySelector(".views").innerText = "👁 " + nft.views
card.querySelector(".downloads").innerText = "⬇ " + nft.downloads
card.querySelector(".shares").innerText = "🔗 " + nft.shares
card.querySelector(".logroNum").innerText = nft.logros

}

})

}



// ABRIR NFT
async function abrirNFT(img){

let modal = document.getElementById("nftModal")
let modalImg = document.getElementById("modalImg")

modal.style.display = "flex"
modalImg.src = img.src

let nft = img.closest(".nft")
let id = nft.dataset.id

let views = nft.querySelector(".views")
let num = parseInt(views.innerText.replace("👁","")) + 1

views.innerText = "👁 " + num

await db.from("nft_stats")
.update({views:num})
.eq("id",id)

checkViewsLogro(nft,num)

}



// CERRAR NFT
function cerrarNFT(){

document.getElementById("nftModal").style.display = "none"

}



// LIKE
async function like(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let span = nft.querySelector(".likes")

let num = parseInt(span.innerText.replace("❤️","")) + 1

span.innerText = "❤️ " + num

await db.from("nft_stats")
.update({likes:num})
.eq("id",id)

checkLikeLogro(nft,num)

}



// DESCARGAR
async function descargar(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let img = nft.querySelector("img").src

let a = document.createElement("a")
a.href = img
a.download = "nft.png"
a.click()

let span = nft.querySelector(".downloads")

let num = parseInt(span.innerText.replace("⬇","")) + 1

span.innerText = "⬇ " + num

await db.from("nft_stats")
.update({downloads:num})
.eq("id",id)

checkDownloadLogro(nft,num)

}



// SHARE
async function share(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let link = window.location.origin + window.location.pathname + "?nft=" + id

navigator.clipboard.writeText(link)

alert("Link copiado")

let span = nft.querySelector(".shares")

let num = parseInt(span.innerText.replace("🔗","")) + 1

span.innerText = "🔗 " + num

await db.from("nft_stats")
.update({shares:num})
.eq("id",id)

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



// ABRIR NFT DESDE LINK + CARGAR DATOS
window.onload = async function(){

await cargarDatos()

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
