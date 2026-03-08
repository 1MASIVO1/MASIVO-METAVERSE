const gallery = document.getElementById("nft-gallery")

const totalNFT = 1000

for(let i=1;i<=totalNFT;i++){

const nft=document.createElement("div")
nft.className="nft"

const img=document.createElement("img")

img.src=`https://raw.githubusercontent.com/1MASIVO1/MASIVO-METAVERSE/main/images/${i}.png`

img.onerror=()=>nft.remove()

nft.appendChild(img)

gallery.appendChild(nft)

}
