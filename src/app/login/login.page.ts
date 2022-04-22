import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  menu: HTMLElement;
  private login : FormGroup;
  emailrecuperar:any;

  @ViewChild('passwordEyeRegister') passwordEye;

  constructor( 
    public dataService: DataService,
    public router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private api: RestApiService,
    ) { 
      this.menu = document.getElementById('menu');
      this.login = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
      
    }

    ngOnInit() {
      this.menu.style.display = "none";
     
    }     

    passwordTypeInput  =  'password';
    iconpassword  =  'eye-off';
    
    togglePasswordMode() {
      this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
      this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
      this.passwordEye.el.setFocus();
    }

    async ingresar(){
      console.log('datos para login: ', this.login.value);
  
      const loading = await this.loadingController.create({
        message: 'Ingresando...'
      });
      await loading.present();

      var body = {
        email: this.login.value.email,
        password: this.login.value.password
      }
  
      await this.api.login(body).then((resp:{
        status:boolean,
        name:string,
        user:string,
        token:any,
        error:string

      }) => {
        
  
        if(resp.status){        
          this.api.token = resp.token;
          this.menu.style.display = "block";
          this.router.navigate(['/folder/Dashboard']);
          loading.dismiss();
          
        }else{
          loading.dismiss();
          this.presentAlert('Lo sentimos', resp.error);
        }
      })
    }

    async presentAlert(title, messaje) {
      const alert = await this.alertController.create({
        header: title,
        message: messaje,
        buttons: ['Aceptar']
      });
      await alert.present();
    } 

}
