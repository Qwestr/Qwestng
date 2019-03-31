import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QwestCreateComponent } from './qwest-create/qwest-create.component';
import { QwestListComponent } from './qwest-list/qwest-list.component';
import { QwestUpdateComponent } from './qwest-update/qwest-update.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'qwest-list', component: QwestListComponent },
  { path: 'qwest-create', component: QwestCreateComponent },
  { path: 'qwest-update/:id', component: QwestUpdateComponent }
];
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
