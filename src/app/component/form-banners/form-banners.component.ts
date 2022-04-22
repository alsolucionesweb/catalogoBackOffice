import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-form-banners',
  templateUrl: './form-banners.component.html',
  styleUrls: ['./form-banners.component.scss'],
})
export class FormBannersComponent implements OnInit {

  private newBanner : FormGroup;
  imgPreview:any = "/assets/images/imgPreview.png";
  imgBackCover:any = "/assets/images/imgPreview.png";
  fileImage:any = false;
  created:any;
  shop:any = [];
  fileBackCover:any;

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
    this.newBanner = this.formBuilder.group({
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

  async createBanner(){    

    const loading = await this.loading.create({
      message: 'Creando Banner'
    });
    await loading.present();

    console.log("NUEVO BANNER: ", this.newBanner.value);
    console.log("ARCHIVO: ", this.fileImage);

    var data = new FormData();
    data.append("image", this.fileImage);
    data.append("idShop", this.newBanner.value.idShop);
    data.append("status", this.newBanner.value.status);
    

    const banner = await this.api.createBanner(data);
    console.log("GUARDADO", banner);
    this.created = banner.success;  
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
