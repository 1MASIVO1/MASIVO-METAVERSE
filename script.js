const supabaseUrl = "https://rnkuxwsuztewgbdmjyxt.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)



function getNFTName(imgSrc){

let file = imgSrc.split("/").pop()

file = file.replace(".png","")

file = file.replace(/^nft\d+\s/, "")

return file

}



async function cargarStats(){

const { data, error } = await supabaseClient
.from("nfts")
.select("*")

if(error){
console.log("Supabase error:", error)
return
}

if(!data) return

let topScore = 0
let topName = "---"

data.forEach(nft => {

let card = document.querySelector(`.nft[data-id='${nft.id}']`)

if(!card) return

card.querySelector(".likes").innerText = "❤️ " + (nft.likes || 0)
card.querySelector(".views").innerText = "👁 " + (nft.views || 0)
card.querySelector(".downloads").innerText = "⬇ " + (nft.downloads || 0)
card.querySelector(".shares").innerText = "🔗 " + (nft.shares || 0)
card.querySelector(".logroNum").innerText = (nft.logros || 0)

let score =
(nft.likes || 0) +
(nft.views || 0) +
(nft.downloads || 0) +
(nft.shares || 0)

if(score > topScore){

let img = card.querySelector("img")

topName = getNFTName(img.src)

topScore = score

}

})

document.getElementById("topNombre").innerText = topName

}



function abrirNFT(img){

let modal = document.getElementById("nftModal")
let modalImg = document.getElementById("modalImg")

modal.style.display = "flex"
modalImg.src = img.src

let nft = img.closest(".nft")
let id = nft.dataset.id

sumarView(id,nft)

}



function cerrarNFT(){

document.getElementById("nftModal").style.display = "none"

}



async function sumarView(id,nft){

if(localStorage.getItem("view_"+id)) return

localStorage.setItem("view_"+id,true)

const { data } = await supabaseClient
.from("nfts")
.select("views")
.eq("id", id)
.single()

let views = ((data && data.views) || 0) + 1

await supabaseClient
.from("nfts")
.update({ views: views })
.eq("id", id)

nft.querySelector(".views").innerText = "👁 " + views

checkLogro(id,nft,views,"view")

}



async function like(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

if(localStorage.getItem("like_"+id)){
alert("Ya diste like a este NFT")
return
}

localStorage.setItem("like_"+id,true)

const { data } = await supabaseClient
.from("nfts")
.select("likes")
.eq("id", id)
.single()

let likes = ((data && data.likes) || 0) + 1

await supabaseClient
.from("nfts")
.update({ likes: likes })
.eq("id", id)

nft.querySelector(".likes").innerText = "❤️ " + likes

checkLogro(id,nft,likes,"like")

}



async function descargar(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

if(localStorage.getItem("download_"+id)){
alert("Ya descargaste este NFT")
return
}

localStorage.setItem("download_"+id,true)

const { data } = await supabaseClient
.from("nfts")
.select("downloads")
.eq("id", id)
.single()

let downloads = ((data && data.downloads) || 0) + 1

await supabaseClient
.from("nfts")
.update({ downloads: downloads })
.eq("id", id)

nft.querySelector(".downloads").innerText = "⬇ " + downloads

checkLogro(id,nft,downloads,"download")

}



async function share(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")
let id = nft.dataset.id

let link = window.location.origin + window.location.pathname + "?nft=" + id

try{
navigator.clipboard.writeText(link)
}catch{
prompt("Copia este link:", link)
}

alert("Link copiado")

if(localStorage.getItem("share_"+id)) return

localStorage.setItem("share_"+id,true)

const { data } = await supabaseClient
.from("nfts")
.select("shares")
.eq("id", id)
.single()

let shares = ((data && data.shares) || 0) + 1

await supabaseClient
.from("nfts")
.update({ shares: shares })
.eq("id", id)

nft.querySelector(".shares").innerText = "🔗 " + shares

checkLogro(id,nft,shares,"share")

}



async function checkLogro(id,nft,total,type){

if(total % 100 !== 0) return

let logroSpan = nft.querySelector(".logroNum")

let logros = parseInt(logroSpan.innerText,10) + 1

logroSpan.innerText = logros

await supabaseClient
.from("nfts")
.update({ logros: logros })
.eq("id", id)

activarBorde(nft,type)

reproducirLogro(nft,id,logros)

}



function activarBorde(nft,type){

if(type==="like") nft.classList.add("likeBorder")
if(type==="view") nft.classList.add("viewBorder")
if(type==="download") nft.classList.add("downloadBorder")
if(type==="share") nft.classList.add("shareBorder")

}



function reproducirLogro(nft,id,logro){

let img = nft.querySelector("img")

let nombre = img.src.split("/").pop().replace(".png","")

let videoPath = "videos/" + nombre + "_logro" + logro + ".mp4"

let cont = nft.querySelector(".videoLogro")

cont.innerHTML = ""

let video = document.createElement("video")

video.src = videoPath
video.autoplay = true

cont.appendChild(video)

cont.style.display = "flex"

video.onended = function(){

cont.style.display = "none"

}

}



function openAchievements(event,btn){

event.stopPropagation()

let nft = btn.closest(".nft")

let id = nft.dataset.id

let img = nft.querySelector("img")

let nombre = img.src.split("/").pop().replace(".png","")

let logros = parseInt(nft.querySelector(".logroNum").innerText,10)

let achList = document.getElementById("achList")

achList.innerHTML = ""

for(let i=1;i<=logros;i++){

let div = document.createElement("div")

div.className="achItem"

div.innerHTML =
"⭐ Logro "+i+
"<br><button onclick='playAchievement("+id+","+i+")'>▶ Reproducir</button>"+
"<button onclick=\"downloadAchievement('"+nombre+"_logro"+i+".mp4')\">⬇ Descargar</button>"

achList.appendChild(div)

}

document.getElementById("achModal").style.display="flex"

}



function closeAchievements(){

document.getElementById("achModal").style.display="none"

}



function playAchievement(id,logro){

closeAchievements()

let nft = document.querySelector(`.nft[data-id='${id}']`)

reproducirLogro(nft,id,logro)

}



function downloadAchievement(file){

let a = document.createElement("a")

a.href="videos/"+file

a.download=file

a.click()

}



window.addEventListener("load", function(){

cargarStats()

let params = new URLSearchParams(window.location.search)

let nftID = params.get("nft")

if(nftID){

let nft = document.querySelector(`.nft[data-id='${nftID}']`)

if(nft){

let img = nft.querySelector("img")

abrirNFT(img)

}

}

})
