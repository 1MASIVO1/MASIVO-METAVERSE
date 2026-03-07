const SUPABASE_URL="https://rnkuxwsuztewgbdmjyxt.supabase.co"
const SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabaseClient=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)



function obtenerUsuario(){

let fp=
navigator.userAgent+
screen.width+
screen.height+
navigator.language

return btoa(fp)

}



/* LIKE */

async function like(btn){

let nft=btn.closest(".nft")
let id=nft.dataset.id
let usuario=obtenerUsuario()

let {data}=await supabaseClient
.from("likes")
.select("*")
.eq("nft",id)
.eq("usuario",usuario)

if(data.length>0){
alert("Ya diste like")
return
}

await supabaseClient
.from("likes")
.insert([{nft:id,usuario:usuario}])

cargarLikes()

}



/* VIEWS */

async function abrirNFT(img){

let nft=img.closest(".nft")
let id=nft.dataset.id

await supabaseClient
.from("nft_views")
.insert([{nft_id:id}])

cargarViews()

window.location.hash="nft"+id

window.open(img.src)

}



/* DESCARGAR */

async function descargar(){

let btn=event.target
let nft=btn.closest(".nft")
let id=nft.dataset.id

await supabaseClient
.from("nft_downloads")
.insert([{nft_id:id}])

cargarDownloads()

let img=nft.querySelector("img").src

let a=document.createElement("a")
a.href=img
a.download="masivo-nft.png"
a.click()

}



/* SHARE */

async function share(){

let btn=event.target
let nft=btn.closest(".nft")
let id=nft.dataset.id

await supabaseClient
.from("nft_shares")
.insert([{nft_id:id}])

cargarShares()

let link=
window.location.origin+
window.location.pathname+
"#nft"+id

navigator.clipboard.writeText(link)

alert("Link copiado")

}



/* CONTADORES */

async function cargarLikes(){

let {data}=await supabaseClient.from("likes").select("*")

let conteo={}

data.forEach(r=>{
if(!conteo[r.nft]) conteo[r.nft]=0
conteo[r.nft]++
})

document.querySelectorAll(".nft").forEach(n=>{
let id=n.dataset.id
n.querySelector(".likes").innerText="❤️ "+(conteo[id]||0)
})

}



async function cargarViews(){

let {data}=await supabaseClient.from("nft_views").select("*")

let conteo={}

data.forEach(r=>{
if(!conteo[r.nft_id]) conteo[r.nft_id]=0
conteo[r.nft_id]++
})

document.querySelectorAll(".nft").forEach(n=>{
let id=n.dataset.id
n.querySelector(".views").innerText="👁 "+(conteo[id]||0)
})

}



async function cargarDownloads(){

let {data}=await supabaseClient.from("nft_downloads").select("*")

let conteo={}

data.forEach(r=>{
if(!conteo[r.nft_id]) conteo[r.nft_id]=0
conteo[r.nft_id]++
})

document.querySelectorAll(".nft").forEach(n=>{
let id=n.dataset.id
n.querySelector(".downloads").innerText="⬇ "+(conteo[id]||0)
})

}



async function cargarShares(){

let {data}=await supabaseClient.from("nft_shares").select("*")

let conteo={}

data.forEach(r=>{
if(!conteo[r.nft_id]) conteo[r.nft_id]=0
conteo[r.nft_id]++
})

document.querySelectorAll(".nft").forEach(n=>{
let id=n.dataset.id
n.querySelector(".shares").innerText="🔗 "+(conteo[id]||0)
})

}



window.onload=function(){

cargarLikes()
cargarViews()
cargarDownloads()
cargarShares()

}
