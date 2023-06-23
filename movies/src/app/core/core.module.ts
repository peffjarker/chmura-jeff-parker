import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [HeaderComponent, ListComponent, ListItemComponent],
  exports: [HeaderComponent, ListComponent, ListItemComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule
  ],
})
export class CoreModule { }
