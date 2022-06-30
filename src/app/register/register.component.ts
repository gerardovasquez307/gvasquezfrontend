import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, PersonService]
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private personService: PersonService) { }

  ngOnInit(): void {
  }

  submit(form : NgForm){
    let user = {
      email: form.value.email,
      password: form.value.password
    }

    this.userService.register(user);
    delete form.value.password;//delete password from form so we can send that to next endpoint
    this.personService.register(form);
  }

}
