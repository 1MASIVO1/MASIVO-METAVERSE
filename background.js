const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

let particles = [];

for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawCity() {

    const gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,"#00c6ff");
    gradient.addColorStop(1,"#002a4d");

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<50;i++){
        let x = i * 80;
        let h = Math.random()*200 + 100;

        ctx.fillStyle = "rgba(20,40,90,0.8)";
        ctx.fillRect(x, canvas.height-h, 60, h);
    }
}

function drawParticles() {

    ctx.fillStyle = "#00ffff";

    particles.forEach(p => {

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fill();

        p.y -= p.speed;

        if(p.y < 0){
            p.y = canvas.height;
            p.x = Math.random()*canvas.width;
        }
    });

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawCity();
    drawParticles();

    requestAnimationFrame(animate);
}

animate();
