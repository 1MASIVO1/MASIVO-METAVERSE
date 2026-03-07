const SUPABASE_URL="https://rnkuxwsuztewgbdmjyxt.supabase.co"

const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const client=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

const container=document.getElementById("nftContainer")
const topContainer=document.getElementById("topMasivo")

async function cargar(){

const {data}=await client.from("nfts").select("*")

container.innerHTML=""

data.forEach(nft=>{

const card=document.createElement("div")
card.className="card flotar"

card.innerHTML=`

<img src="${nft.image}" onclick="abrir('${nft.image}')">

<div class="stats">

<button onclick="like(${nft.id})">❤️ ${nft.likes}</button>

<button onclick="view(${nft.id})">👁️ ${nft.views}</button>

<button onclick="download('${nft.image}',${nft.id})">⬇️ ${nft.downloads}</button>

<button onclick="share(${nft.id})">🔗 ${nft.shares}</button>

</div>

`

container.appendChild(card)

})

ranking(data)

}

function ranking(data){

const orden=[...data].sort((a,b)=>

(b.likes+b.views+b.shares)-(a.likes+a.views+a.shares)

).slice(0,3)

topContainer.innerHTML=""

orden.forEach(nft=>{

const card=document.createElement("div")

card.className="card"

card.innerHTML=`<img src="${nft.image}" onclick="abrir('${nft.image}')">`

topContainer.appendChild(card)

})

}

function abrir(src){

const modal=document.createElement("div")

modal.className="modal"

modal.innerHTML=`<img src="${src}">`

modal.onclick=()=>modal.remove()

document.body.appendChild(modal)

}

async function like(id){

await client.rpc("add_like",{nft_id:id})

cargar()

}

async function view(id){

await client.rpc("add_view",{nft_id:id})

cargar()

}

async function share(id){

await client.rpc("add_share",{nft_id:id})

cargar()

}

function download(src,id){

const a=document.createElement("a")

a.href=src

a.download="masivo"

a.click()

client.rpc("add_download",{nft_id:id})

}

cargar()
