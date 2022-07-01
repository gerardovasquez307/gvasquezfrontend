import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonSchemas } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url : string = "https://gvasquezestatebackend.herokuapp.com/person";

  constructor(private http: HttpClient) { }

  async register(form : NgForm){
    const result = await PersonSchemas.PostPersonSchema.validate(form.value);

    if(result.error != null){
      return (result.error);
    }
    else{
      this.http.post(this.url,form.value).subscribe(data =>{});
      return null;
    }
  }
}
