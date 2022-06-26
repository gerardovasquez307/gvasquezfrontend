import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: any;

  constructor(private initialRouter: Router,
    private nextRoute: ActivatedRoute
  ) {} 

  ngOnInit(): void {
    this.nextRoute.queryParams.subscribe(params => {
      this.name = params['name'];
    });
    this.initialRouter.navigate(['/home-component']);
  }

}
