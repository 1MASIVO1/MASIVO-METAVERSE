import * as THREE from "https://cdn.skypack.dev/three@0.150.1";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);

renderer.domElement.style.position="fixed";
renderer.domElement.style.top="0";
renderer.domElement.style.left="0";
renderer.domElement.style.zIndex="-1";

document.body.appendChild(renderer.domElement);

camera.position.z = 80;


/* LUCES */

const light = new THREE.PointLight(0x00ffff,2,500);
light.position.set(0,50,50);
scene.add(light);


/* EDIFICIOS */

const buildings=[];

for(let i=0;i<200;i++){

const height = Math.random()*60+10;

const geo = new THREE.BoxGeometry(6,height,6);

const mat = new THREE.MeshStandardMaterial({
color:0x0a1c3a,
emissive:0x001133
});

const mesh = new THREE.Mesh(geo,mat);

mesh.position.x = (Math.random()-0.5)*200;
mesh.position.z = (Math.random()-0.5)*200;
mesh.position.y = height/2;

scene.add(mesh);

buildings.push(mesh);

}


/* PARTICULAS */

const starGeo = new THREE.BufferGeometry();
const starCount = 2000;

const positions = new Float32Array(starCount*3);

for(let i=0;i<starCount*3;i++){
positions[i]=(Math.random()-0.5)*600;
}

starGeo.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
);

const starMat = new THREE.PointsMaterial({
color:0x00ffff,
size:0.7
});

const stars = new THREE.Points(starGeo,starMat);
scene.add(stars);


/* ANIMACION */

function animate(){

requestAnimationFrame(animate);

stars.rotation.y += 0.0005;

buildings.forEach(b=>{
b.material.emissiveIntensity =
0.5 + Math.sin(Date.now()*0.002 + b.position.x)*0.5;
});

renderer.render(scene,camera);

}

animate();


window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
