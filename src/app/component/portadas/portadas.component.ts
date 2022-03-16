import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { EndpointService } from 'src/app/services/endpoint.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormCoverComponent } from '../form-cover/form-cover.component';

@Component({
  selector: 'app-portadas',
  templateUrl: './portadas.component.html',
  styleUrls: ['./portadas.component.scss'],
})
export class PortadasComponent implements OnInit {

  covers:any = [];
  shop:any = [];
  urlImage:any ="";
  tempCover:any = [];
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
    this.loadCover();

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

  async loadCover(){

    const loading = await this.loading.create({
      message: 'Cargando Portadas'
    });
    await loading.present();

    const allShop = await this.api.getCoverAll();
    this.covers = allShop.data;
    this.tempCover = allShop.data;
    console.log("PORTADAS: ", this.covers);

    loading.dismiss();
  }

  async newCover(){
    const modal = await this.modalCtrl.create({
      component: FormCoverComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: "mdlShop"
    });

    modal.onDidDismiss().then((data:any)=>{
      console.log("RESPUESTA MODAL GUARDADA: ",data);
      if(data.data.dismissed == true){
        this.presentToastWithOptions('checkmark-outline','Portada creada con éxito', 'success');
        this.loadCover();
      }

      if(data.data.dismissed == false){
        this.presentToastWithOptions('close-circle-outline','No se pudo crear la portada, intentelo más tarde', 'danger')
      }

      
      });

    return await modal.present();
  }

  async filterShop(e){
    var id = e.target.value;
    this.covers = this.tempCover.filter(x => x.idShop == id);
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
