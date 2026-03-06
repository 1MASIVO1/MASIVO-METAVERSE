const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4
)

const gallery = document.getElementById("gallery")
const viewer = document.getElementById("viewer")
const viewerImg = document.getElementById("viewer-img")

const TOTAL_NFT = 8

function createCard(id){

const imgName = `nft${id}.png`
const img = `images/${imgName}`

const card = document.createElement("div")
card.className="card"

card.innerHTML=`

<img src="${img}" onerror="this.parentElement.remove()">

<div class="actions">

<button class="like">👍 <span>0</span></button>

<div>👁 <span class="views">0</span></div>

<button class="download">⬇ <span>0</span></button>

<button class="share">🔗 <span>0</span></button>

</div>

`

gallery.appendChild(card)

loadStats(imgName,card)

card.querySelector("img").onclick=()=>openViewer(imgName,img)

card.querySelector(".like").onclick=()=>likeNFT(imgName,card)

card.querySelector(".download").onclick=()=>downloadNFT(imgName,img,card)

card.querySelector(".share").onclick=()=>shareNFT(imgName,card)

}

async function loadStats(name,card){

let {data}=await supabase
.from("nfts")
.select("*")
.eq("image_name",name)
.single()

if(!data)return

card.querySelector(".like span").textContent=data.likes
card.querySelector(".views").textContent=data.views
card.querySelector(".download span").textContent=data.downloads
card.querySelector(".share span").textContent=data.shares

}

async function likeNFT(name,card){

let span=card.querySelector(".like span")
let count=parseInt(span.textContent)+1
span.textContent=count

await supabase
.from("nfts")
.update({likes:count})
.eq("image_name",name)

}

async function downloadNFT(name,img,card){

let span=card.querySelector(".download span")
let count=parseInt(span.textContent)+1
span.textContent=count

await supabase
.from("nfts")
.update({downloads:count})
.eq("image_name",name)

window.open(img)

}

async function shareNFT(name,card){

let span=card.querySelector(".share span")
let count=parseInt(span.textContent)+1
span.textContent=count

await supabase
.from("nfts")
.update({shares:count})
.eq("image_name",name)

const url=window.location.origin+window.location.pathname+"#"+name

navigator.clipboard.writeText(url)

alert("Link copiado")

}

async function openViewer(name,img){

viewer.style.display="flex"
viewerImg.src=img

let {data}=await supabase
.from("nfts")
.select("views")
.eq("image_name",name)
.single()

let views=data.views+1

await supabase
.from("nfts")
.update({views:views})
.eq("image_name",name)

location.hash=name

}

viewer.onclick=()=>viewer.style.display="none"

for(let i=1;i<=TOTAL_NFT;i++){
createCard(i)
}
