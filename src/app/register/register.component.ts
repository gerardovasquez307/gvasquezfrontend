import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, PersonService]
})
export class RegisterComponent implements OnInit {

  @ViewChild('openModalButton', {read: ElementRef}) openModalButton!: ElementRef;
  @ViewChild('registerForm', {read: ElementRef}) registerForm!: ElementRef;

  constructor(private userService: UserService, private personService: PersonService) { }

  ngOnInit(): void {
  }

  async submit(form : NgForm){
    //verify if passwords match
    if (this.confirmPassword(form)){
    
      //crete user object to send to endpoint
      let user = {
        Email: form.value.Email,
        Password: form.value.Password
      }

      //need to change name, and gender to conform to api
      let name : string = form.value.fName + form.value.lName;
      let isMale : boolean = true; //default
      if(form.value.gender == 'Female')isMale = false;
      let address : string  = form.value.Address + form.value.city + form.value.state + form.value.zip;
      
      //set fields we need to send to api
      form.value.Address = address;
      form.value.IsMale = isMale;
      form.value.Name = name;
      form.value.RelatedTo = "self";
      form.value.Relationship = 1;
      
      //delete these fields from form so we can conform to model
      delete form.value.fName;
      delete form.value.lName;
      delete form.value.genderF;
      delete form.value.genderM;
      delete form.value.gender;
      delete form.value.city;
      delete form.value.state;
      delete form.value.zip;
      delete form.value.Password;
      delete form.value.confirmPassword;
      
      console.log(form.value);
      let result = await this.personService.register(form);
      if(result != undefined) {
        console.log(result);
        return;
      }
      let result2 = await this.userService.register(user);
      if (result2 != undefined){
        console.log(result);
        return;
      }
      this.openModalButton.nativeElement.click();
      this.resetModal();
    }
  }

  confirmPassword(form: NgForm){
    if(form.value.Password === form.value.confirmPassword)return true;
    else {
      console.log("Passwords do not match");
      return false;
    }
  }

  resetModal(){
    this.registerForm.nativeElement.reset();
   }
}
