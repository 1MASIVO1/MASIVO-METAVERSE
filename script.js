const supabaseUrl = "https://rnkuxwsuztewgbdmjyxt.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4";

const client = supabase.createClient(supabaseUrl,supabaseKey);

const container=document.getElementById("nftContainer");

const NFTs=[
"1.png",
"2.png",
"3.png",
"4.png",
"5.png",
"6.png",
"7.png",
"8.png",
"9.png"
];

NFTs.forEach(nft=>{

const card=document.createElement("div");
card.className="nft";

card.innerHTML=`

<img src="imagenes/${nft}">

<div class="botones">

<button onclick="likeNFT('${nft}')">❤️</button>

<button onclick="viewNFT('${nft}')">👁️</button>

<button onclick="downloadNFT('${nft}')">⬇️</button>

<button onclick="shareNFT('${nft}')">🔗</button>

</div>

`;

container.appendChild(card);

});

async function likeNFT(id){
await client.from("nfts").update({likes:1}).eq("id",id);
}

async function viewNFT(id){
await client.from("nfts").update({views:1}).eq("id",id);
}

async function downloadNFT(id){
window.open("imagenes/"+id);
await client.from("nfts").update({downloads:1}).eq("id",id);
}

async function shareNFT(id){

const url=window.location.href+"#"+id;

navigator.clipboard.writeText(url);

await client.from("nfts").update({shares:1}).eq("id",id);

alert("Link copiado");

}
