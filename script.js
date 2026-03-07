/* ===================== */
/* CONEXION SUPABASE */
/* ===================== */

const SUPABASE_URL="https://rnkuxwsuztewgbdmjyxt.supabase.co"
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabaseClient=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)



/* ===================== */
/* FINGERPRINT USUARIO */
/* ===================== */

function obtenerUsuario(){

let fp=
navigator.userAgent+
screen.width+
screen.height+
navigator.language

return btoa(fp)

}



/* ===================== */
/* LIKE */
/* ===================== */

async function like(btn){

let nft=btn.closest(".nft")
let id=nft.getAttribute("data-id")

let usuario=obtenerUsuario()

let {data}=await supabaseClient
.from("likes")
.select("*")
.eq("nft",id)
.eq("usuario",usuario)

if(data.length>0){

alert("Ya diste like a este NFT")
return

}

await supabaseClient
.from("likes")
.insert([{nft:id,usuario:usuario}])

cargarLikes()

}



/* ===================== */
/* CARGAR LIKES */
/* ===================== */

async function cargarLikes(){

let {data}=await supabaseClient
.from("likes")
.select("*")

let conteo={}

data.forEach(row=>{

if(!conteo[row.nft]) conteo[row.nft]=0
conteo[row.nft]++

})

document.querySelectorAll(".nft").forEach(nft=>{

let id=nft.getAttribute("data-id")

let likes=conteo[id] || 0

nft.querySelector(".likes").innerText="❤️ "+likes

})

ranking()

}



/* ===================== */
/* CARGAR VIEWS */
/* ===================== */

async function cargarViews(){

let {data}=await supabaseClient
.from("nft_views")
.select("*")

let conteo={}

data.forEach(row=>{

if(!conteo[row.nft_id]) conteo[row.nft_id]=0
conteo[row.nft_id]++

})

document.querySelectorAll(".nft").forEach(nft=>{

let id=nft.getAttribute("data-id")

let num=conteo[id] || 0

nft.querySelector(".views").innerText="👁 "+num

})

}



/* ===================== */
/* CARGAR DOWNLOADS */
/* ===================== */

async function cargarDownloads(){

let {data}=await supabaseClient
.from("nft_downloads")
.select("*")

let conteo={}

data.forEach(row=>{

if(!conteo[row.nft_id]) conteo[row.nft_id]=0
conteo[row.nft_id]++

})

document.querySelectorAll(".nft").forEach(nft=>{

let id=nft.getAttribute("data-id")

let num=conteo[id] || 0

nft.querySelector(".downloads").innerText="⬇ "+num

})

}



/* ===================== */
/* CARGAR SHARES */
/* ===================== */

async function cargarShares(){

let {data}=await supabaseClient
.from("nft_shares")
.select("*")

let conteo={}

data.forEach(row=>{

if(!conteo[row.nft_id]) conteo[row.nft_id]=0
conteo[row.nft_id]++

})

document.querySelectorAll(".nft").forEach(nft=>{

let id=nft.getAttribute("data-id")

let num=conteo[id] || 0

nft.querySelector(".shares").innerText="🔗 "+num

})

}



/* ===================== */
/* RANKING */
/* ===================== */

function ranking(){

let grid=document.querySelector(".grid")

let items=[...document.querySelectorAll(".nft")]

items.sort((a,b)=>{

let likeA=parseInt(a.querySelector(".likes").innerText.replace(/\D/g,''))
let likeB=parseInt(b.querySelector(".likes").innerText.replace(/\D/g,''))

return likeB-likeA

})

items.forEach(el=>grid.appendChild(el))

}



/* ===================== */
/* DESCARGAR */
/* ===================== */

async function descargar(){

let btn=event.target
let nft=btn.closest(".nft")

let id=nft.getAttribute("data-id")

let usuario=obtenerUsuario()

let {data}=await supabaseClient
.from("nft_downloads")
.select("*")
.eq("nft_id",id)
.eq("visitor",usuario)

if(data.length===0){

await supabaseClient
.from("nft_downloads")
.insert([{nft_id:id,visitor:usuario}])

}

cargarDownloads()

let img=nft.querySelector("img").src

let a=document.createElement("a")

a.href=img
a.download="masivo-nft.png"
a.click()

}



/* ===================== */
/* SHARE */
/* ===================== */

async function share(){

let btn=event.target
let nft=btn.closest(".nft")

let id=nft.getAttribute("data-id")

let usuario=obtenerUsuario()

let {data}=await supabaseClient
.from("nft_shares")
.select("*")
.eq("nft_id",id)
.eq("visitor",usuario)

if(data.length===0){

await supabaseClient
.from("nft_shares")
.insert([{nft_id:id,visitor:usuario}])

}

cargarShares()

let link=
window.location.origin+
window.location.pathname+
"#nft"+id

navigator.clipboard.writeText(link)

alert("Link del NFT copiado")

}



/* ===================== */
/* ABRIR NFT */
/* ===================== */

async function abrirNFT(img){

let nft=img.closest(".nft")

let id=nft.getAttribute("data-id")

let usuario=obtenerUsuario()

let {data}=await supabaseClient
.from("nft_views")
.select("*")
.eq("nft_id",id)
.eq("visitor",usuario)

if(data.length===0){

await supabaseClient
.from("nft_views")
.insert([{nft_id:id,visitor:usuario}])

}

cargarViews()

window.location.hash="nft"+id

window.open(img.src)

}



/* ===================== */
/* ABRIR NFT DESDE LINK */
/* ===================== */

function abrirDesdeHash(){

if(window.location.hash){

let id=window.location.hash.replace("#nft","")

let nft=document.querySelector('.nft[data-id="'+id+'"]')

if(nft){

let img=nft.querySelector("img")

img.scrollIntoView()

}

}

}



/* ===================== */
/* INICIAR */
/* ===================== */

window.onload=function(){

cargarLikes()
cargarViews()
cargarDownloads()
cargarShares()

abrirDesdeHash()

}
