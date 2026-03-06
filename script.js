const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"
)

const gallery = document.getElementById("gallery")
const viewer = document.getElementById("viewer")
const viewerImg = document.getElementById("viewer-img")

async function loadNFTs(){

const {data} = await supabase
.from("nfts")
.select("*")
.order("id")

data.forEach(nft=>createCard(nft))

}

function createCard(nft){

const img = `images/${nft.image_name}`

const card = document.createElement("div")
card.className="card"

card.innerHTML=`

<img src="${img}">

<div class="actions">

<button class="like">👍 <span>${nft.likes}</span></button>

<div>👁 <span class="views">${nft.views}</span></div>

<button class="download">⬇ <span>${nft.downloads}</span></button>

<button class="share">🔗 <span>${nft.shares}</span></button>

</div>

`

gallery.appendChild(card)

card.querySelector("img").onclick=()=>openViewer(nft,img,card)

card.querySelector(".like").onclick=()=>likeNFT(nft,card)

card.querySelector(".download").onclick=()=>downloadNFT(nft,img,card)

card.querySelector(".share").onclick=()=>shareNFT(nft,card)

}

async function likeNFT(nft,card){

nft.likes++

card.querySelector(".like span").textContent=nft.likes

await supabase
.from("nfts")
.update({likes:nft.likes})
.eq("id",nft.id)

}

async function downloadNFT(nft,img,card){

nft.downloads++

card.querySelector(".download span").textContent=nft.downloads

await supabase
.from("nfts")
.update({downloads:nft.downloads})
.eq("id",nft.id)

window.open(img)

}

async function shareNFT(nft,card){

nft.shares++

card.querySelector(".share span").textContent=nft.shares

await supabase
.from("nfts")
.update({shares:nft.shares})
.eq("id",nft.id)

const url=window.location.origin+window.location.pathname+"#"+nft.id

navigator.clipboard.writeText(url)

alert("Link copiado")

}

async function openViewer(nft,img,card){

viewer.style.display="flex"
viewerImg.src=img

nft.views++

card.querySelector(".views").textContent=nft.views

await supabase
.from("nfts")
.update({views:nft.views})
.eq("id",nft.id)

location.hash=nft.id

}

viewer.onclick=()=>viewer.style.display="none"

loadNFTs()
