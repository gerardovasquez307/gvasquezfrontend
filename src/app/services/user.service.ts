import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {UserSchema} from '../models/user.model';
import { NgForm } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url : string = "https://gvasquezestatebackend.herokuapp.com/user";

  constructor(private http: HttpClient) { }

  async login(form : NgForm){
    const result = await UserSchema.validate(form.value);

    if(result.error != null){
      return(result.error);
    }
    else{
      this.http.post(this.url + "/validate",form.value).subscribe(data =>{
      });
      return undefined;
    }
  }

  async register(user : Object){
    const result = await UserSchema.validate(user);

    if(result.error != null){
      return result.error;
    }
    else{
      this.http.post(this.url + "/register",user).subscribe(data =>{
      });
      return undefined;
    }

  }
}
