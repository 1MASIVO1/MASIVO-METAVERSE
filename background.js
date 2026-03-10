// background.js
const canvas2 = document.getElementById('engineBackground');
const ctx = canvas2.getContext('2d');
const bubbles = [];
for(let i=0;i<50;i++) bubbles.push({x:Math.random()*canvas2.width,y:Math.random()*canvas2.height,r:Math.random()*3+2,dy:Math.random()*1.5+0.5});
function animateBubbles(){
    ctx.clearRect(0,0,canvas2.width,canvas2.height);
    bubbles.forEach(b=>{
        ctx.beginPath();
        ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.6)';
        ctx.fill();
        b.y-=b.dy;
        if(b.y<0)b.y=canvas2.height;
    });
    requestAnimationFrame(animateBubbles);
}
animateBubbles();
