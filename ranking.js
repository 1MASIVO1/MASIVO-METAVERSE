import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient(
https://rnkuxwsuztewgbdmjyxt.supabase.co
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3V4d3N1enRld2diZG1qeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODU4MjQsImV4cCI6MjA4NzU2MTgyNH0.mwGzWUk6xOry9BcwqwRnXGFfGMwoetg6D2pxAz7_eN4
)

async function cargarRankingLikes(){

const { data } = await supabase
.from("nft_stats")
.select("*")
.order("likes",{ascending:false})
.limit(10)

const contenedor=document.getElementById("ranking-likes")

contenedor.innerHTML=""

data.forEach(nft=>{

const div=document.createElement("div")

div.innerHTML="NFT "+nft.id+" ❤️ "+nft.likes

contenedor.appendChild(div)

})

}

cargarRankingLikes()
