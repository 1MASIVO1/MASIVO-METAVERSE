const nftImages=[

"images/1.png",
"images/2.png",
"images/3.png",
"images/4.png",
"images/5.png",
"images/6.png",
"images/7.png",
"images/8.png",
"images/9.png"

]

const container=document.getElementById("nft-container")

const modal=document.getElementById("nftModal")
const modalImg=document.getElementById("modalImg")

const likeBtn=document.getElementById("likeBtn")
const downloadBtn=document.getElementById("downloadBtn")
const shareBtn=document.getElementById("shareBtn")

const views=document.getElementById("views")
const likes=document.getElementById("likes")
const downloads=document.getElementById("downloads")
const shares=document.getElementById("shares")

let currentNFT=0

nftImages.forEach((src,index)=>{

let div=document.createElement("div")
div.className="nft"

let img=document.createElement("img")
img.src=src

div.appendChild(img)

div.onclick=()=>openNFT(index)

container.appendChild(div)

})

function openNFT(id){

currentNFT=id

modal.style.display="block"
modalImg.src=nftImages[id]

let v=localStorage.getItem("views"+id)||0
v++
localStorage.setItem("views"+id,v)

updateStats()

}

function updateStats(){

views.innerText="👁 "+(localStorage.getItem("views"+currentNFT)||0)
likes.innerText="❤️ "+(localStorage.getItem("likes"+currentNFT)||0)
downloads.innerText="⬇ "+(localStorage.getItem("downloads"+currentNFT)||0)
shares.innerText="🔗 "+(localStorage.getItem("shares"+currentNFT)||0)

}

likeBtn.onclick=()=>{

let l=localStorage.getItem("likes"+currentNFT)||0
l++
localStorage.setItem("likes"+currentNFT,l)

updateStats()

}

downloadBtn.onclick=()=>{

let d=localStorage.getItem("downloads"+currentNFT)||0
d++
localStorage.setItem("downloads"+currentNFT,d)

updateStats()

let a=document.createElement("a")
a.href=nftImages[currentNFT]
a.download="MASIVO_NFT.png"
a.click()

}

shareBtn.onclick=()=>{

let s=localStorage.getItem("shares"+currentNFT)||0
s++
localStorage.setItem("shares"+currentNFT,s)

updateStats()

let link=window.location.href+"#nft"+currentNFT

navigator.clipboard.writeText(link)

alert("Link copiado")

}

document.querySelector(".close").onclick=()=>{

modal.style.display="none"

}

/* FIREWORKS */

const canvas=document.getElementById("fireworks")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=200

let particles=[]

function createFirework(){

let x=Math.random()*canvas.width
let y=100

for(let i=0;i<40;i++){

particles.push({

x:x,
y:y,
vx:(Math.random()-0.5)*4,
vy:(Math.random()-0.5)*4,
life:100

})

}

}

setInterval(createFirework,1500)

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

p.x+=p.vx
p.y+=p.vy
p.life--

ctx.fillStyle="#00eaff"
ctx.fillRect(p.x,p.y,2,2)

})

particles=particles.filter(p=>p.life>0)

requestAnimationFrame(animate)

}

animate()
