const SUPABASE_URL="https://rnkuxwsuztewgbdmjyxt.supabase.co"
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

let nftActual=null

function obtenerID(img){

let nombre=img.src.split("/").pop()
let numero=nombre.replace("nft","").replace(".png","")

return parseInt(numero)

}

function abrirNFT(img){

document.getElementById("modal").style.display="flex"
document.getElementById("nftGrande").src=img.src

let id=obtenerID(img)
nftActual=id

sumarVista(id)

}

function cerrarNFT(){

document.getElementById("modal").style.display="none"

}

async function sumarVista(id){

const{data}=await supabase
.from("nfts")
.select("vistas")
.eq("id",id)
.single()

if(!data)return

await supabase
.from("nfts")
.update({vistas:data.vistas+1})
.eq("id",id)

}

async function like(btn){

let img=btn.parentElement.querySelector("img")

let id=obtenerID(img)

const{data}=await supabase
.from("nfts")
.select("likes")
.eq("id",id)
.single()

if(!data)return

await supabase
.from("nfts")
.update({likes:data.likes+1})
.eq("id",id)

}

async function descargar(){

if(!nftActual)return

const{data}=await supabase
.from("nfts")
.select("descargas")
.eq("id",nftActual)
.single()

if(!data)return

await supabase
.from("nfts")
.update({descargas:data.descargas+1})
.eq("id",nftActual)

}

async function rankingNFTs(){

const{data}=await supabase
.from("nfts")
.select("*")
.order("likes",{ascending:false})
.limit(5)

if(!data)return

let ranking=document.getElementById("ranking")

ranking.innerHTML=""

data.forEach(nft=>{

let div=document.createElement("div")

div.innerHTML="🏆 NFT "+nft.id+" | ❤️ "+nft.likes+" | 👁 "+nft.vistas

ranking.appendChild(div)

})

}

async function enviarMensaje(){

let input=document.getElementById("mensajeInput")

let texto=input.value.trim()

if(texto==="")return

await supabase
.from("chat")
.insert([{mensaje:texto}])

input.value=""

cargarMensajes()

}

async function cargarMensajes(){

const{data}=await supabase
.from("chat")
.select("*")
.order("id",{ascending:true})
.limit(50)

let cont=document.getElementById("mensajes")

cont.innerHTML=""

if(!data)return

data.forEach(m=>{

let div=document.createElement("div")

div.innerHTML=m.mensaje

cont.appendChild(div)

})

}

setInterval(cargarMensajes,2000)

setInterval(rankingNFTs,4000)

cargarMensajes()

rankingNFTs()
