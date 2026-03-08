import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient(
"TU_SUPABASE_URL",
"TU_SUPABASE_KEY"
)

async function enviarMensaje(){

const texto=document.getElementById("mensaje").value

await supabase.from("global_chat").insert([
{ message:texto }
])

}

document.getElementById("enviar").onclick=enviarMensaje
