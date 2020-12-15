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
import { ListinvoiceComponent } from './comps/listinvoice/listinvoice.component';
import { PlaylistComponent } from './comps/playlist/playlist.component';
import { StartComponent } from './comps/start/start.component';
import { UserPlaylistsComponent } from './comps/user-playlists/user-playlists.component';
import { ArtistPageComponent } from './comps/artist-page/artist-page.component';
import { ForgotComponent } from './comps/auth/forgot/forgot.component';
import { ArtistManagementComponent } from './comps/artist-management/artist-management.component';
import { TagManagementComponent } from './comps/tag-management/tag-management.component';
import { ArtistRevenueComponent } from './comps/artist-revenue/artist-revenue.component';
import { ArtistInvoiceComponent } from './comps/artist-invoice/artist-invoice.component';
import { UsersComponent } from './comps/users/users.component';


export const routes: Routes = [
  
  {path: "start", component: HomeComponent, children: [
  {path: "login", component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: "register", component: RegisterComponent, canActivate: [NotAuthGuard]}
  ]},
  {path: "settings", loadChildren: "./user/user.module#UserModule"},
  {path: "search/:id/:query", component: SearchComponent},
  {path: "user", component: ProfileComponent,canActivate:[AuthGuardGuard]},
  {path: "upload", component: UploadComponent},
  {path: "tags", component: TagComponent},
  {path: "test", component: TestComponent},
  {path: "artist", component: ArtistPageComponent},
  {path: "", component: StartComponent},
  {path: "cart", component: CartComponent,canActivate:[AuthGuardGuard]},
  {path: "list-invoice", component: ListinvoiceComponent},
  {path: "invoice", component: InvoiceComponent},
  {path: "setting", component: SettingsComponent, canActivate: [AuthGuardGuard]},
  {path: "user-playlists", component: UserPlaylistsComponent},
  {path: "playlist", component: PlaylistComponent,canActivate:[AuthGuardGuard]},
  {path: "forgot", component: ForgotComponent},
  {path: "change-password", component: ChangePasswordComponent},
  {path: "manage-artist", component: ArtistManagementComponent},
  {path: "manage-tag", component: TagManagementComponent},
  {path: "revenue", component: ArtistRevenueComponent},
  {path: "artist-detail-invoice", component: ArtistInvoiceComponent},
  {path: "all-artist", component: UsersComponent},
  {path: "**", redirectTo: "404"},
  {path: "404", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
