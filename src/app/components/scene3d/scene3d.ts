import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-scene3d',
  templateUrl: './scene3d.html',
  styleUrls: ['./scene3d.css']
})
export class Scene3dComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;
  private controls!: OrbitControls;

  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();

    // Observa cambios de tamaño del canvas (pantalla completa)
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.canvasRef.nativeElement);

    this.onResize();
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  initScene() {
    const canvas = this.canvasRef.nativeElement;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0f172a');

    // Cámara inicial (se ajustará en onResize)
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.camera.position.set(3, 3, 3);

    // Luces
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 5, 5);
    this.scene.add(ambient, directional);

    // Cubo
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
      color: '#2563eb',
      metalness: 0.6,
      roughness: 0.2
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Controles
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
  }

  onResize() {
    const canvas = this.canvasRef.nativeElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height, false);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.cube.rotation.y += 0.01;
    this.cube.rotation.x += 0.005;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}