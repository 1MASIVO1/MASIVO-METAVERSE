const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"
)

const gallery = document.getElementById("gallery")
const viewer = document.getElementById("viewer")
const viewerImg = document.getElementById("viewer-img")

const TOTAL_NFT = 9

function createCard(id){

const img = `images/nft${id}.png`

const card = document.createElement("div")
card.className="card"

card.innerHTML=`<img src="${img}">`

gallery.appendChild(card)

card.onclick=()=>{

viewer.style.display="flex"
viewerImg.src=img

}

}

for(let i=1;i<=TOTAL_NFT;i++){

createCard(i)

}

viewer.onclick=()=>viewer.style.display="none"
