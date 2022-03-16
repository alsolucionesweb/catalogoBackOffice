import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-form-shop',
  templateUrl: './form-shop.component.html',
  styleUrls: ['./form-shop.component.scss'],
})
export class FormShopComponent implements OnInit {

  private newShop : FormGroup;
  xshopifyaccess:any = "";
  imgPreview:any = "/assets/images/imgPreview.png";
  fileImage:any = false;
  created:any;

  platformOptions: any = {
    header: 'Plataforma'
  };
  statusOptions: any = {
    header: 'Estado'
  };
  showXShopify:any = "";

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private api: RestApiService,
    private loading: LoadingController,
  ) { 
    this.newShop = this.formBuilder.group({
      name: ['', Validators.required],
      urlShop: ['', Validators.required],
      platform: ['', Validators.required],
      domain: ['', Validators.required],
      apiKey: ['', Validators.required],
      secretKey: ['', Validators.required],   
      status: ['', Validators.required],   
    });
  }

  ngOnInit() {}

  changePlatform(e){
    this.showXShopify = e.target.value;
  }

  async createShop(){    

    const loading = await this.loading.create({
      message: 'Cargando Tiendas'
    });
    await loading.present();

    console.log("NUEVA TIENDA: ", this.newShop.value);
    console.log("ARCHIVO: ", this.fileImage);

    var data = new FormData();
    data.append("image", this.fileImage);
    data.append("name", this.newShop.value.name);
    data.append("urlShop", this.newShop.value.urlShop);
    data.append("platform", this.newShop.value.platform);
    data.append("status", this.newShop.value.status);
    data.append("domain", this.newShop.value.domain);
    data.append("apiKey", this.newShop.value.apiKey);
    data.append("secretKey", this.newShop.value.secretKey);
    if(this.newShop.value.platform == "Shopify"){      
      data.append("xshopifyaccess", this.xshopifyaccess);
    }

    const shop = await this.api.createShop(data);
    console.log("GUARDADO", shop);
    this.created = shop.success;  
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
