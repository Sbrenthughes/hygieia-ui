import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPaginationParams} from '../interfaces';



@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalSize: string;
  @Output() pageChange = new EventEmitter<IPaginationParams>();
  page = 0;
  pageSize = 10;
  constructor() { }

  ngOnInit() {
  }
  pageChanged(page) {
    console.log(page)
    console.log(this.page)
    const params = <IPaginationParams>{
      page: page,
      pageSize: this.pageSize
    };

     this.pageChange.emit(params);
  }
}
