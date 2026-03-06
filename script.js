const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"TU_ANON_KEY"
)

const gallery = document.getElementById("gallery")
const viewer = document.getElementById("viewer")
const viewerImg = document.getElementById("viewer-img")

const TOTAL_NFT = 20

function createCard(id){

const img = `images/nft${id}.png`

const card = document.createElement("div")
card.className="card"

card.innerHTML = `

<img src="${img}" onerror="this.parentElement.remove()">

<div class="actions">

<button class="like">👍 <span>0</span></button>

<div>👁 <span class="views">0</span></div>

<button class="download">⬇ <span>0</span></button>

<button class="share">🔗 <span>0</span></button>

</div>

`

gallery.appendChild(card)

loadStats(id,card)

card.querySelector("img").onclick = ()=>openViewer(id,img)

card.querySelector(".like").onclick = ()=>likeNFT(id,card)

card.querySelector(".download").onclick = ()=>downloadNFT(id,img,card)

card.querySelector(".share").onclick = ()=>shareNFT(id,card)

}

async function loadStats(id,card){

let {data}=await supabase
.from("nfts")
.select("*")
.eq("id",id)
.single()

if(!data) return

card.querySelector(".like span").textContent=data.likes
card.querySelector(".views").textContent=data.views
card.querySelector(".download span").textContent=data.downloads
card.querySelector(".share span").textContent=data.shares

}

async function likeNFT(id,card){

let span=card.querySelector(".like span")
let count=parseInt(span.textContent)+1

span.textContent=count

await supabase
.from("nfts")
.update({likes:count})
.eq("id",id)

}

async function downloadNFT(id,img,card){

let span=card.querySelector(".download span")
let count=parseInt(span.textContent)+1

span.textContent=count

await supabase
.from("nfts")
.update({downloads:count})
.eq("id",id)

window.open(img)

}

async function shareNFT(id,card){

let span=card.querySelector(".share span")
let count=parseInt(span.textContent)+1

span.textContent=count

await supabase
.from("nfts")
.update({shares:count})
.eq("id",id)

const url=window.location.origin+window.location.pathname+"#nft"+id

navigator.clipboard.writeText(url)

alert("Link copiado")

}

async function openViewer(id,img){

viewer.style.display="flex"
viewerImg.src=img

let {data}=await supabase
.from("nfts")
.select("views")
.eq("id",id)
.single()

let views=data.views+1

await supabase
.from("nfts")
.update({views:views})
.eq("id",id)

location.hash="nft"+id

}

viewer.onclick=()=>viewer.style.display="none"

for(let i=1;i<=TOTAL_NFT;i++){
createCard(i)
}
