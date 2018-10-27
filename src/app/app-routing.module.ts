import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { QwestListComponent } from './qwest-list/qwest-list.component';
import { QwestCreateComponent } from './qwest-create/qwest-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'qwest-list', component: QwestListComponent },
  { path: 'qwest-create', component: QwestCreateComponent }
];
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
