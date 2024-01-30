import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PolicyDocSearchComponent } from './Policy Doc/policy-doc-search/policy-doc-search.component';
import { PolicyDocAddComponent } from './Policy Doc/policy-doc-add/policy-doc-add.component';
import { PaperConsentSearchComponent } from './Paper Consent/paper-consent-search/paper-consent-search.component';
import { PaperConsentAddComponent } from './Paper Consent/paper-consent-add/paper-consent-add.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
import { PolicyDocDetailComponent } from './Policy Doc/policy-doc-detail/policy-doc-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { PrintDocumentComponent } from './print-document/print-document.component';
import { MemberSearchComponent } from './Member/member-search/member-search.component';
import { MemberAddComponent } from './Member/member-add/member-add.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PolicyDocSearchComponent,
    PolicyDocAddComponent,
    PaperConsentSearchComponent,
    PaperConsentAddComponent,
    LoginComponent,
    LogoutComponent,
    MainComponent,
    PolicyDocDetailComponent,
    PrintDocumentComponent,
    MemberSearchComponent,
    MemberAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
