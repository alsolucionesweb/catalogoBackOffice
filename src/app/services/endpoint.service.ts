import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  //urlDev:String = "http://localhost:3000/api/";
  urlDev:String = "https://rocky-hollows-10760.herokuapp.com/api/";

  constructor() { }  

  shopifyProduct:any = this.urlDev+"shopifyproduct";
  shopAll:any = this.urlDev+"shop/all";
  shopRegister:any = this.urlDev+"shop/register";
  images:any = this.urlDev+"image";
  coverAll:any = this.urlDev+"cover/all";
  coverCreate: any = this.urlDev+"cover/create";
  producByShop:any = this.urlDev+"product/shop/";
  login:any = this.urlDev+"user/login";
  createProduct: any = this.urlDev+"product/create";
  banners: any = this.urlDev+"/banners/all";
  createBanners:any = this.urlDev+"/banners/create";
}
