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
    FormPageProductComponent,
    FormShopComponent,
    FormCoverComponent
    ]
})
export class FolderPageModule {}
