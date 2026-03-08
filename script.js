const supabaseUrl="https://rnkuxwsuztewgbdmjyxt.supabase.co"

const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabase=window.supabase.createClient(supabaseUrl,supabaseKey)



async function ordenarNFT(){

let {data}=await supabase.from("stats").select("*")

let likes=data.filter(x=>x.tipo==="like").length

let grid=document.querySelector(".grid")

let items=[...document.querySelectorAll(".nft")]

items.sort(()=>Math.random()-0.5+likes)

items.forEach(el=>grid.appendChild(el))

}

setInterval(ordenarNFT,5000)



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



function like(btn){

let nft=btn.closest(".nft")

let el=nft.querySelector(".likes")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="❤️ "+num

supabase.from("stats").insert({tipo:"like"})

}



function vista(btn){

let nft=btn.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

supabase.from("stats").insert({tipo:"view"})

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
a.download="masivo-"+Date.now()+".png"
a.click()

supabase.from("stats").insert({tipo:"download"})

}



function share(btn){

let nft=btn.closest(".nft")

let el=nft.querySelector(".shares")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="🔗 "+num

let img=nft.querySelector("img").src

navigator.clipboard.writeText(img)

alert("Link copiado 🚀")

supabase.from("stats").insert({tipo:"share"})

}



function abrirNFT(img){

let nft=img.closest(".nft")

let el=nft.querySelector(".views")

let num=parseInt(el.innerText.replace(/\D/g,''))

num++

el.innerText="👁 "+num

supabase.from("stats").insert({tipo:"view"})

window.open(img.src,"_blank")

}



/* TOP MASIVO */

function actualizarRanking(){

let nfts=[...document.querySelectorAll(".nft")]

let ranking=nfts.map(nft=>{

let likes=parseInt(
nft.querySelector(".likes").innerText.replace(/\D/g,'')
)

let img=nft.querySelector("img").src

return {likes,img}

})

ranking.sort((a,b)=>b.likes-a.likes)

let cont=document.getElementById("rankingLista")

cont.innerHTML=""

ranking.slice(0,3).forEach((r,i)=>{

let div=document.createElement("div")

div.innerHTML=
"#"+(i+1)+" ❤️"+r.likes+
"<br><img src='"+r.img+"' width='80'>"

cont.appendChild(div)

})

}

setInterval(actualizarRanking,3000)
