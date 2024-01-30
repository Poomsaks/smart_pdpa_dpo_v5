import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PolicyDocSearchComponent } from './Policy Doc/policy-doc-search/policy-doc-search.component';
import { PolicyDocAddComponent } from './Policy Doc/policy-doc-add/policy-doc-add.component';
import { PaperConsentSearchComponent } from './Paper Consent/paper-consent-search/paper-consent-search.component';
import { PaperConsentAddComponent } from './Paper Consent/paper-consent-add/paper-consent-add.component';
import { AuthGuard } from './AuthGuard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
import { PolicyDocDetailComponent } from './Policy Doc/policy-doc-detail/policy-doc-detail.component';
import { PrintDocumentComponent } from './print-document/print-document.component';
import { MemberSearchComponent } from './Member/member-search/member-search.component';
import { MemberAddComponent } from './Member/member-add/member-add.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'policy-doc-search', component: PolicyDocSearchComponent, canActivate: [AuthGuard] },
      { path: 'policy-doc-add', component: PolicyDocAddComponent, canActivate: [AuthGuard] },
      { path: 'paper-consent-search', component: PaperConsentSearchComponent, canActivate: [AuthGuard] },
      { path: 'paper-consent-add', component: PaperConsentAddComponent, canActivate: [AuthGuard] },
      { path: 'policy-doc-detail', component: PolicyDocDetailComponent, canActivate: [AuthGuard] },

      { path: 'member-search', component: MemberSearchComponent, canActivate: [AuthGuard] },
      { path: 'member-add', component: MemberAddComponent, canActivate: [AuthGuard] },

    ]
  },
  { path: 'print-document', component: PrintDocumentComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
