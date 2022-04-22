import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { EndpointService } from 'src/app/services/endpoint.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormBannersComponent } from '../form-banners/form-banners.component';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {

  banners:any = [];
  shop:any = [];
  urlImage:any ="";
  tempBanners:any = [];
  status:any;

  tiendaOptions: any = {
    header: 'Tienda'
  };

  constructor(
    private api: RestApiService,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private endpoint: EndpointService,
    public toastController: ToastController
  ) { 
    this.urlImage = this.endpoint.images;
    this.loadShop();
    this.loadBanners();

  }

  ngOnInit() {}

  async changeStatus(e){
    this.status = e.target.value;
  }

  async loadShop(){

    const loading = await this.loading.create({
      message: 'Cargando Tiendas'
    });
    await loading.present();

    const allShop = await this.api.getShopAll();
    this.shop = allShop.data;

    loading.dismiss();
  }

  async loadBanners(){

    const loading = await this.loading.create({
      message: 'Cargando Banners'
    });
    await loading.present();

    const allShop = await this.api.getBannersAll();
    this.banners = allShop.data;
    this.tempBanners = allShop.data;
    console.log("BANNERS: ", this.banners);

    loading.dismiss();
  }

  async newBanner(){
    const modal = await this.modalCtrl.create({
      component: FormBannersComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: "mdlShop"
    });

    modal.onDidDismiss().then((data:any)=>{
      console.log("RESPUESTA MODAL GUARDADA: ",data);
      if(data.data.dismissed == true){
        this.presentToastWithOptions('checkmark-outline','Banner creado con éxito', 'success');
        this.loadBanners();
      }

      if(data.data.dismissed == false){
        this.presentToastWithOptions('close-circle-outline','No se pudo crear el banner, intentelo más tarde', 'danger')
      }

      
      });

    return await modal.present();
  }

  async filterShop(e){
    const loading = await this.loading.create({
      message: 'Filtrando por Tienda'
    });
    await loading.present();

    var id = e.target.value;
    this.banners = this.tempBanners.filter(x => x.idShop == id);

    loading.dismiss();
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
