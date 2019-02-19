import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { PaginationComponent } from './pagination/pagination.component';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [ CommonModule, FormsModule, PaginationComponent],
  providers: [ NgbActiveModal ]
})
export class SharedModule { }
