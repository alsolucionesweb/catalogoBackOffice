import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FolderPage } from './folder.page';

import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { TiendasComponent } from '../component/tiendas/tiendas.component';
import { ProductosComponent } from '../component/productos/productos.component';
import { PortadasComponent } from '../component/portadas/portadas.component';
import { MicuentaComponent } from '../component/micuenta/micuenta.component';
import { FormPageProductComponent } from '../component/form-page-product/form-page-product.component';
import { FormShopComponent } from '../component/form-shop/form-shop.component';
import { FormCoverComponent } from '../component/form-cover/form-cover.component';
import { BannersComponent } from '../component/banners/banners.component';
import { FormBannersComponent } from '../component/form-banners/form-banners.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule  ],
  declarations: [
    FolderPage,
    DashboardComponent,
    TiendasComponent,
    ProductosComponent,
    PortadasComponent,
    MicuentaComponent,
    BannersComponent,
    FormPageProductComponent,
    FormShopComponent,
    FormCoverComponent,
    FormBannersComponent
    ]
})
export class FolderPageModule {}
