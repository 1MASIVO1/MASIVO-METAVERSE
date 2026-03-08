// SUPABASE CONNECTION
const SUPABASE_URL = https://rnkuxwsuztewgbdmjyxt.supabase.co
const SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// ABRIR NFT
function abrirNFT(img){

let modal = document.getElementById("nftModal");
let modalImg = document.getElementById("modalImg");

modal.style.display = "flex";
modalImg.src = img.src;

let nft = img.closest(".nft");
let id = nft.dataset.id;

contarVista(nft,id);

}


// CERRAR NFT
function cerrarNFT(){
document.getElementById("nftModal").style.display = "none";
}


// LIKE
async function like(btn){

let nft = btn.closest(".nft");
let id = nft.dataset.id;

let span = nft.querySelector(".likes");
let num = parseInt(span.innerText.replace("❤️","")) + 1;

span.innerText = "❤️ " + num;

await supabase
.from("nft_stats")
.update({likes:num})
.eq("id",id);

checkLogros(nft,num,"likes");

}


// CONTAR VISTA SOLO AL ABRIR
async function contarVista(nft,id){

let span = nft.querySelector(".views");
let num = parseInt(span.innerText.replace("👁","")) + 1;

span.innerText = "👁 " + num;

await supabase
.from("nft_stats")
.update({views:num})
.eq("id",id);

checkLogros(nft,num,"views");

}


// BOTON VISTA MANUAL
function vista(btn){

let nft = btn.closest(".nft");
let id = nft.dataset.id;

contarVista(nft,id);

}


// DESCARGAR
async function descargar(btn){

let nft = btn.closest(".nft");
let id = nft.dataset.id;

let img = nft.querySelector("img").src;

let a = document.createElement("a");
a.href = img;
a.download = "nft.png";
a.click();

let span = nft.querySelector(".downloads");
let num = parseInt(span.innerText.replace("⬇","")) + 1;

span.innerText = "⬇ " + num;

await supabase
.from("nft_stats")
.update({downloads:num})
.eq("id",id);

checkLogros(nft,num,"downloads");

}


// SHARE
async function share(btn){

let nft = btn.closest(".nft");
let id = nft.dataset.id;

let url = window.location.href + "?nft=" + id;

navigator.clipboard.writeText(url);

alert("Link copiado para compartir!");

let span = nft.querySelector(".shares");
let num = parseInt(span.innerText.replace("🔗","")) + 1;

span.innerText = "🔗 " + num;

await supabase
.from("nft_stats")
.update({shares:num})
.eq("id",id);

checkLogros(nft,num,"shares");

}


// SISTEMA DE LOGROS
function checkLogros(nft,num,tipo){

let logro = nft.querySelector(".logroNum");

let puntos = parseInt(logro.innerText);

if(num === 10) puntos += 1;
if(num === 50) puntos += 2;
if(num === 100) puntos += 3;

logro.innerText = puntos;

if(num === 10 || num === 50 || num === 100){

nft.classList.add("logroAnim");

setTimeout(()=>{
nft.classList.remove("logroAnim")
},1000);

}

}


// ABRIR NFT DESDE LINK
window.onload = function(){

let params = new URLSearchParams(window.location.search);
let nftID = params.get("nft");

if(nftID){

let nft = document.querySelector(`.nft[data-id='${nftID}']`);

if(nft){

let img = nft.querySelector("img");
abrirNFT(img);

}

}

};
