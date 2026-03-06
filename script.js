const supabaseUrl = "https://TU_URL_SUPABASE.supabase.co"
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabaseClient = supabase.createClient(supabaseUrl,supabaseKey)

const gallery = document.getElementById("gallery")

const modal = document.getElementById("nftModal")
const modalImg = document.getElementById("modalImg")

const views = document.getElementById("views")
const likes = document.getElementById("likes")
const downloads = document.getElementById("downloads")
const shares = document.getElementById("shares")

let currentNFT = ""

const nftTotal = 9

function loadNFTs(){

for(let i=1;i<=nftTotal;i++){

let img = document.createElement("img")

img.src = `images/nft${i}.png`

img.onclick = ()=>openNFT(`nft${i}.png`)

gallery.appendChild(img)

}

}

loadNFTs()

async function openNFT(name){

currentNFT = name

modal.style.display="block"

modalImg.src = `images/${name}`

addView(name)

loadStats(name)

history.pushState(null,null,`?nft=${name}`)

}

document.getElementById("closeModal").onclick = ()=>{
modal.style.display="none"
}

async function loadStats(name){

let {data} = await supabaseClient
.from("nft_stats")
.select("*")
.eq("image_name",name)
.single()

if(data){

views.innerText = data.views
likes.innerText = data.likes
downloads.innerText = data.downloads
shares.innerText = data.shares

}

}

async function addView(name){

await supabaseClient.rpc("increment_views",{image_name:name})

}

document.getElementById("likeBtn").onclick = async ()=>{

await supabaseClient.rpc("increment_likes",{image_name:currentNFT})

loadStats(currentNFT)

}

document.getElementById("downloadBtn").onclick = async ()=>{

let a = document.createElement("a")

a.href = `images/${currentNFT}`

a.download = currentNFT

a.click()

await supabaseClient.rpc("increment_downloads",{image_name:currentNFT})

loadStats(currentNFT)

}

document.getElementById("shareBtn").onclick = async ()=>{

let link = `${window.location.origin}${window.location.pathname}?nft=${currentNFT}`

navigator.clipboard.writeText(link)

alert("Link copied!")

await supabaseClient.rpc("increment_shares",{image_name:currentNFT})

loadStats(currentNFT)

}

window.onload=()=>{

let params = new URLSearchParams(window.location.search)

let nft = params.get("nft")

if(nft){

openNFT(nft)

}

}
