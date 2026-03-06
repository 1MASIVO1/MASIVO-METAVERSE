const gallery=document.getElementById("gallery")

const viewer=document.getElementById("viewer")
const viewerImg=document.getElementById("viewerImg")

const likeBtn=document.getElementById("likeBtn")
const downloadBtn=document.getElementById("downloadBtn")
const shareBtn=document.getElementById("shareBtn")

const viewsEl=document.getElementById("views")
const likesEl=document.getElementById("likes")
const downloadsEl=document.getElementById("downloads")
const sharesEl=document.getElementById("shares")

const TOTAL_NFT=9

let currentNFT=0

function createNFT(id){

let div=document.createElement("div")
div.className="nft"

let img=document.createElement("img")
img.src="images/nft"+id+".png"

img.onclick=()=>openViewer(id)

div.appendChild(img)

gallery.appendChild(div)

if(!localStorage.getItem("nft"+id)){

localStorage.setItem("nft"+id,JSON.stringify({

views:0,
likes:0,
downloads:0,
shares:0

}))

}

}

for(let i=1;i<=TOTAL_NFT;i++){

createNFT(i)

}

function openViewer(id){

currentNFT=id

viewer.style.display="flex"

viewerImg.src="images/nft"+id+".png"

let data=JSON.parse(localStorage.getItem("nft"+id))

data.views++

localStorage.setItem("nft"+id,JSON.stringify(data))

updateUI(data)

}

function updateUI(data){

viewsEl.textContent=data.views
likesEl.textContent=data.likes
downloadsEl.textContent=data.downloads
sharesEl.textContent=data.shares

}

viewer.onclick=(e)=>{

if(e.target===viewer){

viewer.style.display="none"

}

}

likeBtn.onclick=()=>{

let data=JSON.parse(localStorage.getItem("nft"+currentNFT))

data.likes++

localStorage.setItem("nft"+currentNFT,JSON.stringify(data))

updateUI(data)

}

downloadBtn.onclick=()=>{

let data=JSON.parse(localStorage.getItem("nft"+currentNFT))

data.downloads++

localStorage.setItem("nft"+currentNFT,JSON.stringify(data))

updateUI(data)

let link=document.createElement("a")

link.href=viewerImg.src
link.download="nft"+currentNFT+".png"

link.click()

}

shareBtn.onclick=()=>{

let data=JSON.parse(localStorage.getItem("nft"+currentNFT))

data.shares++

localStorage.setItem("nft"+currentNFT,JSON.stringify(data))

updateUI(data)

const url=window.location.origin+window.location.pathname+"?nft="+currentNFT

navigator.clipboard.writeText(url)

alert("Link copiado para compartir")

}

const params=new URLSearchParams(window.location.search)

const nftID=params.get("nft")

if(nftID){

setTimeout(()=>{

openViewer(nftID)

},500)

}
