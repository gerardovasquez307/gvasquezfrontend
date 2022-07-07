import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationSchema } from "../models/application.model";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  url : string = "https://gvasquezestatebackend.herokuapp.com/application";

  constructor(private http: HttpClient) { }

  async submit(form: NgForm){
    const result = await ApplicationSchema.validate(form.value);

    if(result.error != null){
      return(result.error);
    }
    else{
      return new Promise( (resolve, reject) =>{
        this.http.post(this.url + "/submit",form.value, {headers : {Authorization : "Bearer " + localStorage.getItem('accessToken')}})
        .subscribe(data => {resolve(data);});      
    });
  }
  }
}
