import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient(
"TU_SUPABASE_URL",
"TU_SUPABASE_KEY"
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
