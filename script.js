// ===== FIREWORKS ENGINE =====

const canvas = document.getElementById("engineBackground");

if (canvas) {
const fireworks = new FireworksSystem(canvas);
fireworks.start();
}


// ===== DATOS NFT =====

const nfts = [

{ id:1, nombre:"Masivo Dragon Armor", img:"nfts/nft1.jpg", likes:99, views:2, downloads:2, shares:8, stars:0 },

{ id:2, nombre:"Neon Titan", img:"nfts/nft2.jpg", likes:0, views:1, downloads:0, shares:2, stars:0 },

{ id:3, nombre:"Cyber Samurai", img:"nfts/nft3.jpg", likes:99, views:15, downloads:10, shares:11, stars:0 },

{ id:4, nombre:"Galactic Knight", img:"nfts/nft4.jpg", likes:99, views:2, downloads:15, shares:5, stars:0 },

{ id:5, nombre:"Void Warrior", img:"nfts/nft5.jpg", likes:1, views:1, downloads:0, shares:0, stars:0 },

{ id:6, nombre:"Quantum Soldier", img:"nfts/nft6.jpg", likes:0, views:1, downloads:0, shares:0, stars:0 },

{ id:7, nombre:"Crimson Beast", img:"nfts/nft7.jpg", likes:1, views:2, downloads:10, shares:0, stars:0 },

{ id:8, nombre:"Neon Phantom", img:"nfts/nft8.jpg", likes:1, views:2, downloads:1, shares:1, stars:0 },

{ id:9, nombre:"Solar Champion", img:"nfts/nft9.jpg", likes:99, views:3, downloads:1, shares:2, stars:0 }

];


// ===== GENERAR NFTS =====

const grid = document.getElementById("gridNFT");

function crearNFT(nft){

const card = document.createElement("div");
card.className="nft";

card.innerHTML = `

<img src="${nft.img}" alt="${nft.nombre}" onclick="abrirNFT('${nft.img}')">

<div class="logros">
⭐ ${nft.stars}
</div>

<div class="stats">
❤️ ${nft.likes}
👁 ${nft.views}
⬇ ${nft.downloads}
🔗 ${nft.shares}
</div>

<div class="botones">

<button onclick="likeNFT(${nft.id})">❤️</button>

<button onclick="verNFT(${nft.id})">👁</button>

<button onclick="descargarNFT(${nft.id})">⬇</button>

<button onclick="compartirNFT(${nft.id})">🔗</button>

<button onclick="starNFT(${nft.id})">⭐</button>

</div>

`;

grid.appendChild(card);

}

nfts.forEach(crearNFT);


// ===== FUNCIONES =====

function likeNFT(id){

const nft = nfts.find(n=>n.id===id);
nft.likes++;

actualizar();

}

function verNFT(id){

const nft = nfts.find(n=>n.id===id);
nft.views++;

actualizar();

}

function descargarNFT(id){

const nft = nfts.find(n=>n.id===id);
nft.downloads++;

actualizar();

}

function compartirNFT(id){

const nft = nfts.find(n=>n.id===id);
nft.shares++;

actualizar();

}

function starNFT(id){

const nft = nfts.find(n=>n.id===id);
nft.stars++;

actualizar();

}


// ===== ACTUALIZAR =====

function actualizar(){

grid.innerHTML="";

nfts.forEach(crearNFT);

actualizarTop();

}


// ===== TOP MASIVO =====

function actualizarTop(){

let top = nfts.sort((a,b)=>{

const scoreA = a.likes + a.views + a.downloads + a.shares;
const scoreB = b.likes + b.views + b.downloads + b.shares;

return scoreB-scoreA;

})[0];

document.getElementById("topNombre").textContent = top.nombre;

}

actualizarTop();


// ===== MODAL NFT =====

function abrirNFT(img){

const modal = document.getElementById("nftModal");
const modalImg = document.getElementById("modalImg");

modal.style.display="flex";

modalImg.src=img;

}

function cerrarNFT(){

document.getElementById("nftModal").style.display="none";

}
