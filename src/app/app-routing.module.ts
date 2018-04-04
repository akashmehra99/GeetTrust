import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessFalconeComponent } from './success-falcone/success-falcone.component';
import { FindFalconeComponent } from './find-falcone/find-falcone.component';
import { FailureFalconeComponent } from './failure-falcone/failure-falcone.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/welcome', pathMatch: 'full'
  },
  {
    path: 'success', component: SuccessFalconeComponent
  },
  {
    path: 'welcome', component: FindFalconeComponent
  },
  {
    path: 'failure', component: FailureFalconeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
