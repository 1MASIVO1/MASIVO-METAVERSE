function getData(tipo,id){

return parseInt(localStorage.getItem(tipo+"_"+id)) || 0

}

function setData(tipo,id,valor){

localStorage.setItem(tipo+"_"+id,valor)

document.getElementById(tipo+"-"+id).innerText=valor

verificarLogros(id)

}



function likeNFT(e,id){

e.stopPropagation()

let v=getData("likes",id)+1

setData("likes",id,v)

}



function descargarNFT(e,id,img){

e.stopPropagation()

let v=getData("descargas",id)+1

setData("descargas",id,v)

let a=document.createElement("a")

a.href=img

a.download="nft.png"

a.click()

}



function compartirNFT(e,id){

e.stopPropagation()

let link=window.location.origin+
window.location.pathname+
"?nft="+id

navigator.clipboard.writeText(link)

alert("Link copiado")

let v=getData("compartir",id)+1

setData("compartir",id,v)

}



function abrirNFT(e,id,img){

if(e)e.stopPropagation()

document.getElementById("modalNFTimg").src=img

document.getElementById("nftModal").style.display="flex"

let v=getData("vistas",id)+1

setData("vistas",id,v)

}



function cerrarNFT(){

document.getElementById("nftModal").style.display="none"

}



function verificarLogros(id){

let likes=getData("likes",id)

let vistas=getData("vistas",id)

let descargas=getData("descargas",id)

let compartir=getData("compartir",id)

let total=likes+vistas+descargas+compartir

let estrellas=Math.floor(total/100)

localStorage.setItem("estrellas_"+id,estrellas)

document.getElementById("stars-"+id).innerText=estrellas

if(total%100==0){

animacionLogro()

}

}



function animacionLogro(){

let div=document.createElement("div")

div.className="logroAnim"

div.innerText="🏆 LOGRO DESBLOQUEADO"

document.body.appendChild(div)

setTimeout(()=>{

div.remove()

},2000)

}



function abrirLogros(e,id){

if(e)e.stopPropagation()

let cont=document.getElementById("listaLogros")

cont.innerHTML=""

let estrellas=parseInt(localStorage.getItem("estrellas_"+id)) || 0

for(let i=1;i<=estrellas;i++){

let box=document.createElement("div")

box.className="logroBox"

box.innerText="Logro "+i+" desbloqueado"

cont.appendChild(box)

}

document.getElementById("logrosModal").style.display="flex"

}



function cerrarLogros(){

document.getElementById("logrosModal").style.display="none"

}



window.onload=function(){

let params=new URLSearchParams(window.location.search)

let nft=params.get("nft")

if(nft){

abrirNFT(null,nft,"images/1.png")

}

}
