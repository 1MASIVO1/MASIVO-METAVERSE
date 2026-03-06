const grid = document.getElementById("nft-grid")

const viewer = document.getElementById("viewer")
const viewerImg = document.getElementById("viewer-img")

const likeBtn = document.getElementById("likeBtn")
const downloadBtn = document.getElementById("downloadBtn")
const shareBtn = document.getElementById("shareBtn")

const viewCount = document.getElementById("viewCount")

let currentNFT = ""

let views = {}

const MAX_NFTS = 50

for(let i=1;i<=MAX_NFTS;i++){

const img = new Image()

img.src = "images/nft"+i+".png"

img.onload = function(){

const card = document.createElement("div")
card.className = "nft-card"

card.innerHTML = `
<img src="images/nft${i}.png" class="nft-img">
`

card.onclick = ()=>openViewer("images/nft"+i+".png")

grid.appendChild(card)

}

}

function openViewer(src){

viewer.style.display="flex"

viewerImg.src=src

currentNFT = src

if(!views[src]) views[src]=0

views[src]++

viewCount.innerText = views[src]

}

viewer.onclick=(e)=>{

if(e.target===viewer){

viewer.style.display="none"

}

}

downloadBtn.onclick=()=>{

const a = document.createElement("a")

a.href=currentNFT
a.download="MASIVO-NFT"

a.click()

}

shareBtn.onclick=()=>{

navigator.clipboard.writeText(currentNFT)

alert("Link copied")

}

let likes = {}

likeBtn.onclick=()=>{

if(!likes[currentNFT]) likes[currentNFT]=0

likes[currentNFT]++

likeBtn.innerText="❤️ "+likes[currentNFT]

}
