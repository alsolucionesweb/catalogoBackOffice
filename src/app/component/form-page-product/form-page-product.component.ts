import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-page-product',
  templateUrl: './form-page-product.component.html',
  styleUrls: ['./form-page-product.component.scss'],
})
export class FormPageProductComponent implements OnInit {

  @Input() item: any;
  @Input() shopIn: any;
  product:any = [];
  imgPreview:any = "";
  previewShow:boolean = false;
  shop:any = [];
  slideOpts:any;
  fileImage:any = "";
  created:any = false;
  comision:any = null;
  private newPage : FormGroup;
  

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private animation: DataService,
    private api: RestApiService,
    private loading: LoadingController,
    private formBuilder: FormBuilder,
  ) { 
    this.slideOpts = this.animation.flip;
    this.newPage = this.formBuilder.group({
      comision: ['', Validators.max(100)],
    })

    console.log("ITEM SELECCIONADO: ",this.navParams.get('item'));
    this.product = this.navParams.get('item');
    this.shop = this.navParams.get('shopIn');
    console.log("SHOP ITEM SELECCIONADO: ", this.shop);
  }

  ngOnInit() {}

  loadImageFromDevice(e){
    console.log("ARCHIVO: ", e.target.files);
    const file = e.target.files[0];
    this.fileImage = file;
    //this.imgPreview = URL.createObjectURL(file);
    
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => { // called once readAsDataURL is completed
      this.imgPreview = e.target.result;
      this.previewShow = true;
    }    
    

  }

  async createProduct(){

    const loading = await this.loading.create({
      message: 'Cargando Portadas'
    });
    await loading.present();

    var data = new FormData();
    data.append("page", this.fileImage);
    data.append("name", this.product.name);
    data.append("description", this.product.description);
    data.append("short_description", this.product.description);
    data.append("image", this.product.images[0].src);
    data.append("images", JSON.stringify(this.product.images));
    data.append("categories", JSON.stringify(this.product.categories));
    data.append("attributes", JSON.stringify(this.product.attributes));
    data.append("tags", JSON.stringify(this.product.tags));
    data.append("price", this.product.price);
    data.append("comision", this.newPage.value.comision);
    data.append("idWebShop", this.product.id);
    data.append("idShop", this.shop.id);
    data.append("url", this.product.permalink);
    data.append("status", "1");

    const productNew = await this.api.createProduct(data);
    console.log("GUARDADO", productNew);
    this.created = true;  
    loading.dismiss();
    this.dismiss();
    
    

  }



  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    console.log("si pasa por aqui");
    this.modalCtrl.dismiss({
      'dismissed': this.created
    });
  }

}
