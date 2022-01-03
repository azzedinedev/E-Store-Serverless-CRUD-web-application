import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RegularDealsComponent } from './regular-deals/regular-deals.component';
import { DealsListComponent } from './deals-list/deals-list.component';
import { SpecialDealsComponent } from './special-deals/special-deals.component';
import { DealsEditComponent } from './deals-edit/deals-edit.component';
import { DealsAddSpecialComponent } from './deals-add-special/deals-add-special.component';
import { DealsAddComponent } from './deals-add/deals-add.component';
import { AuthGuardService } from './service/auth-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { DealsUploadComponent } from './deals-upload/deals-upload.component';
import { DealsDetailsComponent } from './deals-details/deals-details.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/regular-deals' },
  { path: 'callback', component: CallbackComponent},
  { path: 'regular-deals', component: RegularDealsComponent},
  { path: 'special-deals', component: SpecialDealsComponent},
  { path: 'deals-list', component: DealsListComponent, canActivate: [AuthGuardService]},
  { path: 'deals-edit/:id', component: DealsEditComponent, canActivate: [AuthGuardService]},
  { path: 'deals-add', component: DealsAddComponent, canActivate: [AuthGuardService] },
  { path: 'deals-add-special/:id', component: DealsAddSpecialComponent, canActivate: [AuthGuardService]},
  { path: 'deals-upload/:id', component: DealsUploadComponent, canActivate: [AuthGuardService]},
  { path: 'deals-details/:id', component: DealsDetailsComponent }





];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
