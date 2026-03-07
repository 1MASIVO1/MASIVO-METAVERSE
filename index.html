const SUPABASE_URL="https://rnkuxwsuztewgbdmjyxt.supabase.co"
const SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabase = window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

function obtenerID(img){

let nombre=img.src.split("/").pop()
let numero=nombre.replace("nft","").replace(".png","")

return parseInt(numero)

}

async function like(btn){

let nft=btn.closest(".nft")
let img=nft.querySelector("img")

let id=obtenerID(img)

const {data}=await supabase
.from("nfts")
.select("likes")
.eq("id",id)
.single()

if(!data)return

let nuevo=data.likes+1

await supabase
.from("nfts")
.update({likes:nuevo})
.eq("id",id)

btn.innerText="❤️ "+nuevo

}

async function vista(img){

let id=obtenerID(img)

const {data}=await supabase
.from("nfts")
.select("vistas")
.eq("id",id)
.single()

if(!data)return

let nuevo=data.vistas+1

await supabase
.from("nfts")
.update({vistas:nuevo})
.eq("id",id)

}

async function descargar(btn){

let nft=btn.closest(".nft")
let img=nft.querySelector("img")

let id=obtenerID(img)

const {data}=await supabase
.from("nfts")
.select("descargas")
.eq("id",id)
.single()

if(!data)return

let nuevo=data.descargas+1

await supabase
.from("nfts")
.update({descargas:nuevo})
.eq("id",id)

btn.innerText="⬇ "+nuevo

}

async function compartir(btn){

let nft=btn.closest(".nft")
let img=nft.querySelector("img")

let id=obtenerID(img)

const {data}=await supabase
.from("nfts")
.select("shares")
.eq("id",id)
.single()

if(!data)return

let nuevo=data.shares+1

await supabase
.from("nfts")
.update({shares:nuevo})
.eq("id",id)

btn.innerText="🔗 "+nuevo

}
