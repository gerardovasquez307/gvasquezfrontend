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
  test = {
    email: "hello",
    password: "password"
  }

  async login(ngForm : NgForm){
    console.log(ngForm.value);
    const result = await UserSchema.validate(ngForm.value);
    console.log(result.error);

    if(result.error != null){
      console.log(result.error);
    }
    else{
      this.http.post(this.url + "/validate",ngForm.value).subscribe(data =>{
        console.log(data);
      });
    }
  }
}
