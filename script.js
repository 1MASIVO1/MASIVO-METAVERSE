/* ===================== */
/* CONEXION SUPABASE */
/* ===================== */

const SUPABASE_URL=https://rnkuxwsuztewgbdmjyxt.supabase.co
const SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabaseClient=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)



/* ===================== */
/* LIKE GLOBAL INTERNET */
/* ===================== */

async function like(btn){

let nft=btn.closest(".nft")
let id=nft.getAttribute("data-id")

let el=nft.querySelector(".likes")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="❤️ "+num

await supabaseClient
.from("likes")
.insert([{nft:id}])

}



/* ===================== */
/* RANKING MUNDIAL */
/* ===================== */

async function rankingGlobal(){

let {data}=await supabaseClient
.from("likes")
.select("*")

let conteo={}

data.forEach(row=>{

if(!conteo[row.nft]) conteo[row.nft]=0

conteo[row.nft]++

})

let grid=document.querySelector(".grid")

let items=[...document.querySelectorAll(".nft")]

items.sort((a,b)=>{

let idA=a.getAttribute("data-id")
let idB=b.getAttribute("data-id")

return (conteo[idB]||0)-(conteo[idA]||0)

})

items.forEach(el=>grid.appendChild(el))

}

setInterval(rankingGlobal,4000)



/* ===================== */
/* SISTEMA LOGROS */
/* ===================== */

function actualizarLogros(){

document.querySelectorAll(".nft").forEach(nft=>{

let likes=parseInt(nft.querySelector(".likes").innerText.replace(/\D/g,''))

let views=parseInt(nft.querySelector(".views").innerText.replace(/\D/g,''))

let downloads=parseInt(nft.querySelector(".downloads").innerText.replace(/\D/g,''))

let shares=parseInt(nft.querySelector(".shares").innerText.replace(/\D/g,''))

let logros=
Math.floor(likes/100)+
Math.floor(views/100)+
Math.floor(downloads/100)+
Math.floor(shares/100)

nft.querySelector(".logroNum").innerText=logros

if(logros>0){

nft.classList.add("aura")

}

})

}

setInterval(actualizarLogros,2000)



/* ===================== */
/* BOTONES NORMALES */
/* ===================== */

function vista(){

let btn=event.target
let nft=btn.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

}



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



function share(){

let btn=event.target
let nft=btn.closest(".nft")

let el=nft.querySelector(".shares")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="🔗 "+num

}



function abrirNFT(img){

let nft=img.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

window.open(img.src,"_blank")

}
