const SUPABASE_URL = "https://rnkuxwsuztewgbdmjyxt.supabase.co";
const SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const gallery = document.getElementById("gallery");

let currentNFT = null;

async function cargarNFTs() {

let i = 1;

while(true){

let imagePath = `images/nft${i}.png`;

let img = new Image();

img.src = imagePath;

await new Promise(resolve=>{
img.onload = resolve;
img.onerror = ()=>{ resolve("stop"); };
});

if(img.complete === false){
break;
}

crearNFT(imagePath,i);

i++;

}

}

async function crearNFT(image,id){

let card = document.createElement("div");
card.className="nft-card";

card.innerHTML = `
<img src="${image}" class="nft-img">

<div class="nft-actions">

<button onclick="likeNFT(${id})">❤️ Like</button>

<button onclick="downloadNFT('${image}',${id})">⬇️ Descargar</button>

<button onclick="shareNFT('${image}')">🔗 Compartir</button>

</div>

<div class="stats" id="stats-${id}">
👁 0 | ❤️ 0 | ⬇️ 0
</div>
`;

card.querySelector(".nft-img").onclick = ()=>abrirNFT(image,id);

gallery.appendChild(card);

cargarStats(id);

}

async function cargarStats(id){

let { data } = await supabase
.from("nfts")
.select("*")
.eq("id",id)
.single();

if(!data){

await supabase.from("nfts").insert({
id:id,
image_name:`nft${id}.png`,
views:0,
likes:0,
downloads:0
});

return;

}

document.getElementById(`stats-${id}`).innerText =
`👁 ${data.views} | ❤️ ${data.likes} | ⬇️ ${data.downloads}`;

}

async function likeNFT(id){

await supabase.rpc("increment_likes",{row_id:id});

cargarStats(id);

}

async function downloadNFT(url,id){

await supabase.rpc("increment_downloads",{row_id:id});

let a=document.createElement("a");

a.href=url;

a.download="nft.png";

a.click();

cargarStats(id);

}

function shareNFT(url){

navigator.clipboard.writeText(url);

alert("Link copiado");

}

async function abrirNFT(url,id){

currentNFT=url;

document.getElementById("viewer").style.display="flex";

document.getElementById("viewer-img").src=url;

await supabase.rpc("increment_views",{row_id:id});

cargarStats(id);

}

function cerrarViewer(){

document.getElementById("viewer").style.display="none";

}

cargarNFTs();
