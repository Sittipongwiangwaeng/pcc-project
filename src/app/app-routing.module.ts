import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { SumaryComponent } from './sumary/sumary.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
//   { path: 'input', component: InputComponent },
//   { path: 'sumary', component: SumaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
