// CONFIGURACION SUPABASE
const supabaseUrl = https://rnkuxwsuztewgbdmjyxt.supabase.co
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)



// CARGAR DATOS
async function cargarStats(){

let { data, error } = await supabaseClient
.from("nfts")
.select("*")

if(error){
console.log(error)
return
}

data.forEach(nft=>{

let card = document.querySelector(`.nft[data-id='${nft.id}']`)

if(!card) return

card.querySelector(".likes").innerText = "❤️ " + nft.likes
card.querySelector(".views").innerText = "👁 " + nft.views
card.querySelector(".downloads").innerText = "⬇ " + nft.downloads
card.querySelector(".shares").innerText = "🔗 " + nft.shares
card.querySelector(".logroNum").innerText = nft.logros

})

}

window.addEventListener("load",cargarStats)



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
document.getElementById("nftModal").style.display="none"
}



// VIEWS
async function sumarView(id,nft){

let span = nft.querySelector(".views")

let num = parseInt(span.innerText.replace("👁","")) + 1

span.innerText = "👁 " + num

await supabaseClient
.from("nfts")
.update({views:num})
.eq("id",id)

}



// LIKE
async function like(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let span = nft.querySelector(".likes")

let num = parseInt(span.innerText.replace("❤️","")) + 1

span.innerText = "❤️ " + num

await supabaseClient
.from("nfts")
.update({likes:num})
.eq("id",id)

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

let span = nft.querySelector(".downloads")

let num = parseInt(span.innerText.replace("⬇","")) + 1

span.innerText = "⬇ " + num

await supabaseClient
.from("nfts")
.update({downloads:num})
.eq("id",id)

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

let num = parseInt(span.innerText.replace("🔗","")) + 1

span.innerText = "🔗 " + num

await supabaseClient
.from("nfts")
.update({shares:num})
.eq("id",id)

}
