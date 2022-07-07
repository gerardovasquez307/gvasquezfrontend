import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url : string = "https://gvasquezestatebackend.herokuapp.com/session";
  constructor(private http: HttpClient) { }

  getSession(){
      return new Promise( (resolve, reject) =>{
        this.http.get(this.url + "/verify", {headers : {Authorization : "Bearer " + localStorage.getItem('accessToken')}})
        .subscribe(data => {resolve(data);});      
    });
  }
}
