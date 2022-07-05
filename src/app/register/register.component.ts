import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel, ValidationErrors } from '@angular/forms';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { boolean, string } from 'joi';
import { PersonService } from '../services/person.service';
import { UserService } from '../services/user.service';
import { ValidationError } from 'joi/lib';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, PersonService]
})
export class RegisterComponent implements OnInit {

  @ViewChild('openModalButton', {read: ElementRef}) openModalButton!: ElementRef;
  @ViewChild('registerForm', {read: ElementRef}) registerForm!: ElementRef;
  
  loading: boolean = false;
  containsErrors : boolean = false;
  errors : any;

  constructor(private userService: UserService, private personService: PersonService) {
   }

  async ngOnInit() {
  }

  async submit(form : NgForm){
    this.loading = true;
    //verify if passwords match
    if (this.confirmPassword(form)){
    
      //emails will be stored in lowercase
      form.value.Email = form.value.Email.toLowerCase();

      //crete user object to send to endpoint
      let user = {
        Email: form.value.Email,
        Password: form.value.Password
      }

      //need to change name, and gender to conform to api
      let name : string = form.value.fName + form.value.lName;
      let address : string  = form.value.Address + form.value.city + form.value.state + form.value.zip;
      
      //set fields we need to send to api
      if(form.value.gender == 'Female')form.value.IsMale = false;
      else if (form.value.gender == 'Male')form.value.IsMale = true;
      form.value.Address = address;
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
      let email = { "Email" : form.value.Email }; 
      
      let personExists = await <any>this.personService.findPerson(email);
      JSON.parse(JSON.stringify(personExists));

      if(personExists.found == 'true'){
        this.containsErrors = true;
        this.errors = "User already exists in the system please login";
        this.scrollToTop();
        this.loading =false;
        return;
      }
      let result = await this.personService.register(form);
      if(result != undefined) {
        console.log(result);
        this.errors = result.message;
        this.containsErrors = true;
        this.loading= false;
        this.scrollToTop();
        return;
      }
      let result2 = await this.userService.register(user);
      if (result2 != undefined){ 
        this.errors = result2.message;
        this.containsErrors = true;
        this.scrollToTop();
        console.log(result);
        this.loading = false;
        return;
      }
      this.openModalButton.nativeElement.click();
      this.resetModal();
      this.containsErrors = false;
    }
    this.loading = false;
  }

  confirmPassword(form: NgForm){
    if(form.value.Password === form.value.confirmPassword)return true;
    else {
      this.errors = "The passwords need to match";
      this.containsErrors = true;
      this.scrollToTop();
      return false;
    }
  }

  resetModal(){
    this.registerForm.nativeElement.reset();
   }

   scrollToTop() {
    // window.scroll(0,0);
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 
     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)
 }
}
