import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  loading: boolean = false;
  
  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {

  }

  submit(form : NgForm){
    this.applicationService.submit(form);
  }

}
