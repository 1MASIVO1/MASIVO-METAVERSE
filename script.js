console.log("MASIVO METAVERSE loaded");

const supabaseUrl = "https://rnkuxwsuztewgbdmjyxt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const cards = document.querySelectorAll(".nft-card");
const zoomViewer = document.getElementById("zoomViewer");
const zoomImg = document.getElementById("zoomImg");

cards.forEach(async card=>{

const id = card.dataset.id;

let { data } = await supabase
.from("nft_stats")
.select("*")
.eq("id",id)
.single();

if(!data){

await supabase.from("nft_stats").insert({id:id});

data={likes:0,views:0,downloads:0,shares:0};

}

updateUI(card,data);

card.querySelector(".nft").onclick=()=>{

zoomViewer.style.display="flex";
zoomImg.src=card.querySelector(".nft").src;

updateStat(id,"views");

};

card.querySelector(".like").onclick=()=>{

updateStat(id,"likes");

};

card.querySelector(".download").onclick=()=>{

updateStat(id,"downloads");

window.open(card.querySelector(".nft").src);

};

card.querySelector(".share").onclick=()=>{

updateStat(id,"shares");

navigator.share?.({
title:"MASIVO NFT",
url:location.href
});

};

});

async function updateStat(id,field){

let { data } = await supabase
.from("nft_stats")
.select("*")
.eq("id",id)
.single();

let value=data[field]+1;

await supabase
.from("nft_stats")
.update({[field]:value})
.eq("id",id);

location.reload();

}

function updateUI(card,data){

card.querySelector(".likes").textContent=data.likes;
card.querySelector(".views").textContent=data.views;
card.querySelector(".downloads").textContent=data.downloads;
card.querySelector(".shares").textContent=data.shares;

}

/* CHAT */

const chatBox=document.getElementById("chatBox");
const chatInput=document.getElementById("chatInput");

document.getElementById("sendChat").onclick=async()=>{

const msg=chatInput.value;

await supabase.from("chat_messages").insert({

user_name:"user",
message:msg

});

chatInput.value="";

loadChat();

};

async function loadChat(){

let { data } = await supabase
.from("chat_messages")
.select("*")
.order("created_at",{ascending:true});

chatBox.innerHTML="";

data.forEach(m=>{

chatBox.innerHTML+=`<p><b>${m.user_name}</b>: ${m.message}</p>`;

});

}

setInterval(loadChat,2000);
