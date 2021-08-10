import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrudService } from './services/crud.service';
import { NotificationService } from './services/notification.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    NavbarComponent,
    HttpClientModule, 
  ],
  providers: [
    CrudService,
    NotificationService,
  ]
})
export class SharedModule { }
