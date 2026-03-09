// background.js - fondo videojuego AAA en canvas existente

const canvas = document.getElementById('engineBackground');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0a0a1a);
renderer.shadowMap.enabled = true;

// --- ESCENA ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0a1a, 0.02);

// --- CÁMARA ---
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

// --- ILUMINACIÓN AAA ---
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1.2);
directional.position.set(15,20,10);
scene.add(directional);

// --- SUELO ---
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100),
    new THREE.MeshStandardMaterial({ color:0x101020 })
);
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

// --- MUÑECOS ANIMADOS (simulación) ---
const characters = [];
const charGeom = new THREE.BoxGeometry(1,2,1);
const charMat = new THREE.MeshStandardMaterial({ color:0x00ffff, metalness:0.5, roughness:0.3 });

for(let i=0;i<6;i++){
    const char = new THREE.Mesh(charGeom, charMat);
    char.position.set((Math.random()-0.5)*20,1,(Math.random()-0.5)*20);
    char.castShadow = true;
    scene.add(char);
    characters.push({ mesh: char, speed: 0.01+Math.random()*0.02 });
}

// --- CRISTALES FLOTANTES ---
const crystals = [];
const crystalGeom = new THREE.OctahedronGeometry(0.5);
const crystalMat = new THREE.MeshStandardMaterial({ color:0xff00ff, emissive:0xff00ff, emissiveIntensity:0.6 });

for(let i=0;i<10;i++){
    const c = new THREE.Mesh(crystalGeom, crystalMat);
    c.position.set((Math.random()-0.5)*20,1+Math.random()*6,(Math.random()-0.5)*20);
    scene.add(c);
    crystals.push({ mesh: c, speed: 0.005+Math.random()*0.01 });
}

// --- PARTICULAS ---
const particles = [];
const pGeom = new THREE.SphereGeometry(0.05,8,8);
const pMat = new THREE.MeshBasicMaterial({ color:0xffaa00, transparent:true, opacity:0.6 });

for(let i=0;i<80;i++){
    const p = new THREE.Mesh(pGeom, pMat.clone());
    p.position.set((Math.random()-0.5)*30, Math.random()*10+1, (Math.random()-0.5)*30);
    scene.add(p);
    particles.push(p);
}

// --- ANIMACIÓN ---
function animate(){
    requestAnimationFrame(animate);

    // Muñecos
    characters.forEach(c=>{
        c.mesh.position.x += Math.sin(Date.now()*c.speed)*0.02;
        c.mesh.position.z += Math.cos(Date.now()*c.speed)*0.02;
        c.mesh.rotation.y += 0.005;
        c.mesh.position.y = 1 + Math.sin(Date.now()*0.002+c.speed)*0.3; // flotación
    });

    // Cristales flotantes
    crystals.forEach(c=>{
        c.mesh.position.y += Math.sin(Date.now()*c.speed)*0.01;
        c.mesh.rotation.y += 0.01;
    });

    // Partículas
    particles.forEach(p=>{
        p.position.y += Math.sin(Date.now()*0.001)*0.02;
        if(p.position.y>12) p.position.y=1;
    });

    // Cámara movimiento sutil
    camera.position.x = Math.sin(Date.now()*0.0005)*5;
    camera.position.z = 15 + Math.cos(Date.now()*0.0003)*5;
    camera.lookAt(0,0,0);

    renderer.render(scene,camera);
}
animate();

// --- RESPONSIVE ---
window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
