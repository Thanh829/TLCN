import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comps/home/home.component';
import { LoginComponent } from './comps/auth/login/login.component';
import { RegisterComponent } from './comps/auth/register/register.component';
import { SearchComponent } from './comps/search/search.component';
import { ProfileComponent } from './comps/users/profile/profile.component';
import { UploadComponent } from './comps/upload/upload.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { SettingsComponent } from './comps/settings/settings.component';
import { ChangePasswordComponent } from './comps/change-password/change-password.component';
import { NotFoundComponent } from './comps/not-found/not-found.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { TagComponent } from './comps/tag/tag.component';
import { TestComponent } from './comps/test/test.component';
import { CartComponent } from './comps/cart/cart.component';
import { InvoiceComponent } from './comps/invoice/invoice.component';


export const routes: Routes = [
  {path: "", component: HomeComponent, children: [
  {path: "login", component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: "register", component: RegisterComponent, canActivate: [NotAuthGuard]}
  ]},
  {path: "settings", loadChildren: "./user/user.module#UserModule"},
  {path: "search/:query", component: SearchComponent},
  {path: "user", component: ProfileComponent,canActivate:[AuthGuardGuard]},
  {path: "upload", component: UploadComponent},
  {path: "tags", component: TagComponent},
  {path: "test", component: TestComponent},
  {path: "cart", component: CartComponent,canActivate:[AuthGuardGuard]},
  {path: "invoice", component: InvoiceComponent},
  {path: "**", redirectTo: "404"},
  {path: "404", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
