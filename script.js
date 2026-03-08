// CONEXION SUPABASE
const supabaseUrl = https://rnkuxwsuztewgbdmjyxt.supabase.co
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)


// CARGAR DATOS AL ABRIR PAGINA
async function cargarStats(){

let { data } = await supabase
.from("nfts")
.select("*")

data.forEach(nft => {

let card = document.querySelector(`.nft[data-id='${nft.id}']`)

if(card){

card.querySelector(".likes").innerText = "❤️ " + nft.likes
card.querySelector(".views").innerText = "👁 " + nft.views
card.querySelector(".downloads").innerText = "⬇ " + nft.downloads
card.querySelector(".shares").innerText = "🔗 " + nft.shares
card.querySelector(".logroNum").innerText = nft.logros

}

})

}

cargarStats()



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

let { data } = await supabase
.from("nfts")
.select("views,logros")
.eq("id",id)
.single()

let views = data.views + 1

await supabase
.from("nfts")
.update({ views: views })
.eq("id",id)

nft.querySelector(".views").innerText = "👁 " + views

checkViewsLogro(nft,views,id)

}



// LIKE
async function like(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let { data } = await supabase
.from("nfts")
.select("likes,logros")
.eq("id",id)
.single()

let likes = data.likes + 1

await supabase
.from("nfts")
.update({ likes: likes })
.eq("id",id)

nft.querySelector(".likes").innerText = "❤️ " + likes

checkLikeLogro(nft,likes,id)

}



// DOWNLOAD
async function descargar(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let img = nft.querySelector("img").src

let a = document.createElement("a")
a.href = img
a.download = "nft.png"
a.click()

let { data } = await supabase
.from("nfts")
.select("downloads,logros")
.eq("id",id)
.single()

let downloads = data.downloads + 1

await supabase
.from("nfts")
.update({ downloads: downloads })
.eq("id",id)

nft.querySelector(".downloads").innerText = "⬇ " + downloads

checkDownloadLogro(nft,downloads,id)

}



// SHARE
async function share(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let link = window.location.origin + window.location.pathname + "?nft=" + id

navigator.clipboard.writeText(link)

alert("Link copiado")

let { data } = await supabase
.from("nfts")
.select("shares,logros")
.eq("id",id)
.single()

let shares = data.shares + 1

await supabase
.from("nfts")
.update({ shares: shares })
.eq("id",id)

nft.querySelector(".shares").innerText = "🔗 " + shares

checkShareLogro(nft,shares,id)

}



// LOGROS
async function subirLogro(id,nft){

let logro = nft.querySelector(".logroNum")

let num = parseInt(logro.innerText) + 1

logro.innerText = num

await supabase
.from("nfts")
.update({ logros: num })
.eq("id",id)

}



// CHECK LOGROS
function checkLikeLogro(nft,num,id){

if(num % 100 === 0){

subirLogro(id,nft)
animacionLike(nft)

}

}

function checkViewsLogro(nft,num,id){

if(num % 100 === 0){

subirLogro(id,nft)
animacionViews(nft)

}

}

function checkDownloadLogro(nft,num,id){

if(num % 100 === 0){

subirLogro(id,nft)
animacionDownload(nft)

}

}

function checkShareLogro(nft,num,id){

if(num % 100 === 0){

subirLogro(id,nft)
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
