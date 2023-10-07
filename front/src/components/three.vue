<template>
  <div ref="dom" />
</template>
<script  setup>
import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import VerticesDuplicateRemove from '@/utils/VerticesDuplicateRemove'
import TWEEN, { Tween } from "@tweenjs/tween.js";
import { onMounted, reactive, ref, onUnmounted } from "vue";
const dom = ref(null);

const mouseV = ref(0);
const mouseK = ref(0);
const moveHeight = ref(0);
const ccc = ref(false);
let
  sWidth = window.innerWidth,
  sHeight = window.innerHeight,
  tween = [],

  ccccc = [],
  bkboxlist = [];
// 屏幕高度
let height = window.screen.availHeight;
// 场景
const scene = new THREE.Scene();
// 坐标轴
// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);
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
// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, 0);

const manager = new THREE.LoadingManager();
const objLoader = new OBJLoader(manager);
// 材质
const material = new THREE.MeshBasicMaterial({
  color: '#333',
  opacity: 0, // 设置透明度为 0.5
  transparent: true // 开启透明
});
const geometry = new THREE.BufferGeometry();

// 盒子
const cubeGeometry = new THREE.BoxGeometry(40, 40, 40, 14, 14, 14);
const cube = new THREE.Mesh(cubeGeometry, material);

// 球
const ballGeometry = new THREE.SphereGeometry(30, 40, 32);
const ball = new THREE.Mesh(ballGeometry, material);

const aaaa = new THREE.SphereGeometry(30, 40, 32);
const test = new THREE.Mesh(aaaa, material);
// // points
const points = new THREE.Points(
  ballGeometry,
  new THREE.PointsMaterial({
    size: 0.8,
    // false:粒子尺寸相同 ;true：取决于摄像头远近
    sizeAttenuation: true,
    transparent: true,
    opacity: 1,
    color: 0x00ffff,
  })
);

const position = new THREE.Vector3();
const quaternion = new THREE.Quaternion();


const _initBase = () => {

  // 背景方框
  for (let i = 0; i < 1000; i++) {
    objLoader.load("/three/gj.obj", (geometry) => {
      geometry.traverse((child) => {
        geometry.position.x = (Math.random() * 2 - 1) * 120;
        geometry.position.y = (Math.random() * 2 - 1) * 120;
        geometry.position.z = (Math.random() * 2 - 1) * 120;
        geometry.rotation.x = Math.random() * 1;
        geometry.rotation.y = Math.random() * 1;
        if (child.isMesh) {
          let csclep = 0.1
          child.geometry.scale(csclep, csclep, csclep);
          child.material.color = new THREE.Color(getCol());
          const mesh = new THREE.Mesh(child.geometry, child.material);
          bkboxlist.push(mesh);
        }
      });
    });
  }
  for (let i = 0; i < 200; i++) {
    objLoader.load("/three/gj.obj", (geometry) => {
      geometry.traverse((child) => {
        geometry.position.x = (Math.random() * 2 - 1) * 120;
        geometry.position.y = (Math.random() * 2 - 1) * 120;
        geometry.position.z = (Math.random() * 2 - 1) * 120;
        geometry.rotation.x = Math.random() * 2 * Math.PI;
        geometry.rotation.y = Math.random() * 2 * Math.PI;
        // geometry.rotation.x += 1.08;
        // geometry.rotation.y += 1.08;
        if (child.isMesh) {
          let csclep = 0.1
          child.geometry.scale(csclep, csclep, csclep);
          child.material.color = new THREE.Color(getCol());
          // child.geometry.translate(11, 0,0);
          // const { array } = child.geometry.attributes.position
          // const { array } = child.geometry.getAttribute('position');
          ccccc.push(child);
          // for (let i =0; i<array.length;i++ ){
          //   bufArrays1.push(array[i])
          // }
        }
      });
      scene.add(geometry);
    });
  }
  setTimeout(function () {
    bkboxlist.forEach((mesh) => {
      // 随机生成球面坐标
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      // 计算球面坐标对应的三维坐标
      position.set(
        30 * Math.sin(phi) * Math.cos(theta),
        30 * Math.sin(phi) * Math.sin(theta),
        30 * Math.cos(phi)
      );

      // 计算法向量
      const normal = position.clone().normalize();

      // 将模型朝向球体外侧
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      mesh.setRotationFromQuaternion(quaternion);

      // 将 Mesh 对象放置在球体表面
      mesh.position.copy(position);
      ball.add(mesh);
    });
  }, 1000)
  // mesh1.position.copy(ballGeometry.geometry.vertices[i])
  ball.scale.x = 1.5;
  ball.scale.y = 1.5;
  ball.scale.z = 1.5;
  ball.position.set(50, 0, 0);
  scene.add(ball);

  //  随机点
  dom.value.appendChild(renderer.domElement);
  // 监听屏幕分辨率
  window.addEventListener('mousemove', debounce(mousemove, 0))
  window.addEventListener('resize', debounce(onWindowResize, 0));
  window.addEventListener('scroll', debounce(handleScroll, 10));

  // initpointsMeshAnimate(ballGeometry, GetFlatGeometry().wave);
  render();
};

// const initpointsMeshAnimate = async (startMesh, targetMesh) => {


//   // TWEEN.removeAll();
//   // 源模型的顶点 getPoint( points.geometry )
//   let originVertices = getPoint(points.geometry);

//   // 目标模型的顶点
//   const targetVerticesArr = targetMesh.geometry.attributes.position.array

//   // 遍历每一个粒子
//   originVertices.forEach(async (v, i, vertices) => {

//     let aa = new TWEEN.Tween({
//       x: vertices[i % originVertices.length].x,
//       y: vertices[i % originVertices.length].y,
//       z: vertices[i % originVertices.length].z,

//     }).to(
//       {
//         x: targetVerticesArr[i * 3] + 60,
//         y: targetVerticesArr[(i * 3) + 1],
//         z: targetVerticesArr[(i * 3) + 2] - 50,
//       },
//       2000
//     ).onUpdate((ver) => {

//       points.geometry.attributes.position.array[i * 3] = ver.x;
//       points.geometry.attributes.position.array[i * 3 + 1] = ver.y;
//       points.geometry.attributes.position.array[i * 3 + 2] = ver.z;
//       points.geometry.attributes.position.needsUpdate = true;

//     })
//     tween.push(aa)
//   }
//   );
// };






// wave
const GetFlatGeometry = () => {
  const numParticles = 800 * 800;
  const positions = new Float32Array(numParticles * 3);
  let i = 0
  // 初始化粒子位置和大小
  for (let ix = 0; ix < 350; ix++) {
    for (let iy = 0; iy < 50; iy++) {
      const randomInt = Math.random() + 6
      positions[i] = ix * randomInt - 120; // x
      positions[i + 1] = 20 * Math.sin(iy); // y
      positions[i + 2] = iy * randomInt - 100; // z
      i += 3;
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 1)
  )
  const wave = new THREE.Mesh(geometry, material);

  return wave
}

const render = () => {
  TWEEN.update();
  camera.rotation.y = -mouseK.value / 5

  // points.rotation.y += 0.01;
  for (let i = 0, il = ccccc.length; i < il; i++) {
    ccccc[i].rotation.x += 0.01;
    ccccc[i].rotation.y += 0.02;
  }

  if (moveHeight.value < 0.87 * height) {
    // 圆周运动网格模型y坐标计算  绕转半径223
    var x = 50 - moveHeight.value * 0.12;
    // 每次执行render函数，更新需要做圆周运动网格模型Mesh的位置属性
    ball.position.x = x
    // ball.rotation.y = Math.sin(moveHeight.value * 0.01)
  }


  // renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0x000000, 1);//设置颜色和透明度，让两个区域显示对比
  renderer.render(scene, camera);

  // renderer.clearDepth();//清除深度缓存。

  // renderer.setScissorTest(true);

  // //将剪裁区域设为(x, y)到(x + width, y + height)
  // renderer.setScissor(100, 500, 100, 100);
  // //将视口大小设置为(x, y)到 (x + width, y + height).
  // renderer.setViewport(100, 500, 100, 100);

  // //跟随主相机的旋转角度和位置
  // camera2.position.set(30,20,-50);//复制主相机的位置
  // camera2.quaternion.copy(camera.quaternion);//复制主相机的四元数
  // renderer.setClearColor(0x222222, 1);
  // renderer.render(scene, camera2);

  // renderer.setScissorTest(false);//关闭裁剪，避免裁剪主场景

  window.requestAnimationFrame(render);
}


const getColorByRandom = (colorList) => {
  let colorIndex = Math.floor(Math.random() * colorList.length);
  let color = colorList[colorIndex];
  colorList.splice(colorIndex, 1);
  return color;
}

const handleScroll = () => {
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  const positions = points.geometry.attributes.position.array;
  const ballPoints = test.geometry.attributes.position.array
  const targetVerticesArr = GetFlatGeometry().geometry.attributes.position.array

  const cubePoints = cube.geometry.attributes.position.array



  // } else if (scrollTop > height * 0.87 && scrollTop < 1.7 * height) {

  //   if (moveHeight.value < scrollTop) {
  //     for (let i = 0; i < positions.length; i += 3) {
  //       positions[i] += Math.random() * 8 - 2;
  //       positions[i + 1] += Math.random() * 8 - 3;
  //       positions[i + 2] -= Math.random() * 8 - 4;

  //     }

  //     console.log(' xia')
  //   } else {

  //     for (let i = 0; i < positions.length; i += 3) {
  //       positions[i] -= Math.random() * 8 - 2;
  //       positions[i + 1] -= Math.random() * 8 - 3;
  //       positions[i + 2] += Math.random() * 8 - 4;

  //     }
  //     console.log('shang')
  //   }



  // } else {
  //   console.log(2222)
  //   // 遍历每个粒子的坐标
  //   for (let i = 0; i < positions.length; i += 3) {
  //     positions[i] = cubePoints[i]
  //     positions[i + 1] = cubePoints[i + 1]
  //     positions[i + 2] = cubePoints[i + 2]


  //   }
  // }

  points.geometry.attributes.position.needsUpdate = true;
  moveHeight.value = scrollTop
}


// 监听鼠标移动旋转场景
const mousemove = (e) => {
  // 获取鼠标移动距离
  mouseK.value = 3e-4 * (e.clientX - sWidth / 2)
}


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
    }, delay)
  }
}
const onWindowResize = () => {
  renderer.setSize(sWidth, sHeight);
  camera.aspect = sWidth / sHeight;
  camera.updateProjectionMatrix();
}
const getCol = () => {
  let colorList = [
    "#04ABE0",
    "#35CCA0",
    "#E5BF65",
    "#FF8083",
    "#AE6DFF",
    "#FFFFFF",
  ];
  let bgColor;
  for (let i = 0; i < colorList.length; i++) {
    bgColor = getColorByRandom(colorList);
  }
  return bgColor;
}
function getPoint(geometry) {
  var yyy = [];
  const positionAttribute = geometry.getAttribute('position'); // 获取顶点位置属性
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
  _initBase();

});

onUnmounted(() => {
  window.cancelAnimationFrame(render)
})
</script>
