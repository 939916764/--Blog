<template>
  <div ref="dom" />
</template>
<script setup>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import TWEEN from "@tweenjs/tween.js";
import { onMounted, ref, onUnmounted } from "vue";
const dom = ref(null);

const mouseV = ref(0);
const mouseK = ref(0);
const moveHeight = ref(0);
const ccc = ref(false);
let sWidth = window.innerWidth,
  sHeight = window.innerHeight,
  bgModel = [],
  bkboxlist = [];
// 屏幕高度
let height = window.screen.availHeight;
// 场景
const scene = new THREE.Scene();
// 坐标轴
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);
// 光源
const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

// 点光源
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 40, 30);
scene.add(pointLight);
// 透视相机
const camera = new THREE.PerspectiveCamera(50, sWidth / sHeight, 0.1, 1800);
camera.position.set(0, 100, 100);
camera.lookAt(0, 0, 0);
const camera2 = new THREE.PerspectiveCamera(60, 1, 1, 1000);

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sWidth, sHeight);

const manager = new THREE.LoadingManager();
const objLoader = new OBJLoader(manager);
// 材质
const material = new THREE.PointsMaterial({
  size: 1,
  // false:粒子尺寸相同 ;true：取决于摄像头远近
  sizeAttenuation: true,
  transparent: true,
  opacity: 1,
  color: 0x00ffff,
})

// 盒子
const cubeGeometry = new THREE.BoxGeometry(40, 40, 40, 14, 14, 14);
const cube = new THREE.Mesh(cubeGeometry, material);

// 球
const ballGeometry = new THREE.SphereGeometry(30, 40, 32);
const ball = new THREE.Mesh(ballGeometry, material);

// // points
const points = new THREE.Points(
  ballGeometry,
  material
);
points.scale.x = 1.5;
points.scale.y = 1.5;
points.scale.z = 1.5;
points.position.set(50, 0, 0);
// scene.add(ball);
scene.add(points)

const _initBase = () => {
  for (let i = 0; i < 2000; i++) {
    objLoader.load("/three/gj.obj", (geometry) => {
      geometry.traverse((child) => {
        geometry.position.x = (Math.random() * 2 - 1) * 120;
        geometry.position.y = (Math.random() * 2 - 1) * 120;
        geometry.position.z = (Math.random() * 2 - 1) * 120;
        geometry.rotation.x = Math.random() * 1;
        geometry.rotation.y = Math.random() * 1;
        if (child.isMesh) {
          let csclep = 0.1;
          child.geometry.scale(csclep, csclep, csclep);
          child.material.color = new THREE.Color(getCol());
          const mesh = new THREE.Mesh(child.geometry, child.material);
          // bkboxlist.push(mesh);
        }
      });
    });
  }
  // 背景方框
  for (let i = 0; i < 200; i++) {
    objLoader.load("/three/gj.obj", (geometry) => {
      geometry.traverse((child) => {
        geometry.position.x = (Math.random() * 2 - 1) * 120;
        geometry.position.y = (Math.random() * 2 - 1) * 120;
        geometry.position.z = (Math.random() * 2 - 1) * 120;
        geometry.rotation.x = Math.random() * 2 * Math.PI;
        geometry.rotation.y = Math.random() * 2 * Math.PI;
        if (child.isMesh) {
          let csclep = 0.1;
          child.geometry.scale(csclep, csclep, csclep);
          child.material.color = new THREE.Color(getCol());
          bgModel.push(child);
        }
      });
      scene.add(geometry);
    });
  }

  //  随机点
  dom.value.appendChild(renderer.domElement);
  // 监听屏幕分辨率
  window.addEventListener("mousemove", debounce(mousemove, 0.5));
  window.addEventListener("resize", debounce(onWindowResize, 0.5));
  window.addEventListener("wheel", debounce(handleScroll, 10));
  render();
};


const initpointsMeshAnimate = (startMesh, targetMesh, scrollTop) => {
  // 源模型的顶点\
  let originVertices = getPoint(startMesh.geometry);

  // 目标模型的顶点
  const targetVerticesArr = getPoint(targetMesh.geometry)
  console.log(targetVerticesArr)
  // 遍历每一个粒子
  originVertices.forEach((v, i, vertices) => {
    let aa = new TWEEN.Tween({
      x: vertices[i].x,
      y: vertices[i].y,
      z: vertices[i].z,
    }).to(
      {
        x: targetVerticesArr[i].x,
        y: targetVerticesArr[i].y,
        z: targetVerticesArr[i].z,
      },
      1000
    ).onUpdate((ver) => {
      startMesh.geometry.attributes.position.array[i * 3] = ver.x - scrollTop;
      startMesh.geometry.attributes.position.array[i * 3 + 1] = ver.y - scrollTop;
      startMesh.geometry.attributes.position.array[i * 3 + 2] = ver.z - scrollTop;
      startMesh.geometry.attributes.position.needsUpdate = true;
    })

    aa.start()
    // aa.stop()
  }
  );


};

// wave
const GetFlatGeometry = () => {
  const numParticles = 50 * 50;
  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  let i = 0,
    j = 0;

  // 初始化粒子位置和大小
  for (let ix = 0; ix < 50; ix++) {
    for (let iy = 0; iy < 50; iy++) {
      positions[i] = ix * 6 - 150; // x
      positions[i + 1] = iy - 60; // y
      positions[i + 2] = iy * 6 - 240; // z
      scales[j] = 1;
      i += 3;
      j++;
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  )
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))
  const wave = new THREE.Points(geometry, material);
  return wave
};
let count = 0;
const render = () => {
  TWEEN.update();

  camera.rotation.y = -mouseK.value / 5;
  for (let i = 0, il = bgModel.length; i < il; i++) {
    bgModel[i].rotation.x += 0.01;
    bgModel[i].rotation.y += 0.02;
  }
  if (moveHeight.value < 0.87 * height) {
    // 圆周运动网格模型y坐标计算  绕转半径223
    var x = 50 - moveHeight.value * 0.12;
    // 每次执行render函数，更新需要做圆周运动网格模型Mesh的位置属性
    points.position.x = x;
  }
  let positions = GetFlatGeometry().geometry.attributes.position.array;

  let i = 0, j = 0;

  // 初始化粒子位置和大小
  for (let ix = 0; ix < 50; ix++) {
    for (let iy = 0; iy < 50; iy++) {

    }
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
  count += 0.1;
};

const getColorByRandom = (colorList) => {
  let colorIndex = Math.floor(Math.random() * colorList.length);
  let color = colorList[colorIndex];
  colorList.splice(colorIndex, 1);
  return color;
};

const handleScroll = (event) => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  event.preventDefault(); // 阻止默认行为（页面滚动）  
  const delta = event.deltaY; // 获取滚动的距离（以像素为单位）  

  // initpointsMeshAnimate(ball, cube, scrollTop)

  points.geometry.attributes.position.needsUpdate = true;
  moveHeight.value = scrollTop;
};

var mouse = new THREE.Vector2();
// 监听鼠标移动旋转场景
const mousemove = (e) => {
  // 获取鼠标移动距离
  mouseK.value = 3e-4 * (e.clientX - sWidth / 2);


};
// 渲染场景

// 防抖
const debounce = (fn, delay) => {
  // 维护一个 timer
  let timer = null;
  return function () {
    // 获取函数的作用域和变量
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};
const onWindowResize = () => {
  console.log(sWidth, sHeight)
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
const getCol = () => {
  let colorList = ["#04ABE0", "#35CCA0", "#E5BF65", "#FF8083", "#AE6DFF", "#FFFFFF"];
  let bgColor;
  for (let i = 0; i < colorList.length; i++) {
    bgColor = getColorByRandom(colorList);
  }
  return bgColor;
};
function getPoint(geometry) {
  var yyy = [];
  const positionAttribute = geometry.getAttribute("position"); // 获取顶点位置属性
  for (let i = 0; i < positionAttribute.count; i++) {
    // 访问每个顶点的位置数据
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);
    yyy.push(new THREE.Vector3(x, y, z));
  }
  return yyy;
}





//生命周期
onMounted(() => {
  _initBase(); GetFlatGeometry()
});

onUnmounted(() => {
  window.cancelAnimationFrame(render);
});
</script>
