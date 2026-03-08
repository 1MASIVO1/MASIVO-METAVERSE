/* ========================= */
/* RANKING AUTOMATICO NFT   */
/* ========================= */

function ordenarNFT(){

let grid=document.getElementById("gridNFT")

let items=[...document.querySelectorAll(".nft")]

items.sort((a,b)=>{

let likesA=parseInt(a.querySelector(".likes").innerText.replace(/\D/g,''))
let likesB=parseInt(b.querySelector(".likes").innerText.replace(/\D/g,''))

return likesB-likesA

})

items.forEach(el=>grid.appendChild(el))

}

setInterval(ordenarNFT,5000)



/* ========================= */
/* SISTEMA DE LOGROS        */
/* ========================= */

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



/* ================= */
/* FUNCIONES BOTONES */
/* ================= */

function like(btn){

let nft=btn.closest(".nft")

let el=nft.querySelector(".likes")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="❤️ "+num

}



/* ================= */

function vista(btn){

let nft=btn.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

}



/* ================= */

function descargar(btn){

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



/* ================= */

function share(btn){

let nft=btn.closest(".nft")

let el=nft.querySelector(".shares")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="🔗 "+num

}



/* ================= */

function abrirNFT(img){

let nft=img.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

window.open(img.src,"_blank")

}
