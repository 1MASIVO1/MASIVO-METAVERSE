// background.js - Fondo animado profesional estilo videojuegos

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Manejo de resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Capas del fondo
const layers = {
    sky: { speed: 0.1, objects: [] },
    clouds: { speed: 0.3, objects: [] },
    mountains: { speed: 0.5, objects: [] },
    city: { speed: 0.7, objects: [] },
    particles: { speed: 1, objects: [] },
    creatures: { speed: 0.9, objects: [] },
};

// Generador de colores dinámicos para cielo
function randomSkyColor() {
    const r = 20 + Math.random() * 50;
    const g = 30 + Math.random() * 80;
    const b = 60 + Math.random() * 100;
    return `rgb(${r},${g},${b})`;
}

// Crear cielo con gradiente
function drawSky() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, randomSkyColor());
    gradient.addColorStop(1, 'rgb(10,10,40)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Generar montañas
function createMountains() {
    const mountainCount = 5;
    for (let i = 0; i < mountainCount; i++) {
        layers.mountains.objects.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 150 - Math.random() * 100,
            width: 200 + Math.random() * 400,
            height: 100 + Math.random() * 150,
            color: `rgb(${30 + i * 20},${30 + i * 20},${40 + i * 20})`
        });
    }
}

// Dibujar montañas
function drawMountains() {
    layers.mountains.objects.forEach(m => {
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.moveTo(m.x, canvas.height);
        ctx.lineTo(m.x + m.width / 2, m.y);
        ctx.lineTo(m.x + m.width, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Movimiento parallax
        m.x -= layers.mountains.speed * 0.5;
        if (m.x + m.width < 0) m.x = canvas.width;
    });
}

// Generar nubes
function createClouds() {
    for (let i = 0; i < 10; i++) {
        layers.clouds.objects.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            radius: 50 + Math.random() * 100,
            speed: 0.2 + Math.random() * 0.3
        });
    }
}

// Dibujar nubes
function drawClouds() {
    layers.clouds.objects.forEach(c => {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();

        c.x -= c.speed;
        if (c.x + c.radius < 0) c.x = canvas.width + c.radius;
    });
}

// Crear partículas mágicas / chispas
function createParticles() {
    for (let i = 0; i < 150; i++) {
        layers.particles.objects.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            radius: 1 + Math.random() * 3,
            color: `rgba(255,${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.8)`
        });
    }
}

// Dibujar partículas
function drawParticles() {
    layers.particles.objects.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // Reaparecen al salir
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });
}

// Crear ciudad futurista
function createCity() {
    for (let i = 0; i < 20; i++) {
        layers.city.objects.push({
            x: i * 80,
            y: canvas.height - 100 - Math.random() * 50,
            width: 50,
            height: 50 + Math.random() * 150,
            color: `rgb(${50 + Math.random()*100},${50 + Math.random()*100},255)`
        });
    }
}

// Dibujar ciudad
function drawCity() {
    layers.city.objects.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);

        b.x -= layers.city.speed;
        if (b.x + b.width < 0) b.x = canvas.width;
    });
}

// Crear criaturas genéricas
function createCreatures() {
    for (let i = 0; i < 5; i++) {
        layers.creatures.objects.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 100 - Math.random() * 200,
            size: 30 + Math.random() * 40,
            speed: 0.5 + Math.random() * 1,
            color: `rgba(${Math.random()*255},0,${Math.random()*255},0.8)`
        });
    }
}

// Dibujar criaturas
function drawCreatures() {
    layers.creatures.objects.forEach(c => {
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x + c.size / 2, c.y + c.size);
        ctx.lineTo(c.x - c.size / 2, c.y + c.size);
        ctx.closePath();
        ctx.fill();

        c.x -= c.speed;
        if (c.x + c.size < 0) c.x = canvas.width + c.size;
    });
}

// Inicializar todo
function init() {
    createMountains();
    createClouds();
    createParticles();
    createCity();
    createCreatures();
}

// Loop principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSky();
    drawMountains();
    drawClouds();
    drawCity();
    drawParticles();
    drawCreatures();
    requestAnimationFrame(animate);
}

// Ejecutar
init();
animate();
