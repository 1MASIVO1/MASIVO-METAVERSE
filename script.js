```javascript
const supabase = window.supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4"
);

const grid = document.getElementById("nft-grid");

const MAX_NFTS = 1000;

async function loadNFTs() {

const { data } = await supabase
.from("nfts")
.select("*");

let db = {};

data.forEach(nft=>{
db[nft.name] = nft;
});

for(let i=1;i<=MAX_NFTS;i++){

const name = "nft"+i+".png";

if(!db[name]){

await supabase.from("nfts").insert({
name:name,
likes:0,
views:0
});

db[name] = {name,likes:0,views:0};

}

createNFT(name,db[name]);

}

}

function createNFT(name,data){

const card = document.createElement("div");
card.className="nft-card";

card.innerHTML = `
<img src="nfts/${name}" class="nft-img">

<div class="nft-info">

<div>❤️ <span id="like-${name}">${data.likes}</span></div>

<div>👁 <span id="view-${name}">${data.views}</span></div>

<button onclick="likeNFT('${name}')">Like</button>

<button onclick="downloadNFT('${name}')">Download</button>

</div>
`;

card.querySelector(".nft-img").onclick=()=>openNFT(name);

grid.appendChild(card);

}

async function likeNFT(name){

let { data } = await supabase
.from("nfts")
.select("*")
.eq("name",name)
.single();

let newLikes = data.likes + 1;

await supabase
.from("nfts")
.update({likes:newLikes})
.eq("name",name);

document.getElementById("like-"+name).innerText=newLikes;

}

async function openNFT(name){

let { data } = await supabase
.from("nfts")
.select("*")
.eq("name",name)
.single();

let newViews = data.views + 1;

await supabase
.from("nfts")
.update({views:newViews})
.eq("name",name);

document.getElementById("view-"+name).innerText=newViews;

window.open("nfts/"+name,"_blank");

}

function downloadNFT(name){

const link = document.createElement("a");

link.href="nfts/"+name;
link.download=name;

link.click();

}

loadNFTs();
```
