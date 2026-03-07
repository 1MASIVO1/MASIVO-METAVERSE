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

}

function vista(){

let count=localStorage.getItem("vistas") || 0
count++
localStorage.setItem("vistas",count)

}

function descargar(){

let count=localStorage.getItem("descargas") || 0
count++
localStorage.setItem("descargas",count)

}

function share(){

let count=localStorage.getItem("shares") || 0
count++
localStorage.setItem("shares",count)

}

function ranking(){

let grid=document.querySelector(".grid")

let items=[...document.querySelectorAll(".nft")]

items.sort(()=>Math.random()-0.5)

items.forEach(el=>grid.appendChild(el))

}

setInterval(ranking,5000)
