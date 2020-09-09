import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '@containers/pages/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
