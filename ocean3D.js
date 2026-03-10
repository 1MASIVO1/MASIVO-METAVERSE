// ocean3D.js - Fondo submarino 3D estilizado tipo videojuego
const canvas = document.getElementById('engineBackground');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x001a33, 0.002);

// Cámara
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 2000);
camera.position.set(0, 10, 50);

// Luces
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(30, 50, 30);
scene.add(dirLight);

// --- ELEMENTOS 3D ---
const animateObjects = [];

// Ballenas estilizadas
for(let i=0;i<2;i++){
    const whaleGeo = new THREE.CapsuleGeometry(5,15,4,8);
    const whaleMat = new THREE.MeshStandardMaterial({ color: 0x2255ff, flatShading: true });
    const whale = new THREE.Mesh(whaleGeo, whaleMat);
    whale.position.set(Math.random()*40-20, 5+Math.random()*10, Math.random()*40-20);
    scene.add(whale);
    animateObjects.push({mesh: whale, speed:0.01, type:'whale'});
}

// Tiburones estilizados
for(let i=0;i<3;i++){
    const sharkGeo = new THREE.ConeGeometry(3,10,6);
    const sharkMat = new THREE.MeshStandardMaterial({ color: 0x444444, flatShading:true });
    const shark = new THREE.Mesh(sharkGeo, sharkMat);
    shark.rotation.x = Math.PI/2;
    shark.position.set(Math.random()*40-20, 3+Math.random()*5, Math.random()*40-20);
    scene.add(shark);
    animateObjects.push({mesh: shark, speed:0.015, type:'shark'});
}

// Peces geométricos
for(let i=0;i<30;i++){
    const fishGeo = new THREE.ConeGeometry(1,3,6);
    const fishMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(`hsl(${Math.random()*360},80%,60%)`), flatShading:true });
    const fish = new THREE.Mesh(fishGeo, fishMat);
    fish.rotation.x = Math.PI/2;
    fish.position.set(Math.random()*50-25, Math.random()*15, Math.random()*50-25);
    scene.add(fish);
    animateObjects.push({mesh: fish, speed:0.02 + Math.random()*0.01, type:'fish'});
}

// Corales
for(let i=0;i<15;i++){
    const coralGeo = new THREE.CylinderGeometry(0.5, 1, Math.random()*5+3, 6);
    const coralMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(`hsl(${Math.random()*360},70%,50%)`), flatShading:true });
    const coral = new THREE.Mesh(coralGeo, coralMat);
    coral.position.set(Math.random()*60-30, 0, Math.random()*60-30);
    scene.add(coral);
}

// Burbujas
const bubbleGeo = new THREE.SphereGeometry(0.3, 8, 8);
const bubbleMat = new THREE.MeshStandardMaterial({ color:0xffffff, transparent:true, opacity:0.6 });
const bubbles = [];
for(let i=0;i<50;i++){
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat.clone());
    bubble.position.set(Math.random()*50-25, Math.random()*20, Math.random()*50-25);
    bubble.scale.setScalar(Math.random()*0.5+0.2);
    scene.add(bubble);
    bubbles.push({mesh:bubble, speed:0.01+Math.random()*0.02});
}

// --- ANIMACIÓN ---
function animate(){
    requestAnimationFrame(animate);

    // Animación de animales
    animateObjects.forEach(obj=>{
        obj.mesh.position.x += Math.sin(Date.now()*obj.speed)*0.05;
        obj.mesh.position.z += Math.cos(Date.now()*obj.speed)*0.05;
        obj.mesh.rotation.y += 0.002 + obj.speed*0.05;
    });

    // Animación de burbujas
    bubbles.forEach(b=>{
        b.mesh.position.y += b.speed;
        if(b.mesh.position.y>20) b.mesh.position.y=0;
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
