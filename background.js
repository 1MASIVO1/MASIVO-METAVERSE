const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
img.src = "ciudad.png"; // tu imagen

let particles = [];

for(let i=0;i<200;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
speed:Math.random()*0.5+0.2
});
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.drawImage(img,0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ffff";

particles.forEach(p=>{
ctx.fillRect(p.x,p.y,2,2);
p.y-=p.speed;

if(p.y<0){
p.y=canvas.height;
}
});

requestAnimationFrame(animate);
}

img.onload=animate;
