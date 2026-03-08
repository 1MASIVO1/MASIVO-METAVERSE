async function cargarRanking(){

const {data}=await supabase

.from("stats")

.select("*")

.order("likes",{ascending:false})

.limit(10)

const div=document.getElementById("rankingLikes")

div.innerHTML=""

data.forEach(n=>{

div.innerHTML+=`NFT ${n.nft_id} ❤️ ${n.likes}`

})

}

cargarRanking()
