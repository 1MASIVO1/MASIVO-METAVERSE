const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"
);

const gallery = document.getElementById("gallery");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

const likeBtn = document.getElementById("likeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

const likeCount = document.getElementById("likeCount");
const downloadCount = document.getElementById("downloadCount");
const shareCount = document.getElementById("shareCount");
const viewCount = document.getElementById("viewCount");

const closeViewer = document.getElementById("closeViewer");

let currentId = null;
let currentImage = null;

const MAX_NFT = 200;

function createNFTCard(id){

const img = document.createElement("img");

img.src = "images/nft"+id+".png";

img.className = "nft";

img.onclick = () => openNFT(id);

img.onerror = () => img.remove();

gallery.appendChild(img);

}

for(let i=1;i<=MAX_NFT;i++){
createNFTCard(i);
}

async function openNFT(id){

currentId = id;
currentImage = "images/nft"+id+".png";

viewer.style.display = "flex";
viewerImg.src = currentImage;

await loadStats();
await addView();

}

closeViewer.onclick = ()=>{
viewer.style.display="none";
}

async function loadStats(){

const { data } = await supabase
.from("nfts")
.select("*")
.eq("id",currentId)
.single();

likeCount.innerText = data.likes;
downloadCount.innerText = data.downloads;
shareCount.innerText = data.shares;
viewCount.innerText = data.views;

}

async function addView(){

const key="viewed_"+currentId;

if(localStorage.getItem(key)) return;

localStorage.setItem(key,true);

await supabase.rpc("increment_views",{row_id:currentId});

viewCount.innerText = parseInt(viewCount.innerText)+1;

}

likeBtn.onclick = async ()=>{

await supabase.rpc("increment_likes",{row_id:currentId});

likeCount.innerText = parseInt(likeCount.innerText)+1;

}

downloadBtn.onclick = async ()=>{

await supabase.rpc("increment_downloads",{row_id:currentId});

downloadCount.innerText = parseInt(downloadCount.innerText)+1;

const a = document.createElement("a");

a.href=currentImage;
a.download="MASIVO_NFT_"+currentId+".png";

a.click();

}

shareBtn.onclick = async ()=>{

const url = window.location.origin + window.location.pathname + "#nft"+currentId;

navigator.clipboard.writeText(url);

alert("Link copiado 🔗");

await supabase.rpc("increment_shares",{row_id:currentId});

shareCount.innerText = parseInt(shareCount.innerText)+1;

}
