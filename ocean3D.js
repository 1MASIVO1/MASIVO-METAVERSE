// ocean3D.js
const canvas = document.getElementById('engineBackground');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x001a33, 0.002);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 30);

// Luces
scene.add(new THREE.AmbientLight(0xffffff,0.6));
const dirLight = new THREE.DirectionalLight(0xffffff,1);
dirLight.position.set(20,30,10);
scene.add(dirLight);

// Animaciones
const animateObjects = [];

// --- CARGAR MODELOS 3D ---
const loader = new THREE.GLTFLoader();

// Ballenas
loader.load('models/ballena.glb', gltf => {
    const whale = gltf.scene;
    whale.scale.set(0.05,0.05,0.05);
    whale.position.set(0,5,0);
    scene.add(whale);
    animateObjects.push({mesh: whale, speed:0.01});
});

// Tiburones
loader.load('models/tiburon.glb', gltf => {
    const shark = gltf.scene;
    shark.scale.set(0.05,0.05,0.05);
    shark.position.set(-10,3,5);
    scene.add(shark);
    animateObjects.push({mesh: shark, speed:0.02});
});

// Peces simples
loader.load('models/pez.glb', gltf => {
    for(let i=0;i<20;i++){
        const fish = gltf.scene.clone();
        fish.scale.set(0.01,0.01,0.01);
        fish.position.set(Math.random()*50-25,Math.random()*10,Math.random()*50-25);
        scene.add(fish);
        animateObjects.push({mesh: fish, speed:0.03 + Math.random()*0.02});
    }
});

// --- ANIMACIÓN ---
function animate(){
    requestAnimationFrame(animate);
    animateObjects.forEach(obj=>{
        obj.mesh.position.x += Math.sin(Date.now()*obj.speed)*0.05;
        obj.mesh.position.z += Math.cos(Date.now()*obj.speed)*0.05;
        obj.mesh.rotation.y += 0.001 + obj.speed*0.05;
    });
    renderer.render(scene, camera);
}
animate();

// --- RESPONSIVE ---
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
