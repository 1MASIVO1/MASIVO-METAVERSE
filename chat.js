import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient(
https://rnkuxwsuztewgbdmjyxt.supabase.co
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4
)

async function enviarMensaje(){

const texto=document.getElementById("mensaje").value

await supabase.from("global_chat").insert([
{ message:texto }
])

}

document.getElementById("enviar").onclick=enviarMensaje
