const supabaseUrl = "https://rnkuxwsuztewgbdmjyxt.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

async function cargarStats(){

const { data, error } = await supabaseClient
.from("nfts")
.select("*")

if(error){
console.log(error)
return
}

data.forEach(nft => {

let card = document.querySelector(`.nft[data-id='${nft.id}']`)

if(!card) return

card.querySelector(".likes").innerText = "❤️ " + nft.likes
card.querySelector(".views").innerText = "👁 " + nft.views
card.querySelector(".downloads").innerText = "⬇ " + nft.downloads
card.querySelector(".shares").innerText = "🔗 " + nft.shares
card.querySelector(".logroNum").innerText = nft.logros

})

generarRanking(data)

}

window.addEventListener("load", cargarStats)



function generarRanking(data){

let ranking = document.getElementById("rankingMasivo")

ranking.innerHTML = ""

let orden = [...data].sort((a,b)=>b.likes-a.likes)

orden.slice(0,3).forEach((n,i)=>{

let card = document.querySelector(`.nft[data-id='${n.id}']`)

let nombre = card.dataset.name

ranking.innerHTML += `#${i+1} ${nombre} (${n.likes} likes)<br>`

})

}
