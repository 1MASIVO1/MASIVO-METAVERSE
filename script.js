
const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"
)

const gallery=document.getElementById("gallery")

const viewer=document.getElementById("viewer")

const viewerImg=document.getElementById("viewer-img")

const likeBtn=document.getElementById("likeBtn")

const downloadBtn=document.getElementById("downloadBtn")

const shareBtn=document.getElementById("shareBtn")

const shareMenu=document.getElementById("shareMenu")

let currentNFT=0

const TOTAL=9

for(let i=1;i<=TOTAL;i++){

createNFT(i)

}

function createNFT(id){

const img=`images/nft${id}.png`

const card=document.createElement("div")

card.className="card"

card.innerHTML=`<img src="${img}">`

gallery.appendChild(card)

card.onclick=()=>openNFT(id,img)

}

async function openNFT(id,img){

viewer.style.display="flex"

viewerImg.src=img

currentNFT=id

let {data}=await supabase.from("nfts").select("*").eq("id",id).single()

if(!data)return

document.getElementById("likeCount").textContent=data.likes

document.getElementById("downloadCount").textContent=data.downloads

document.getElementById("shareCount").textContent=data.shares

document.getElementById("viewCount").textContent=data.views+1

await supabase.from("nfts").update({views:data.views+1}).eq("id",id)

}

viewer.onclick=()=>viewer.style.display="none"

likeBtn.onclick=async()=>{

let count=parseInt(document.getElementById("likeCount").textContent)+1

document.getElementById("likeCount").textContent=count

await supabase.from("nfts").update({likes:count}).eq("id",currentNFT)

}

downloadBtn.onclick=async()=>{

let count=parseInt(document.getElementById("downloadCount").textContent)+1

document.getElementById("downloadCount").textContent=count

await supabase.from("nfts").update({downloads:count}).eq("id",currentNFT)

window.open(`images/nft${currentNFT}.png`)

}

shareBtn.onclick=()=>{

shareMenu.style.display="flex"

}

shareMenu.querySelectorAll("button").forEach(btn=>{

btn.onclick=async()=>{

let count=parseInt(document.getElementById("shareCount").textContent)+1

document.getElementById("shareCount").textContent=count

await supabase.from("nfts").update({shares:count}).eq("id",currentNFT)

const url=window.location.href+"#nft"+currentNFT

navigator.clipboard.writeText(url)

alert("Link copiado para compartir")

shareMenu.style.display="none"

}

})
