import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { 
    console.log("ITEM SELECCIONADO: ",this.navParams.get('item'));
    this.product = this.navParams.get('item');
    this.shop = this.navParams.get('shopIn');
    console.log("SHOP ITEM SELECCIONADO: ", this.shop);
  }

  ngOnInit() {}

  loadImageFromDevice(e){
    console.log("ARCHIVO: ", e.target.files);
    const file = e.target.files[0];
    //this.imgPreview = URL.createObjectURL(file);
    
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => { // called once readAsDataURL is completed
      this.imgPreview = e.target.result;
      this.previewShow = true;
    }    
    

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    console.log("si pasa por aqui");
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
