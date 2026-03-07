// TODO TU CODIGO ORIGINAL COMPLETO (igual que antes)

/* CHAT MUNDIAL */

async function enviarChat(){

let mensaje=document.getElementById("chatInput").value

await supabase.from("chat").insert({
msg:mensaje
})

document.getElementById("chatInput").value=""

cargarChat()

}

async function cargarChat(){

let {data}=await supabase.from("chat").select("*").order("id",{ascending:true})

let box=document.getElementById("chatBox")

box.innerHTML=""

data.forEach(m=>{
box.innerHTML+=`<div>${m.msg}</div>`
})

}

setInterval(cargarChat,3000)

/* RANKING */

async function cargarRanking(){

let {data}=await supabase.from("stats").select("*")

let ranking=document.getElementById("ranking")

ranking.innerHTML="Total eventos: "+data.length

}

setInterval(cargarRanking,4000)
