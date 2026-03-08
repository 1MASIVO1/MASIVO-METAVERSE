const SUPABASE_URL = https://rnkuxwsuztewgbdmjyxt.supabase.co
const SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)



// CARGAR DATOS AL ABRIR PAGINA
async function cargarStats(){

let { data } = await db.from("nft_stats").select("*")

data.forEach(nft=>{

let card = document.querySelector(`.nft[data-id="${nft.id}"]`)

card.querySelector(".likes").innerText = "❤️ " + nft.likes
card.querySelector(".views").innerText = "👁 " + nft.views
card.querySelector(".downloads").innerText = "⬇ " + nft.downloads
card.querySelector(".shares").innerText = "🔗 " + nft.shares
card.querySelector(".logroNum").innerText = nft.logros

})

}



window.onload = cargarStats



// ABRIR NFT
async function abrirNFT(img){

let modal = document.getElementById("nftModal")
let modalImg = document.getElementById("modalImg")

modal.style.display = "flex"
modalImg.src = img.src

let nft = img.closest(".nft")
let id = nft.dataset.id

let views = parseInt(nft.querySelector(".views").innerText.replace("👁","")) + 1

nft.querySelector(".views").innerText = "👁 " + views

await db.from("nft_stats")
.update({views:views})
.eq("id",id)

checkLogro(nft)

}



function cerrarNFT(){

document.getElementById("nftModal").style.display = "none"

}



// LIKE
async function like(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let likes = parseInt(nft.querySelector(".likes").innerText.replace("❤️","")) + 1

nft.querySelector(".likes").innerText = "❤️ " + likes

await db.from("nft_stats")
.update({likes:likes})
.eq("id",id)

checkLogro(nft)

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

let downloads = parseInt(nft.querySelector(".downloads").innerText.replace("⬇","")) + 1

nft.querySelector(".downloads").innerText = "⬇ " + downloads

await db.from("nft_stats")
.update({downloads:downloads})
.eq("id",id)

checkLogro(nft)

}



// SHARE
async function share(btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let link = window.location.origin + window.location.pathname + "?nft=" + id

navigator.clipboard.writeText(link)

alert("Link copiado")

let shares = parseInt(nft.querySelector(".shares").innerText.replace("🔗","")) + 1

nft.querySelector(".shares").innerText = "🔗 " + shares

await db.from("nft_stats")
.update({shares:shares})
.eq("id",id)

checkLogro(nft)

}



// LOGROS CADA 100
async function checkLogro(nft){

let id = nft.dataset.id

let likes = parseInt(nft.querySelector(".likes").innerText.replace("❤️",""))
let views = parseInt(nft.querySelector(".views").innerText.replace("👁",""))
let downloads = parseInt(nft.querySelector(".downloads").innerText.replace("⬇",""))
let shares = parseInt(nft.querySelector(".shares").innerText.replace("🔗",""))

let total = likes + views + downloads + shares

let logros = Math.floor(total/100)

nft.querySelector(".logroNum").innerText = logros

await db.from("nft_stats")
.update({logros:logros})
.eq("id",id)

}
