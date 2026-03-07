const likes = document.querySelectorAll(".like")

likes.forEach((btn)=>{

btn.onclick = ()=>{

let count = btn.nextElementSibling

count.innerText = parseInt(count.innerText)+1

}

})
