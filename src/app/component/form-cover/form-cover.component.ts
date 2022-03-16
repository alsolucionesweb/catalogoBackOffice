import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-form-cover',
  templateUrl: './form-cover.component.html',
  styleUrls: ['./form-cover.component.scss'],
})
export class FormCoverComponent implements OnInit {

  private newCover : FormGroup;
  imgPreview:any = "/assets/images/imgPreview.png";
  fileImage:any = false;
  created:any;
  shop:any = [];

  tiendaOptions: any = {
    header: 'Tienda'
  };
  statusOptions: any = {
    header: 'Estado'
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private api: RestApiService,
    private loading: LoadingController,
  ) { 
    this.newCover = this.formBuilder.group({
      name: ['', Validators.required],
      idShop: ['', Validators.required], 
      status: ['', Validators.required],   
    });
    this.loadShop();
  }

  ngOnInit() {}

  async loadShop(){

    const loading = await this.loading.create({
      message: 'Cargando Tiendas'
    });
    await loading.present();

    const allShop = await this.api.getShopAll();
    this.shop = allShop.data;

    loading.dismiss();
  }

  async createCover(){    

    const loading = await this.loading.create({
      message: 'Cargando Portadas'
    });
    await loading.present();

    console.log("NUEVA PORTADA: ", this.newCover.value);
    console.log("ARCHIVO: ", this.fileImage);

    var data = new FormData();
    data.append("image", this.fileImage);
    data.append("name", this.newCover.value.name);
    data.append("idShop", this.newCover.value.idShop);
    data.append("status", this.newCover.value.status);
    

    const cover = await this.api.createCover(data);
    console.log("GUARDADO", cover);
    this.created = cover.success;  
    loading.dismiss();
    this.dismiss();
  }

  loadImageFromDevice(e){
    console.log("ARCHIVO: ", e.target.files);
    const file = e.target.files[0];
    this.fileImage = file;
    //this.imgPreview = URL.createObjectURL(file);
    
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => { // called once readAsDataURL is completed
      this.imgPreview = e.target.result;
    }    
    

  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': this.created
    });
  }

}
