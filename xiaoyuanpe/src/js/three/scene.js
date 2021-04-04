import * as THREE from "three";
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Thing, ThingType } from "./Thing";
import { eventBus } from "../bus";

export class scene {
  constructor(canvas) {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.stats = null;
    this.canvas = canvas;
    this.controls = null;
    this.objList = [];
    this.init();
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLight();
    this.initStats();
    this.initControls();
    this.registryEventListener();
    this.initModel();

    let scope = this;

    const animate = function () {
      requestAnimationFrame(animate);
      scope.stats.update();
      scope.controls.update();
      render();
    };

    function render() {
      scope.renderer.render(scope.scene, scope.camera);
    }

    window.scene = this;
    animate();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  initScene() {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);
    scene.fog = new THREE.Fog(0xcce0ff, 800, 2000);
    this.scene = scene;
  }

  initCamera() {
    let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(200, 200, 200);
    this.camera = camera;
  }

  initRenderer() {
    let renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer = renderer;
  }

  initLight() {
    this.scene.add(new THREE.AmbientLight(0x505050));
    const light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(4000, 5000, 4000);
    light.angle = Math.PI / 9;

    light.castShadow = true;
    light.shadow.camera.near = 1000;
    light.shadow.camera.far = 10000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);
  }

  initStats() {
    let stats = new Stats();

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
    this.stats = stats;
  }

  initControls() {
    let controls = new MapControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 400;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 3;
    this.controls = controls;
  }

  registryEventListener() {
    window.addEventListener('resize', () => {
      let camera = this.camera;
      let renderer = this.renderer;
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });

    this.canvas.addEventListener('click', (event) => {
      event.preventDefault();
      let mouse = new THREE.Vector2();
      let raycaster = new THREE.Raycaster();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);

      const intersections = raycaster.intersectObjects(this.objList, true);
      let pickInfo = null;
      if (intersections.length > 0) {
        let object = intersections[0].object;
        let thing = Thing.findThing(object);
        pickInfo = thing.pick();
      }
      eventBus.emit("pickInfo", pickInfo)
    });
  }

  loadMtlAndObj(mtlPath, objPath) {
    return new Promise(resolve => {
      let path = "/static/obj";
      const onProgress = function (xhr) {
        if (xhr.lengthComputable) {
          if (xhr.loaded === xhr.total) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            let name = objPath.split("/");
            name = name[name.length - 1];
            console.log(name + " " + Math.round(percentComplete, 2) + '% downloaded');
          }
        }
      };

      const manager = new THREE.LoadingManager();
      manager.addHandler(/\.dds$/i, new DDSLoader());

      let mtlLoader = new MTLLoader(manager);
      mtlLoader.load(path + mtlPath, materials => {
        materials.preload();

        let objLoader = new OBJLoader(manager);
        objLoader.setMaterials(materials);
        objLoader.load(path + objPath, (object) => {
          object.castShadow = true;
          object.receiveShadow = true;
          resolve(object);
        }, onProgress);

      });
    })
  }

  loadCollada(daePath) {
    return new Promise(resolve => {
      let path = "/static/obj";
      let loader = new ColladaLoader();
      loader.load(path + daePath, result => {
        let mesh = result.scene;
        resolve(mesh)
      });
    })
  }

  initModel() {
    // 草地
    this.initGround();
    // 500个盒子
    //this.initBox();
    // 人
    this.loadMtlAndObj('/male02/male02_dds.mtl', '/male02/male02.obj').then((object) => {
      let info = {type: ThingType.BUILDING, name: "a man"};
      let man = new Thing(object, info);
      man.position.y = 0.1;
      man.scale.set(0.1, 0.1, 0.1);
      man.rotation.y = Math.PI;
      this.addThing(man);
    });
    // 房子
    this.loadMtlAndObj('/building/file.mtl', '/building/file.obj').then((object) => {
      let info = {type: ThingType.VENUE, name: "house"};
      let school = new Thing(object, info);
      school.scale.set(0.005, 0.005, 0.005);
      school.position.x = -80;
      school.position.y = 0.1;
      school.position.z = -160;
      this.addThing(school);
    });
  }

  initBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.translate(0, 0.5, 0);
    const material = new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true});

    for (let i = 0; i < 500; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 1600 - 800;
      mesh.position.y = 0;
      mesh.position.z = Math.random() * 1600 - 800;
      mesh.scale.x = 20;
      mesh.scale.y = Math.random() * 80 + 10;
      mesh.scale.z = 20;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      mesh.info = {abc: "building" + i};
      let box = new Thing(mesh, {type: ThingType.VENUE, name: "building" + i});
      this.addThing(box);
    }
  }

  initGround() {
    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load(require('../../../static/textures/grass.jpg'));
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    const groundMaterial = new THREE.MeshLambertMaterial({map: groundTexture});

    let ground = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  // 可拾取物必须是thing
  addThing(thing) {
    this.objList.push(thing);
    this.scene.add(thing);
  }
}


