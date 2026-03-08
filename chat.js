async function enviarMensaje(){

let input=document.getElementById("chatInput")

let texto=input.value

await supabase

.from("chat")

.insert({mensaje:texto})

input.value=""

}

async function cargarChat(){

const {data}=await supabase

.from("chat")

.select("*")

const div=document.getElementById("mensajes")

div.innerHTML=""

data.forEach(m=>{

div.innerHTML+=`<div>${m.mensaje}</div>`

})

}

setInterval(cargarChat,2000)
