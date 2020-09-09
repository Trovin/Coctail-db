import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from '@containers/pages/home/home.module';
import { HeaderModule } from '@containers/page-layers/header/header.module';
import { SidebarModule } from '@containers/page-layers/sidebar/sidebar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    HeaderModule,
    SidebarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
