import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { EndpointService } from 'src/app/services/endpoint.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormShopComponent } from '../form-shop/form-shop.component';


@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
})
export class TiendasComponent implements OnInit {

  shop:any = [];
  shopWordpress:any = [];
  shopShopify:any = [];
  urlImage:any;

  constructor(
    private api: RestApiService,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private endpoint: EndpointService,
    public toastController: ToastController
  ) { 
    this.loadShop();
    this.urlImage = this.endpoint.images;
  }

  ngOnInit() {}

  async loadShop(){

    const loading = await this.loading.create({
      message: 'Cargando Tiendas'
    });
    await loading.present();

    const allShop = await this.api.getShopAll();
    this.shop = allShop.data;
    console.log("TIENDAS: ", this.shop);
    this.shopShopify = this.shop.filter(x => x.platform == "Shopify");
    this.shopWordpress = this.shop.filter(x => x.platform == "Wordpress");

    loading.dismiss();
  }



  async newShop(){
    const modal = await this.modalCtrl.create({
      component: FormShopComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: "mdlShop"
    });

    modal.onDidDismiss().then((data:any)=>{
      console.log("RESPUESTA MODAL GUARDADA: ",data);
      if(data.data.dismissed == true){
        this.presentToastWithOptions('checkmark-outline','Tienda creada con éxito', 'success');
        this.loadShop();
      }

      if(data.data.dismissed == false){
        this.presentToastWithOptions('close-circle-outline','No se pudo crear la tienda, intentelo más tarde', 'danger')
      }

      
      });

    return await modal.present();
  }

  async presentToastWithOptions(icono, texto, color) {
    const toast = await this.toastController.create({
      header: texto,
      icon: icono,
      position: 'top',
      duration: 2000,
      color: color,
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
