const SUPABASE_URL = "https://rnkuxwsuztewgbdmjyxt.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

let nftActual = null

function obtenerID(img){
let nombre = img.src.split("/").pop()
let numero = nombre.replace("nft","").replace(".png","")
return parseInt(numero)
}

async function abrirNFT(img){

document.getElementById("modal").style.display="flex"
document.getElementById("nftGrande").src = img.src

let id = obtenerID(img)
nftActual = id

const { data } = await supabase
.from("nfts")
.select("vistas")
.eq("id",id)
.single()

await supabase
.from("nfts")
.update({vistas:data.vistas+1})
.eq("id",id)

}

function cerrarNFT(){
document.getElementById("modal").style.display="none"
}

async function like(btn){

let img = btn.closest(".nft").querySelector("img")
let id = obtenerID(img)

const { data } = await supabase
.from("nfts")
.select("likes")
.eq("id",id)
.single()

await supabase
.from("nfts")
.update({likes:data.likes+1})
.eq("id",id)

}

async function descargar(){

if(!nftActual) return

const { data } = await supabase
.from("nfts")
.select("descargas")
.eq("id",nftActual)
.single()

await supabase
.from("nfts")
.update({descargas:data.descargas+1})
.eq("id",nftActual)

}

async function share(){

if(!nftActual) return

const { data } = await supabase
.from("nfts")
.select("shares")
.eq("id",nftActual)
.single()

await supabase
.from("nfts")
.update({shares:data.shares+1})
.eq("id",nftActual)

}

function abrirShare(){
document.getElementById("shareMenu").style.display="block"
}

function compartir(red){

share()

let url = window.location.href

if(red==="facebook")
window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)

if(red==="twitter")
window.open(`https://twitter.com/intent/tweet?url=${url}`)

if(red==="reddit")
window.open(`https://reddit.com/submit?url=${url}`)

if(red==="telegram")
window.open(`https://t.me/share/url?url=${url}`)

if(red==="whatsapp")
window.open(`https://wa.me/?text=${url}`)

}

async function enviarMensaje(){

let input = document.getElementById("mensajeInput")
let texto = input.value

if(texto==="") return

await supabase
.from("chat")
.insert([{mensaje:texto}])

input.value=""

cargarMensajes()

}

async function cargarMensajes(){

const { data } = await supabase
.from("chat")
.select("*")
.order("id",{ascending:true})
.limit(50)

let contenedor = document.getElementById("mensajes")

contenedor.innerHTML=""

data.forEach(m =>{

let div=document.createElement("div")
div.textContent=m.mensaje
contenedor.appendChild(div)

})

}

setInterval(cargarMensajes,2000)

cargarMensajes()
