// TODO TU CODIGO ORIGINAL (igual)

function abrirNFT(img){
document.getElementById("modal").style.display="flex"
document.getElementById("nftGrande").src=img.src
}

function cerrarNFT(){
document.getElementById("modal").style.display="none"
}

function like(btn){
let count=localStorage.getItem("likes") || 0
count++
localStorage.setItem("likes",count)
guardarDato("like")
actualizarUI()
}

function vista(){
let count=localStorage.getItem("vistas") || 0
count++
localStorage.setItem("vistas",count)
guardarDato("vista")
actualizarUI()
}

function descargar(){
let count=localStorage.getItem("descargas") || 0
count++
localStorage.setItem("descargas",count)
guardarDato("descarga")
actualizarUI()
}

function share(){
let count=localStorage.getItem("shares") || 0
count++
localStorage.setItem("shares",count)
guardarDato("share")
actualizarUI()
}

function ranking(){
let grid=document.querySelector(".grid")
let items=[...document.querySelectorAll(".nft")]
items.sort(()=>Math.random()-0.5)
items.forEach(el=>grid.appendChild(el))
}

setInterval(ranking,5000)

/* SUPABASE */

const supabaseUrl="https://rnkuxwsuztewgbdmjyxt.supabase.co"
const supabaseKey="TU_ANON_KEY"
const supabase=window.supabase.createClient(supabaseUrl,supabaseKey)

async function guardarDato(tipo){
await supabase.from("stats").insert({
tipo:tipo,
fecha:new Date()
})
}

/* ACTUALIZAR CONTADORES */

function actualizarUI(){

document.querySelectorAll(".likes").forEach(el=>{
el.innerText="❤️ "+(localStorage.getItem("likes")||0)
})

document.querySelectorAll(".views").forEach(el=>{
el.innerText="👁 "+(localStorage.getItem("vistas")||0)
})

document.querySelectorAll(".downloads").forEach(el=>{
el.innerText="⬇ "+(localStorage.getItem("descargas")||0)
})

document.querySelectorAll(".shares").forEach(el=>{
el.innerText="🔗 "+(localStorage.getItem("shares")||0)
})

}

actualizarUI()
