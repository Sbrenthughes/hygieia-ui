import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
}
