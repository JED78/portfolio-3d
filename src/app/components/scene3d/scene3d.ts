import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-scene3d',
  templateUrl: './scene3d.html',
  styleUrls: ['./scene3d.css']
})
export class Scene3dComponent implements AfterViewInit {

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;
  private controls!: OrbitControls;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
  }

  initScene() {
    const canvas = this.canvasRef.nativeElement;

    const width = canvas.clientWidth || 300;
    const height = canvas.clientHeight || 300;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0f172a');

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(3, 3, 3);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 5, 5);
    this.scene.add(ambient, directional);

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
      color: '#2563eb',
      metalness: 0.6,
      roughness: 0.2
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.cube.rotation.y += 0.01;
    this.cube.rotation.x += 0.005;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}