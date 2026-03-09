// background.js - fondo animado 3D en toda la página

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// --- SETUP ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0a1a, 0.02);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0a0a1a);
renderer.shadowMap.enabled = true;
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.appendChild(renderer.domElement);

// --- LUZ ---
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff,0.4));

// --- SUELO ---
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100),
    new THREE.MeshStandardMaterial({color:0x101020})
);
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

// --- MUÑECOS ---
const characters = [];
const geom = new THREE.BoxGeometry(1,2,1);
const mat = new THREE.MeshStandardMaterial({color:0x00ffff});
for(let i=0;i<5;i++){
    const mesh = new THREE.Mesh(geom,mat);
    mesh.position.set((Math.random()-0.5)*20,1,(Math.random()-0.5)*20);
    mesh.castShadow = true;
    scene.add(mesh);
    characters.push({mesh, speed:0.01+Math.random()*0.02});
}

// --- PARTICULAS ---
const particles = [];
const pGeom = new THREE.SphereGeometry(0.05,8,8);
for(let i=0;i<50;i++){
    const p = new THREE.Mesh(pGeom,new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.7}));
    p.position.set((Math.random()-0.5)*30,Math.random()*10+1,(Math.random()-0.5)*30);
    scene.add(p);
    particles.push(p);
}

// --- ANIMATE ---
function animate(){
    requestAnimationFrame(animate);
    characters.forEach(c=>{
        c.mesh.position.x += Math.sin(Date.now()*c.speed)*0.02;
        c.mesh.position.z += Math.cos(Date.now()*c.speed)*0.02;
        c.mesh.rotation.y += 0.005;
    });
    particles.forEach(p=>{
        p.position.y += Math.sin(Date.now()*0.001)*0.01;
        if(p.position.y>12) p.position.y=1;
    });
    renderer.render(scene,camera);
}
animate();

// --- RESPONSIVE ---
window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
