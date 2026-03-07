const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"
)

const gallery=document.getElementById("gallery")

const viewer=document.getElementById("viewer")
const viewerImg=document.getElementById("viewer-img")

const likeBtn=document.getElementById("likeBtn")
const downloadBtn=document.getElementById("downloadBtn")
const shareBtn=document.getElementById("shareBtn")

const likeCount=document.getElementById("likeCount")
const downloadCount=document.getElementById("downloadCount")
const shareCount=document.getElementById("shareCount")
const viewCount=document.getElementById("viewCount")

let currentId=0

const TOTAL_NFT=9

function createCard(id){

const img=`images/nft${id}.png`

const card=document.createElement("div")

card.className="card"

card.innerHTML=`<img src="${img}">`

gallery.appendChild(card)

card.onclick=()=>openViewer(id,img)

}

async function openViewer(id,img){

currentId=id

viewer.style.display="flex"

viewerImg.src=img

let {data}=await supabase
.from("nfts")
.select("*")
.eq("id",id)
.single()

if(!data)return

let views=data.views+1

await supabase
.from("nfts")
.update({views:views})
.eq("id",id)

likeCount.textContent=data.likes
downloadCount.textContent=data.downloads
shareCount.textContent=data.shares
viewCount.textContent=views

}

likeBtn.onclick=async()=>{

let count=parseInt(likeCount.textContent)+1

likeCount.textContent=count

await supabase
.from("nfts")
.update({likes:count})
.eq("id",currentId)

}

downloadBtn.onclick=async()=>{

let count=parseInt(downloadCount.textContent)+1

downloadCount.textContent=count

await supabase
.from("nfts")
.update({downloads:count})
.eq("id",currentId)

window.open(viewerImg.src)

}

shareBtn.onclick=async()=>{

let count=parseInt(shareCount.textContent)+1

shareCount.textContent=count

await supabase
.from("nfts")
.update({shares:count})
.eq("id",currentId)

const url=window.location.origin+window.location.pathname+"#nft"+currentId

navigator.clipboard.writeText(url)

alert("Link copiado")

}

viewer.onclick=()=>viewer.style.display="none"

for(let i=1;i<=TOTAL_NFT;i++){

createCard(i)

}
