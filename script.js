const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"
)

const container = document.getElementById("nft-container")

async function loadNFTs(){

for(let i=1;i<=50;i++){

let image = `images/nft${i}.png`

let nft = document.createElement("div")
nft.className="nft"

nft.innerHTML=`
<img src="${image}" onclick="viewNFT('${image}',${i})">

<div class="actions">

<button onclick="likeNFT(${i})">
❤️
</button>

<a href="${image}" download>
<button>⬇</button>
</a>

</div>

<div id="stats${i}">
👁 0 | ❤️ 0
</div>
`

container.appendChild(nft)

loadStats(i)

}

}

async function loadStats(id){

let {data}=await supabase
.from("nfts")
.select("*")
.eq("id",id)
.single()

if(data){

document.getElementById("stats"+id).innerHTML=
`👁 ${data.vistas} | ❤️ ${data.likes}`

}

}

async function likeNFT(id){

await supabase.rpc("increment_likes",{row_id:id})

loadStats(id)

}

async function viewNFT(img,id){

document.getElementById("viewer").style.display="flex"
document.getElementById("viewer-img").src=img

await supabase.rpc("increment_views",{row_id:id})

loadStats(id)

}

function closeViewer(){

document.getElementById("viewer").style.display="none"

}

loadNFTs()
