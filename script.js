const SUPABASE_URL = https://rnkuxwsuztewgbdmjyxt.supabase.co
const SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

function obtenerID(img){

let nombre = img.src.split("/").pop()
let numero = nombre.replace("nft","").replace(".png","")
return parseInt(numero)

}

async function abrirNFT(img){

document.getElementById("modal").style.display="flex"
document.getElementById("nftGrande").src=img.src

let id = obtenerID(img)

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

async function vista(){

let img = document.getElementById("nftGrande")
let id = obtenerID(img)

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

async function descargar(){

let img = document.getElementById("nftGrande")
let id = obtenerID(img)

const { data } = await supabase
.from("nfts")
.select("descargas")
.eq("id",id)
.single()

await supabase
.from("nfts")
.update({descargas:data.descargas+1})
.eq("id",id)

}

async function share(){

let img = document.getElementById("nftGrande")
let id = obtenerID(img)

const { data } = await supabase
.from("nfts")
.select("shares")
.eq("id",id)
.single()

await supabase
.from("nfts")
.update({shares:data.shares+1})
.eq("id",id)

}

function ranking(){

let grid=document.querySelector(".grid")
let items=[...document.querySelectorAll(".nft")]

items.sort(()=>Math.random()-0.5)

items.forEach(el=>grid.appendChild(el))

}

setInterval(ranking,5000)
