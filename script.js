const container = document.getElementById("nftContainer")

const nfts = [
"nft1.png",
"nft2.png",
"nft3.png",
"nft4.png",
"nft5.png",
"nft6.png",
"nft7.png",
"nft8.png"
]

nfts.forEach(nft => {

const card = document.createElement("div")
card.className = "nft-card"

const img = document.createElement("img")
img.src = "./images/" + nft

const info = document.createElement("div")
info.className = "nft-info"

const title = document.createElement("h3")
title.innerText = nft.replace(".png","")

const buttons = document.createElement("div")
buttons.className = "buttons"

const likeBtn = document.createElement("button")
likeBtn.innerText = "❤️ Like"

const viewBtn = document.createElement("button")
viewBtn.innerText = "👁 View"

const downloadBtn = document.createElement("button")
downloadBtn.innerText = "⬇ Download"

buttons.appendChild(likeBtn)
buttons.appendChild(viewBtn)
buttons.appendChild(downloadBtn)

info.appendChild(title)
info.appendChild(buttons)

card.appendChild(img)
card.appendChild(info)

container.appendChild(card)

viewBtn.onclick = () => {
window.open("./images/" + nft)
}

downloadBtn.onclick = () => {
const link = document.createElement("a")
link.href = "./images/" + nft
link.download = nft
link.click()
}

likeBtn.onclick = () => {
likeBtn.innerText = "❤️ Liked"
}

})
