/* ============================ */
/* CONFIG SUPABASE (si usas DB) */
/* ============================ */

const SUPABASE_URL=https://rnkuxwsuztewgbdmjyxt.supabase.co
const SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabase=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

/* ============================ */
/* CREAR NFT GRID AUTOMATICO */
/* ============================ */

const grid=document.getElementById("gridNFT")

for(let i=1;i<=9;i++){

let nft=document.createElement("div")
nft.className="nft"
nft.dataset.id=i

nft.innerHTML=`

<img src="images/nft${i}.png">

<div class="logros">⭐ <span class="logroNum">0</span></div>

<div class="stats">
<span class="likes">❤️ 0</span>
<span class="views">👁 0</span>
<span class="downloads">⬇ 0</span>
<span class="shares">🔗 0</span>
</div>

<div class="botones">

<button class="btnLike">❤️</button>
<button class="btnView">👁</button>
<button class="btnDownload">⬇</button>
<button class="btnShare">🔗</button>

</div>
`

grid.appendChild(nft)

}

/* ============================ */
/* EVENTOS */
/* ============================ */

document.addEventListener("click",(e)=>{

let nft=e.target.closest(".nft")
if(!nft) return

if(e.target.classList.contains("btnLike")) like(nft)
if(e.target.classList.contains("btnView")) vista(nft)
if(e.target.classList.contains("btnDownload")) descargar(nft)
if(e.target.classList.contains("btnShare")) share(nft)

if(e.target.tagName==="IMG") abrirNFT(e.target)

})

/* ============================ */
/* FUNCIONES CONTADORES */
/* ============================ */

function actualizarContador(el){

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

return num

}

/* ============================ */

function like(nft){

let el=nft.querySelector(".likes")

let num=actualizarContador(el)

el.innerText="❤️ "+num

}

/* ============================ */

function vista(nft){

let el=nft.querySelector(".views")

let num=actualizarContador(el)

el.innerText="👁 "+num

}

/* ============================ */

function descargar(nft){

let el=nft.querySelector(".downloads")

let num=actualizarContador(el)

el.innerText="⬇ "+num

let img=nft.querySelector("img").src

let a=document.createElement("a")

a.href=img
a.download="masivo-nft.png"

a.click()

}

/* ============================ */

function share(nft){

let el=nft.querySelector(".shares")

let num=actualizarContador(el)

el.innerText="🔗 "+num

if(navigator.share){

navigator.share({
title:"MASIVO NFT",
url:window.location.href
})

}

}

/* ============================ */

function abrirNFT(img){

let nft=img.closest(".nft")

vista(nft)

window.open(img.src,"_blank")

}

/* ============================ */
/* SISTEMA LOGROS */
/* ============================ */

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

/* ============================ */
/* RANKING DINAMICO */
/* ============================ */

function ordenarNFT(){

let items=[...document.querySelectorAll(".nft")]

items.sort((a,b)=>{

let likesA=parseInt(a.querySelector(".likes").innerText.replace(/\D/g,''))

let likesB=parseInt(b.querySelector(".likes").innerText.replace(/\D/g,''))

return likesB-likesA

})

items.forEach(el=>grid.appendChild(el))

}

setInterval(ordenarNFT,5000)
