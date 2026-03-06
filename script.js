const nfts = document.querySelectorAll(".nft");

nfts.forEach((nft,index)=>{

const img = nft.querySelector("img");
const likeBtn = nft.querySelector(".like");
const likeCount = likeBtn.querySelector("span");
const views = nft.querySelector(".views");

let likes = 0;
let viewCount = 0;

img.onclick = ()=>{

nft.classList.toggle("pop");

viewCount++;
views.innerHTML="👁 "+viewCount;

}

likeBtn.onclick = ()=>{

likes++;

likeCount.innerText = likes;

if(likes >= 5){
nft.classList.add("legendary");
}

}

nft.querySelector(".download").onclick = ()=>{

const a=document.createElement("a");
a.href=img.src;
a.download="masivo-nft.png";
a.click();

}

nft.querySelector(".share").onclick = ()=>{

navigator.clipboard.writeText(img.src);
alert("Link copied");

}

});
