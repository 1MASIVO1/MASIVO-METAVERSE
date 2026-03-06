const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"TU_ANON_KEY"
)

const gallery = document.getElementById("gallery")

const viewer = document.getElementById("viewer")
const viewerImg = document.getElementById("viewerImg")

const likeBtn = document.getElementById("likeBtn")
const downloadBtn = document.getElementById("downloadBtn")
const shareBtn = document.getElementById("shareBtn")

const viewsSpan = document.getElementById("views")
const likesSpan = document.getElementById("likes")
const downloadsSpan = document.getElementById("downloads")
const sharesSpan = document.getElementById("shares")

let currentId = 0
let currentImg = ""

const TOTAL_NFT = 9

function createNFT(id){

const img = `images/nft${id}.png`

const card = document.createElement("div")
card.className = "nft"

card.innerHTML = `<img src="${img}">`

card.onclick = () => openViewer(id,img)

gallery.appendChild(card)

}

async function openViewer(id,img){

currentId = id
currentImg = img

viewer.style.display = "flex"
viewerImg.src = img

let {data} = await supabase
.from("nfts")
.select("*")
.eq("id",id)
.single()

if(!data) return

let views = data.views + 1

await supabase
.from("nfts")
.update({views:views})
.eq("id",id)

viewsSpan.textContent = views
likesSpan.textContent = data.likes
downloadsSpan.textContent = data.downloads
sharesSpan.textContent = data.shares

location.hash = "nft"+id

}

viewer.onclick = e=>{

if(e.target===viewer){

viewer.style.display="none"

}

}

/* LIKE */

likeBtn.onclick = async ()=>{

let count = parseInt(likesSpan.textContent)+1

likesSpan.textContent = count

await supabase
.from("nfts")
.update({likes:count})
.eq("id",currentId)

}

/* DOWNLOAD */

downloadBtn.onclick = async ()=>{

let count = parseInt(downloadsSpan.textContent)+1

downloadsSpan.textContent = count

await supabase
.from("nfts")
.update({downloads:count})
.eq("id",currentId)

window.open(currentImg)

}

/* SHARE */

shareBtn.onclick = async ()=>{

let count = parseInt(sharesSpan.textContent)+1

sharesSpan.textContent = count

await supabase
.from("nfts")
.update({shares:count})
.eq("id",currentId)

const link = window.location.origin + window.location.pathname + "#nft"+currentId

navigator.clipboard.writeText(link)

alert("Link del NFT copiado")

}

/* CREAR NFTS */

for(let i=1;i<=TOTAL_NFT;i++){

createNFT(i)

}
