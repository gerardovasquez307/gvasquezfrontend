import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';

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
  displayLoginError : boolean = false;
  loading: boolean = false;

  constructor(private initialRouter: Router,
    private nextRoute: ActivatedRoute, private userService : UserService, private sessionService: SessionService
  ) {} 

  ngOnInit(): void {
    this.nextRoute.queryParams.subscribe(params => {
      this.name = params['name'];
    });
    this.initialRouter.navigate(['/home-component']);
    this.validateSession();
  }

  async validateSession(){
   let accessToken = localStorage.getItem("accessToken");

    if(accessToken != undefined){
      let result = await <any>(this.sessionService.getSession());
      this.userLoggedIn = result.msg;
      this.validated = true;
    }

  }

  async submit(ngForm : NgForm)
  {
    this.loading = true;
    ngForm.value.Email = ngForm.value.Email.toLowerCase();
    let result = await <any>this.userService.login(ngForm);
    JSON.parse(JSON.stringify(result));

    this.saveToken(result.accessToken);

    if(result.validated){
      console.log("validated");
      this.displayLoginError = false;
      this.validated = result.validated;
      this.userLoggedIn = ngForm.value.Email;
    }
    else{
      console.log("incorrect username/password");
      this.displayLoginError = true;
    }
    this.loading = false;
  }

  saveToken(token : string){
    localStorage.setItem("accessToken", token);
  }
}
