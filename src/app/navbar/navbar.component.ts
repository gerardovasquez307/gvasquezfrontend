import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  name: any;
  validated: boolean = false;
  userLoggedIn: string = "error";

  constructor(private initialRouter: Router,
    private nextRoute: ActivatedRoute, private userService : UserService
  ) {} 

  ngOnInit(): void {
    this.nextRoute.queryParams.subscribe(params => {
      this.name = params['name'];
    });
    this.initialRouter.navigate(['/home-component']);
  }

  async submit(ngForm : NgForm)
  {
    let result = await <any>this.userService.login(ngForm);
    JSON.parse(JSON.stringify(result));

    if(result.validated){
      console.log("validated");
      this.validated = result.validated;
      this.userLoggedIn = ngForm.value.Email;
    }
    else{
      console.log("incorrect username/password")
    }
  }

}
