const gallery = document.getElementById("gallery")

const viewer = document.getElementById("viewer")
const viewerImg = document.getElementById("viewerImg")

const likeBtn = document.getElementById("likeBtn")
const shareBtn = document.getElementById("shareBtn")
const downloadBtn = document.getElementById("downloadBtn")

const likeCount = document.getElementById("likeCount")
const shareCount = document.getElementById("shareCount")
const downloadCount = document.getElementById("downloadCount")
const viewCount = document.getElementById("viewCount")

const closeViewer = document.getElementById("closeViewer")

let currentNFT = 0

for(let i=1;i<=9;i++){

let div=document.createElement("div")
div.className="nft"

let img=document.createElement("img")
img.src=`images/nft${i}.png`

div.appendChild(img)

gallery.appendChild(div)

img.onclick=()=>{

currentNFT=i

viewer.classList.remove("hidden")

viewerImg.src=img.src

let data=JSON.parse(localStorage.getItem("nft"+i)) || {likes:0,views:0,shares:0,downloads:0}

data.views++

localStorage.setItem("nft"+i,JSON.stringify(data))

updateUI(data)

}

}

function updateUI(data){

likeCount.innerText=data.likes
viewCount.innerText=data.views
shareCount.innerText=data.shares
downloadCount.innerText=data.downloads

}

likeBtn.onclick=()=>{

let data=JSON.parse(localStorage.getItem("nft"+currentNFT))

data.likes++

localStorage.setItem("nft"+currentNFT,JSON.stringify(data))

updateUI(data)

}

shareBtn.onclick=()=>{

let data=JSON.parse(localStorage.getItem("nft"+currentNFT))

data.shares++

navigator.clipboard.writeText(viewerImg.src)

localStorage.setItem("nft"+currentNFT,JSON.stringify(data))

updateUI(data)

}

downloadBtn.onclick=()=>{

let data=JSON.parse(localStorage.getItem("nft"+currentNFT))

data.downloads++

localStorage.setItem("nft"+currentNFT,JSON.stringify(data))

updateUI(data)

const a=document.createElement("a")

a.href=viewerImg.src
a.download="masivo-nft.png"

a.click()

}

closeViewer.onclick=()=>{

viewer.classList.add("hidden")

}
