const supabaseUrl="https://rnkuxwsuztewgbdmjyxt.supabase.co"

const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

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

supabase.from("stats").insert({tipo:"like"})

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

supabase.from("stats").insert({tipo:"share"})

}
