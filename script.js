const supabaseClient = supabase.createClient(
"https://rnkuxwsuztewgbdmjyxt.supabase.co",
"public-anon-key"
)

/* LIKE */

async function like(btn){

let nft=btn.closest(".nft")
let span=nft.querySelector(".likes")

let valor=parseInt(span.innerText.replace(/\D/g,''))+1

span.innerText="❤️ "+valor

await supabaseClient.from("stats").insert({
nft_id:nft.dataset.id,
tipo:"like"
})

}

/* VISTA */

async function vista(btn){

let nft=btn.closest(".nft")
let span=nft.querySelector(".views")

let valor=parseInt(span.innerText.replace(/\D/g,''))+1

span.innerText="👁 "+valor

await supabaseClient.from("stats").insert({
nft_id:nft.dataset.id,
tipo:"view"
})

}

/* DESCARGAR */

async function descargar(btn){

let nft=btn.closest(".nft")
let span=nft.querySelector(".downloads")

let valor=parseInt(span.innerText.replace(/\D/g,''))+1

span.innerText="⬇ "+valor

await supabaseClient.from("stats").insert({
nft_id:nft.dataset.id,
tipo:"download"
})

}

/* SHARE */

async function share(btn){

let nft=btn.closest(".nft")
let span=nft.querySelector(".shares")

let valor=parseInt(span.innerText.replace(/\D/g,''))+1

span.innerText="🔗 "+valor

await supabaseClient.from("stats").insert({
nft_id:nft.dataset.id,
tipo:"share"
})

}

/* RANKING */

async function ordenarNFT(){

let {data}=await supabaseClient.from("stats").select("*")

let likes=data.filter(x=>x.tipo==="like").length

let grid=document.querySelector(".grid")

let items=[...document.querySelectorAll(".nft")]

items.sort(()=>Math.random()-0.5 + likes)

items.forEach(el=>grid.appendChild(el))

}

setInterval(ordenarNFT,5000)
