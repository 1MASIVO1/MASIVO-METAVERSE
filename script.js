const SUPABASE_URL = "https://rnkuxwsuztewgbdmjyxt.supabase.co"
const SUPABASE_KEY = "TU_ANON_KEY_AQUI"

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

const gallery = document.getElementById("gallery")

let currentNFT = null

/* CARGAR NFTS */

async function loadNFTs(){

const { data } = await supabase
.from("nfts")
.select("*")
.order("id")

gallery.innerHTML=""

data.forEach(nft=>{

const card=document.createElement("div")
card.className="nft"

card.innerHTML=`
<img src="images/${nft.image_name}">
`

card.onclick=()=>openViewer(nft)

gallery.appendChild(card)

})

}

loadNFTs()

/* ABRIR NFT */

async function openViewer(nft){

currentNFT=nft

document.getElementById("viewer").style.display="flex"

document.getElementById("viewerImg").src=`images/${nft.image_name}`

await supabase
.from("nfts")
.update({views:nft.views+1})
.eq("id",nft.id)

updateStats(nft)

}

/* CERRAR */

function closeViewer(){

document.getElementById("viewer").style.display="none"

}

/* LIKE */

document.getElementById("likeBtn").onclick=async()=>{

const newLikes=currentNFT.likes+1

await supabase
.from("nfts")
.update({likes:newLikes})
.eq("id",currentNFT.id)

currentNFT.likes=newLikes

updateStats(currentNFT)

}

/* DOWNLOAD */

document.getElementById("downloadBtn").onclick=()=>{

const link=document.createElement("a")

link.href=`images/${currentNFT.image_name}`

link.download=currentNFT.image_name

link.click()

}

/* SHARE */

document.getElementById("shareBtn").onclick=()=>{

navigator.clipboard.writeText(window.location.href)

alert("Link copiado")

}

/* STATS */

function updateStats(nft){

document.getElementById("stats").innerText=
`👁 ${nft.views}   ❤️ ${nft.likes}`

}
