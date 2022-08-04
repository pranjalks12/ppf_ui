import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavLeftModule } from 'src/app/modules/nav-left/nav-left.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './modules/catalog/catalog.component';
import { DeploymentsComponent } from './modules/deployments/deployments.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ProvisionComponent } from './modules/provision/provision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DeploymentDetailsComponent } from './modules/deployment-details/deployment-details.component';
import { AccountSetupComponent } from './modules/account-setup/account-setup.component';

const routes: Routes = [
  {
    path: '', component: CatalogComponent
    // loadChildren: () => import('src/app/modules/catalog/catalog.module').then(x => x.CatalogModule)
  },
  {
    path: 'provision/:type', component: ProvisionComponent
    // loadChildren: () => import('src/app/modules/provision/provision.module').then(x => x.ProvisionModule)
  },
  {
    path: 'deployments', component: DeploymentsComponent
    // loadChildren: () => import('src/app/modules/deployments/deployments.module').then(x => x.DeploymentsModule)
  },
  {
    path: 'deployments/:id', component: DeploymentDetailsComponent
    // loadChildren: () => import('src/app/modules/deployments/deployments.module').then(x => x.DeploymentsModule)
  },
  {
    path: 'account-setup', component: AccountSetupComponent
    // loadChildren: () => import('src/app/modules/deployments/deployments.module').then(x => x.DeploymentsModule)
  }
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent, CatalogComponent, ProvisionComponent, DeploymentsComponent, DeploymentDetailsComponent, AccountSetupComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    NavLeftModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
