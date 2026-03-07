console.log("MASIVO METAVERSE loaded");

const nfts = document.querySelectorAll(".nft");
const zoomViewer = document.getElementById("zoomViewer");
const zoomImg = document.getElementById("zoomImg");
const nftCount = document.getElementById("nftCount");

/* CONTADOR */

nftCount.textContent = nfts.length;

/* ZOOM NFT */

nfts.forEach(nft =>{

nft.addEventListener("click",()=>{

zoomViewer.style.display="flex";
zoomImg.src=nft.src;

});

});

/* CERRAR ZOOM */

zoomViewer.addEventListener("click",()=>{

zoomViewer.style.display="none";

});
