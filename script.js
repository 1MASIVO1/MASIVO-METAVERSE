const grid = document.getElementById("nft-grid")

const viewer = document.getElementById("viewer")
const viewerImg = document.getElementById("viewer-img")

const likeBtn = document.getElementById("likeBtn")
const downloadBtn = document.getElementById("downloadBtn")
const shareBtn = document.getElementById("shareBtn")

const viewCount = document.getElementById("viewCount")
const likeCount = document.getElementById("likeCount")
const downloadCount = document.getElementById("downloadCount")

let currentNFT = ""
let currentID = ""

let views = {}
let likes = {}
let downloads = {}

const MAX_NFTS = 200

for(let i=1;i<=MAX_NFTS;i++){

const img = new Image()

img.src = "images/nft"+i+".png"

img.onload = function(){

const card = document.createElement("div")
card.className = "nft-card"

card.innerHTML = `
<img src="images/nft${i}.png" class="nft-img">
`

card.onclick = ()=>openViewer("images/nft"+i+".png","nft"+i)

grid.appendChild(card)

}

}

function openViewer(src,id){

viewer.style.display="flex"

viewerImg.src=src

currentNFT = src
currentID = id

window.location.hash = id

if(!views[id]) views[id]=0

views[id]++

viewCount.innerText = views[id]

if(!likes[id]) likes[id]=0
if(!downloads[id]) downloads[id]=0

likeCount.innerText = likes[id]
downloadCount.innerText = downloads[id]

}

viewer.onclick=(e)=>{

if(e.target===viewer){

viewer.style.display="none"

history.pushState("", document.title, window.location.pathname)

}

}

downloadBtn.onclick=()=>{

const a = document.createElement("a")

a.href=currentNFT
a.download="MASIVO-NFT"

a.click()

if(!downloads[currentID]) downloads[currentID]=0

downloads[currentID]++

downloadCount.innerText = downloads[currentID]

}

shareBtn.onclick = () => {

const link = "https://1masivo1.github.io/MASIVO-METAVERSE/#" + currentID

navigator.clipboard.writeText(link)

alert("Link del NFT copiado 🔥")

}

likeBtn.onclick=()=>{

if(!likes[currentID]) likes[currentID]=0

likes[currentID]++

likeCount.innerText = likes[currentID]

}

window.onload = () => {

const hash = window.location.hash

if(hash){

const id = hash.replace("#","")

const num = id.replace("nft","")

const src = "images/nft"+num+".png"

openViewer(src,id)

}

}
