import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {  

  token:any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxlamFuZHJvIExvbmRvbm8iLCJ1c2VyIjoxLCJyb2wiOiJBZG1pbiIsImlhdCI6MTY0OTE2MTEyMH0.gblrzyEsG1_riRrXrzVGcN338diGC1CpJlQmp43Z11E";

  constructor(
    private endpoint:EndpointService
  ) { }

  getProduct = async() => {
    return await fetch(this.endpoint.shopifyProduct,{
      method: "GET"
    }).then(resp => resp.json());
  }

  getProductByShop = async(id, pag, cant) => {
    return await fetch(this.endpoint.producByShop+id+'/'+pag+'/'+cant,{
      method: "GET"
    }).then(resp => resp.json());
  }

  getShopAll = async() => {
    return await fetch(this.endpoint.shopAll,{
      method: "GET",
      headers: {
        token: this.token
      }
    }).then(resp => resp.json());
  }

  getCoverAll = async() => {
    return await fetch(this.endpoint.coverAll,{
      method: "GET"
    }).then(resp => resp.json());
  }

  getBannersAll = async() => {
    return await fetch(this.endpoint.banners,{
      method: "GET"
    }).then(resp => resp.json());
  }

  createShop = async(body) => {

    var coockiex = await this.coockie();

    return await fetch(this.endpoint.shopRegister,{
      method: "POST",
      body: body,
      redirect: 'follow',
      headers: {
        token: this.token,
        Cookie: coockiex
      }
    }).then(resp => resp.json());
  }

  createBanner = async(body) => {

    const coockiex = await this.coockie();

    return await fetch(this.endpoint.createBanners,{
      method: "POST",
      body: body,
      redirect: 'follow',
      headers: {
        token: this.token,
        Cookie: coockiex
      }
    }).then(resp => resp.json());
  }

  createCover = async(body) => {

    const coockiex = await this.coockie();

    return await fetch(this.endpoint.coverCreate,{
      method: "POST",
      body: body,
      redirect: 'follow',
      headers: {
        token: this.token,
        Cookie: coockiex
      }
    }).then(resp => resp.json());
  }

  createProduct = async(body) => {

    const coockiex = await this.coockie();

    return await fetch(this.endpoint.createProduct,{
      method: "POST",
      body: body,
      redirect: 'follow',
      headers: {
        token: this.token,
        Cookie: coockiex
      }
    }).then(resp => resp.json());
  }

  login = async(body) => {
    return await fetch(this.endpoint.login, {
      method: "POST",
      body: JSON.stringify(body),
      headers : {                              
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json());
  }

  coockie = async() => {
    var ssid = document.cookie.split(';');
    var coockiex = '';
    ssid.forEach(element => {
      var x = element.split('=');
      if(x[0] == 'PHPSESSID'){
        coockiex = element;
      }
    });
    return coockiex;
  }


}
