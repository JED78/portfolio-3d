import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Scene3dComponent } from './components/scene3d/scene3d';
import { Header } from '../app/pages/header/header';
@Component({
  selector: 'app-root',
  imports: [Header, Scene3dComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio-3d');
}
