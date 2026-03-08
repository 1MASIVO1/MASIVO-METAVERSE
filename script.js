const supabaseUrl="https://rnkuxwsuztewgbdmjyxt.supabase.co"

const supabaseKey="TU_SUPABASE_KEY"

const supabase=window.supabase.createClient(supabaseUrl,supabaseKey)



function moverNFTs(){

document.querySelectorAll(".nft").forEach(nft=>{

let x=(Math.random()*20)-10
let y=(Math.random()*20)-10
let r=(Math.random()*6)-3

nft.style.transform="translate("+x+"px,"+y+"px) rotate("+r+"deg)"

})

}

setInterval(moverNFTs,4000)



function like(btn){

let nft=btn.closest(".nft")

nft.classList.add("likeGlow")

setTimeout(()=>{
nft.classList.remove("likeGlow")
},800)

let el=nft.querySelector(".likes")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="❤️ "+num

supabase.from("stats").insert({
tipo:"like",
nft_id:nft.dataset.id
})

}



function vista(btn){

let nft=btn.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

supabase.from("stats").insert({
tipo:"view",
nft_id:nft.dataset.id
})

}



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

supabase.from("stats").insert({
tipo:"download",
nft_id:nft.dataset.id
})

}



function share(btn){

let nft=btn.closest(".nft")

let el=nft.querySelector(".shares")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="🔗 "+num

let img=nft.querySelector("img").src

if(navigator.share){

navigator.share({
title:"MASIVO NFT",
text:"Mira este NFT del metaverso MASIVO",
url:img
})

}else{

navigator.clipboard.writeText(img)

alert("Link copiado 🚀")

}

supabase.from("stats").insert({
tipo:"share",
nft_id:nft.dataset.id
})

}



function abrirNFT(img){

let nft=img.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

window.open(img.src,"_blank")

supabase.from("stats").insert({
tipo:"view",
nft_id:nft.dataset.id
})

}
