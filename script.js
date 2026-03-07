/* ===================== */
/* CONEXION SUPABASE */
/* ===================== */

const SUPABASE_URL= https://rnkuxwsuztewgbdmjyxt.supabase.co
const SUPABASE_KEY= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabaseClient=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)



/* ===================== */
/* CREAR FINGERPRINT */
/* ===================== */

function obtenerUsuario(){

let fp=navigator.userAgent+
screen.width+
screen.height+
navigator.language

return btoa(fp)

}



/* ===================== */
/* LIKE GLOBAL + ANTISPAM */
/* ===================== */

async function like(btn){

let nft=btn.closest(".nft")
let id=nft.getAttribute("data-id")

let usuario=obtenerUsuario()

/* VERIFICAR EN INTERNET */

let {data}=await supabaseClient
.from("likes")
.select("*")
.eq("nft",id)
.eq("usuario",usuario)

if(data.length>0){

alert("Ya diste like a este NFT")
return

}

/* GUARDAR LIKE */

await supabaseClient
.from("likes")
.insert([{nft:id,usuario:usuario}])

cargarLikes()

}



/* ===================== */
/* CARGAR LIKES GLOBALES */
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
/* RANKING MUNDIAL */
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
/* CARGAR VIEWS GLOBALES */
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

let views=conteo[id] || 0

nft.querySelector(".views").innerText="👁 "+views

})

}



/* ===================== */
/* VISTAS */
/* ===================== */

function vista(){

let btn=event.target
let nft=btn.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

}



/* ===================== */
/* DESCARGAS */
/* ===================== */

function descargar(){

let btn=event.target
let nft=btn.closest(".nft")

let el=nft.querySelector(".downloads")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="⬇ "+num

let img=nft.querySelector("img").src

let a=document.createElement("a")

a.href=img
a.download="masivo-nft.png"
a.click()

}



/* ===================== */
/* SHARE */
/* ===================== */

function share(){

let btn=event.target
let nft=btn.closest(".nft")

let el=nft.querySelector(".shares")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="🔗 "+num

let link=window.location.href+"#nft"+nft.getAttribute("data-id")

navigator.clipboard.writeText(link)

alert("Link copiado")

}



/* ===================== */
/* ABRIR NFT */
/* ===================== */

async function abrirNFT(img){

let nft=img.closest(".nft")
let id=nft.getAttribute("data-id")

let usuario=obtenerUsuario()

/* VERIFICAR SI YA VIO ESTE NFT */

let {data}=await supabaseClient
.from("nft_views")
.select("*")
.eq("nft_id",id)
.eq("visitor",usuario)

/* SI NO EXISTE VIEW */

if(data.length===0){

await supabaseClient
.from("nft_views")
.insert([{nft_id:id,visitor:usuario}])

}

/* RECARGAR VIEWS GLOBALES */

cargarViews()

window.open(img.src,"_blank")

}



/* ===================== */
/* CARGAR AL INICIAR */
/* ===================== */

window.onload=function(){

cargarLikes()
cargarViews()

}
