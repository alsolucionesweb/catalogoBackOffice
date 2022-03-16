import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  token: any = "";
  menu: boolean = true;

  constructor() { }
}
