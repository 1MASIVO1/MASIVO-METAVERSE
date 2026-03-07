/* TODO TU CODIGO ORIGINAL */

/* RANKING REAL */

async function ordenarNFT(){

let {data}=await supabase.from("stats").select("*")

let likes=data.filter(x=>x.tipo==="like").length

let grid=document.querySelector(".grid")

let items=[...document.querySelectorAll(".nft")]

items.sort(()=>Math.random()-0.5 + likes)

items.forEach(el=>grid.appendChild(el))

}

setInterval(ordenarNFT,5000)
