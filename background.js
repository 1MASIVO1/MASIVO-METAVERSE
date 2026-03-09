// background.js - Fondo animado 3D para página, sin imports, funciona en GitHub Pages

// --- ESCENA Y CÁMARA ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0a1a, 0.02);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 5, 15);

// --- RENDERER ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0a0a1a);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.appendChild(renderer.domElement);

// --- LUCES ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// --- SUELO ---
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x101020 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// --- MUÑECOS ANIMADOS ---
const characters = [];
const characterGeometry = new THREE.BoxGeometry(1, 2, 1);
const characterMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });

for (let i = 0; i < 5; i++) {
    const char = new THREE.Mesh(characterGeometry, characterMaterial);
    char.position.set((Math.random() - 0.5) * 20, 1, (Math.random() - 0.5) * 20);
    char.castShadow = true;
    scene.add(char);
    characters.push({ mesh: char, speed: 0.01 + Math.random() * 0.02 });
}

// --- PARTICULAS ---
const particles = [];
const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);

for (let i = 0; i < 50; i++) {
    const p = new THREE.Mesh(
        particleGeometry,
        new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.7 })
    );
    p.position.set((Math.random() - 0.5) * 30, Math.random() * 10 + 1, (Math.random() - 0.5) * 30);
    scene.add(p);
    particles.push(p);
}

// --- ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);

    // Animar muñecos
    characters.forEach(c => {
        c.mesh.position.x += Math.sin(Date.now() * c.speed) * 0.02;
        c.mesh.position.z += Math.cos(Date.now() * c.speed) * 0.02;
        c.mesh.rotation.y += 0.005;
    });

    // Animar partículas
    particles.forEach(p => {
        p.position.y += Math.sin(Date.now() * 0.001) * 0.01;
        if (p.position.y > 12) p.position.y = 1;
    });

    renderer.render(scene, camera);
}

animate();

// --- RESPONSIVE ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
