import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: 'photos-component', component: PhotosComponent },
  { path: 'register-component', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
