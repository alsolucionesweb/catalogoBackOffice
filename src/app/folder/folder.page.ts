import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  menu: HTMLElement;

  constructor(
    private activatedRoute: ActivatedRoute,
    public api: RestApiService,
    public router: Router
    ) {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.menu = document.getElementById('menu');
    
    if(this.folder =='Salir'){
      this.api.token = "";
      this.menu.style.display ="none";
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {    
    this.menu.style.display = "block";
  }

}
