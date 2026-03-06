const container = document.getElementById("nft-container")

function loadNFTs(){

for(let i=1;i<=9;i++){

const card=document.createElement("div")
card.className="nft-card"

card.innerHTML=`

<img src="images/nft${i}.png">

<h3>MASIVO NFT #${i}</h3>

<button class="btn">LIKE</button>
<button class="btn">DOWNLOAD</button>

`

container.appendChild(card)

}

}

loadNFTs()
