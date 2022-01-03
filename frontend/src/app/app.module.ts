import { DealService } from './service/deal.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RegularDealsComponent } from './regular-deals/regular-deals.component';
import { SpecialDealsComponent } from './special-deals/special-deals.component';
import { DealsListComponent } from './deals-list/deals-list.component';
import { DealsAddComponent } from './deals-add/deals-add.component';
import { DealsEditComponent } from './deals-edit/deals-edit.component';
import { DealsAddSpecialComponent } from './deals-add-special/deals-add-special.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { DealsUploadComponent } from './deals-upload/deals-upload.component';
import { DealsDetailsComponent } from './deals-details/deals-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegularDealsComponent,
    SpecialDealsComponent,
    DealsListComponent,
    DealsAddComponent,
    DealsEditComponent,
    DealsAddSpecialComponent,
    CallbackComponent,
    DealsUploadComponent,
    DealsDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  
  ],
  providers: [AuthService, DealService, AuthGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
