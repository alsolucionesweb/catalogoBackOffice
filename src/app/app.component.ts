import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  
  showMenu = false;

  public appPages = [
    { title: 'Dashboard', url: '/folder/Dashboard', icon: 'grid' },
    { title: 'Tiendas', url: '/folder/Tiendas', icon: 'storefront' },
    { title: 'Productos', url: '/folder/Productos', icon: 'bag-handle' },
    { title: 'Portadas', url: '/folder/Portadas', icon: 'image' },
  ];

  public client = [
    { title: 'Productos Cliente', url: '/folder/Productos Cliente', icon: 'bag-handle' },
    { title: 'Catalogos', url: '/folder/Catálogos', icon: 'image' },
  ];
  
  public labels = [
    { title: 'Mi cuenta', url: '/folder/Mi Cuenta', icon: 'person-circle' },
    { title: 'Salir', url: '/folder/Salir', icon: 'power' },
  ];

  constructor( public dataService: DataService) {}
}
