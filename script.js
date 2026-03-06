const SUPABASE_URL="https://rnkuxwsuztewgbdmjyxt.supabase.co"

const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabaseClient=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

const nftNames=[
"void-assassin",
"dragon-armor",
"storm-warden",
"shadow-ronin",
"iron-titan",
"cyber-samurai",
"phoenix-guardian",
"dark-knight",
"neon-hunter"
]

const grid=document.getElementById("nft-grid")

nftNames.forEach((name,i)=>{

let div=document.createElement("div")
div.className="nft"

div.innerHTML=`

<img src="images/${i+1}.png" onclick="viewNFT(${i})">

<div class="buttons">

<button onclick="likeNFT(${i})">LIKE</button>
<button onclick="downloadNFT(${i})">DOWNLOAD</button>
<button onclick="shareNFT(${i})">SHARE</button>

</div>

<div class="counter">

👁 <span id="views${i}">0</span>
❤️ <span id="likes${i}">0</span>
⬇ <span id="downloads${i}">0</span>
🔗 <span id="shares${i}">0</span>

</div>

`

grid.appendChild(div)

loadStats(i)

})

async function loadStats(id){

let {data}=await supabaseClient
.from("nft_stats")
.select("*")
.eq("id",id)
.single()

if(!data)return

document.getElementById("views"+id).innerText=data.views
document.getElementById("likes"+id).innerText=data.likes
document.getElementById("downloads"+id).innerText=data.downloads
document.getElementById("shares"+id).innerText=data.shares

}

async function updateStat(id,field){

let {data}=await supabaseClient
.from("nft_stats")
select("*")
.eq("id",id)
.single()

let value=data[field]+1

await supabaseClient
.from("nft_stats")
.update({[field]:value})
.eq("id",id)

document.getElementById(field+id).innerText=value

}

function viewNFT(id){
updateStat(id,"views")
}

function likeNFT(id){
updateStat(id,"likes")
}

function downloadNFT(id){
updateStat(id,"downloads")
window.open(`images/${id+1}.png`)
}

function shareNFT(id){

updateStat(id,"shares")

let url=window.location.href+"?nft="+id

navigator.clipboard.writeText(url)

alert("NFT link copied!")

}
