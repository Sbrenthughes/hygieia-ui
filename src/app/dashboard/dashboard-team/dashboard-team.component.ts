import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-team',
  templateUrl: './dashboard-team.component.html',
  styleUrls: ['./dashboard-team.component.scss']
})
export class DashboardTeamComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      console.log(id);
      // this.getProduct(id);
    }
  }

}
