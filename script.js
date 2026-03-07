const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"
)

const gallery = document.getElementById("gallery")

const TOTAL_NFT = 9

function createCard(id){

const imgPath = `images/nft${id}.png`

const card = document.createElement("div")
card.className="card"

const img = document.createElement("img")

img.src = imgPath

img.onerror = function(){
console.log("imagen no encontrada:", imgPath)
}

img.onclick = ()=>openViewer(id,imgPath)

card.appendChild(img)

gallery.appendChild(card)

}

async function openViewer(id,img){

const viewer=document.getElementById("viewer")
const viewerImg=document.getElementById("viewer-img")

viewer.style.display="flex"

viewerImg.src=img

let {data}=await supabase
.from("nfts")
.select("*")
.eq("id",id)
.single()

if(!data) return

let views=data.views+1

await supabase
.from("nfts")
.update({views:views})
.eq("id",id)

}

for(let i=1;i<=TOTAL_NFT;i++){
createCard(i)
}
