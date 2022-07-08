import { Component, OnInit } from '@angular/core';
import {   ReactiveFormsModule,FormGroup,FormBuilder,FormArray,NgForm, } from '@angular/forms';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  occupants = [{ name: '', age: '' }];
  landlordRefs = [{ name: '', phone: '', propertyAddr:''}]; 
  employers = [{ name: '', phone: '', propertyAddr:''}]; 

  occupantForm: FormGroup = this.formBuilder.group({
    occupants: this.buildOccupants(this.occupants)
  });

  landlordForm: FormGroup = this.formBuilder.group({
    landlordRefs: this.buildLandlordRefs(this.landlordRefs)
  });

  employerForm: FormGroup = this.formBuilder.group({
    employers: this.buildEmployers(this.employers)
  });

  submitted: boolean = false;
  loading: boolean = false;
  config: any;
  pages: number = 4;
  totalQuestions = 4;
  pagesObject = [{id: 1},{id:2},{id:3},{id:4}];

  constructor(private applicationService: ApplicationService, private formBuilder : FormBuilder) {
    this.config = {
      itemsPerPage: 1,
      currentPage: 1,
      totalItems: this.totalQuestions
    };
   }

   ngOnInit(): void {}

   pageChanged(event : any){
    this.config.currentPage = event;
  }

  get getOccupants(): FormArray {
    return this.occupantForm.get('occupants') as FormArray;
  }

  get getLandlordRefs(): FormArray {
    return this.landlordForm.get('landlordRefs') as FormArray;
  }

  get getEmployers(): FormArray {
    return this.employerForm.get('employers') as FormArray;
  }

  buildOccupants(occupant: {name: string, age: string; }[] = []) {
    return this.formBuilder.array(
      this.occupants.map((occupant) => this.formBuilder.group(occupant))
    );
  }

  buildLandlordRefs(landlordRef: {name: string, phone: string, propertyAddr: string; }[] = [] ){
    return this.formBuilder.array(
      this.landlordRefs.map((landlordRef) => this.formBuilder.group(landlordRef))
    );
  }

  buildEmployers(employer: {name: string, phone: string, propertyAddr: string; }[] = [] ){
    return this.formBuilder.array(
      this.employers.map((employer) => this.formBuilder.group(employer))
    );
  }

  addOccupantField() {
    this.getOccupants.push(this.formBuilder.group({ name: null, age: null }));
  }

  addLandlordField() {
    this.getLandlordRefs.push(this.formBuilder.group({ name: null, phone: null, propertyAddr: null }));
  }

  addEmployerField() {
    this.getEmployers.push(this.formBuilder.group({ name: null, phone: null, propertyAddr: null }));
  }

  removeOccupantField(index: number): void {
    if (this.getOccupants.length > 1) this.getOccupants.removeAt(index);
    else this.getOccupants.patchValue([{ age: null, name: null }]);
  }

  removeLandlordField(index: number): void {
    if (this.getLandlordRefs.length > 1) this.getLandlordRefs.removeAt(index);
    else this.getLandlordRefs.patchValue([{ age: null, phone: null, propertyAddr: null }]);
  }

  removeEmployerField(index: number): void {
    if (this.getEmployers.length > 1) this.getEmployers.removeAt(index);
    else this.getEmployers.patchValue([{ age: null, phone: null, propertyAddr: null }]);
  }

  submit(form: NgForm){
    this.applicationService.submit(form);
    this.submitted = true;
  }

}
