import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { EndpointService } from 'src/app/services/endpoint.service';
import { RestApiService} from '../../services/rest-api.service';
import { FormPageProductComponent } from '../form-page-product/form-page-product.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  public columns: any;
  public rows: any;
  public values:any;
  products:any = [];
  pages:any = [];
  concatenado:any = [];
  shop:any = [];
  shopIn:any = [];
  shopSelect:any;
  cantPages: any = [];
  currentPage:any;
  cant:any;

  cantOptions: any = {
    header: 'Cantidad'
  };
  estadoOptions: any = {
    header: 'Estado'
  };
  shopOptions: any = {
    header: 'Tiendas'
  };
  urlImage:any;
  constructor(
    private api: RestApiService,
    private modalController: ModalController,
    private loading: LoadingController,
    private endpoint: EndpointService
  ) { 
    this.urlImage = this.endpoint.images;
    this.cant = 10;
    
    //this.loadProduct();
    this.loadShop();

  }

  ngOnInit() {}

  changeCant(e){    
    this.cant = e.target.value;
    this.currentPage = 1;
    this.loadProduct(this.currentPage);

  }

  async last(){
    if(this.currentPage>1){
      this.loadProduct(--this.currentPage);
    }
  }
  async next(){
    console.log("CURRENT PAGE: ",this.currentPage, "OLD PAGE: ", this.cantPages.length )
    if(this.currentPage<this.cantPages.length){
      this.loadProduct(++this.currentPage);
    }
  }

  async loadShop(){

    const loading = await this.loading.create({
      message: 'Cargando Tiendas'
    });
    await loading.present();

    const allShop = await this.api.getShopAll();
    this.shop = allShop.data;
    console.log("TIENDAS: ", this.shop);

    loading.dismiss();
  }


  async loadProduct(pag){

    var id = this.shopSelect;
    this.shopIn = this.shop.filter(x => x.id == id)[0];
    

    const loading = await this.loading.create({
      message: 'Cargando Productos'
    });
    await loading.present();

    const product = await this.api.getProductByShop(id, pag, this.cant);
    
    this.products = product.data.product;
    this.pages = product.data.pages;

    
    this.concatenado = this.prueba(this.pages, this.products, "idWebShop", "id");
    console.log("PRODUCTOS CARGADOS: ", this.products);
    console.log("CONCATENADO: ",this.concatenado);

    var cantPage = product.data.cantPages;
    this.cantPages = [];
    this.currentPage = parseInt(product.data.currentPage);

    for (let index = 1; index < parseInt(cantPage)+1; index++) {
      var color = "light";
      if(index == this.currentPage)
        color = "medium";

      var body = {
        page:index,
        color: color
      }
      this.cantPages.push(body);
    }
    loading.dismiss();
  }

  prueba = (objArr1, objArr2, key1, key2) => objArr1.map(
      anObj1 => ({
          ...objArr2.find(
              anObj2 => parseInt(anObj1[key1]) === anObj2[key2]
          ),
          ...anObj1
      })
  );

  valPage(id){
    var cl = id.toString();
    return this.concatenado.filter(x => x.idWebShop == cl);
  }

  async presentModal(item) {
    console.log("ITEM PARA MODAL: ", item);
    const modal = await this.modalController.create({
      component: FormPageProductComponent,
      componentProps: {
        'item': item,
        'shopIn': this.shopIn
      }
    });

    modal.onDidDismiss().then((data:any)=>{
      console.log("RESPUESTA: ", data);
      if(data.data.dismissed){
          this.loadProduct(1);
        }
      });

    return await modal.present();

    
  }

}
