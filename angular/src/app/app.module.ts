import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comps/home/home.component';
import { LoginComponent } from './comps/auth/login/login.component';
import { RegisterComponent } from './comps/auth/register/register.component';
import { NavbarComponent } from './comps/navbar/navbar.component';
import { FooterComponent } from './comps/footer/footer.component';
import { SearchFormComponent } from './comps/forms/search-form/search-form.component';
import { AuthService } from './shared/services/auth.service';
import { UsersComponent } from './comps/users/users.component';
import { UserCardComponent } from './comps/users/user-card/user-card.component';
import { SearchComponent } from './comps/search/search.component';
import { SongCardComponent } from './comps/song-card/song-card.component';
import { ProfileComponent } from './comps/users/profile/profile.component';
import { FetchingComponent } from './comps/fetching/fetching.component';
import { UploadComponent } from './comps/upload/upload.component';
import { SettingsComponent } from './comps/settings/settings.component';
import { ChangePasswordComponent } from './comps/change-password/change-password.component';
import { MusicPlayerComponent } from './comps/music-player/music-player.component';
import { MusicPlayerService } from './shared/services/music-player.service';
import { NotFoundComponent } from './comps/not-found/not-found.component';
import { MessagesService } from './shared/services/messages.service';
import { LoadingButtonComponent } from './comps/loading-button/loading-button.component';
import { SharedModule } from './shared/modules/shared.module';
import { UserModule } from './user/user.module';
//import { httpInterceptorsProviders } from './shared/interceptors';
import { TimePipe } from './shared/pipes/time.pipe';
import { TagComponent } from './comps/tag/tag.component';
import { TestComponent } from './comps/test/test.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { CartComponent } from './comps/cart/cart.component';
import { IgxAvatarModule, IgxIconModule, IgxListModule, IgxSliderModule, IgxToastModule, IgxIconService, IgxFilterModule, IgxRippleModule, IgxForOfModule, IgxInputGroupModule } from "igniteui-angular";
import { NgxPayPalModule } from 'ngx-paypal';
import { CartitemComponent } from './comps/cart/cartitem/cartitem.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    SearchFormComponent,
    UsersComponent,
    UserCardComponent,
    SearchComponent,
    SongCardComponent,
    ProfileComponent,
    FetchingComponent,
    MusicPlayerComponent,
    NotFoundComponent,
    TimePipe,
    TagComponent,
    TestComponent,
    CartComponent,
    CartitemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    SharedModule,
    UserModule,
    Ng2CompleterModule,
    IgxAvatarModule,
    IgxIconModule,
    IgxListModule,
    IgxSliderModule,
    IgxToastModule,
    IgxFilterModule,
    IgxRippleModule,
    IgxForOfModule,
    IgxInputGroupModule,
    NgxPayPalModule
  ],
  providers: [
    AuthService,
    MusicPlayerService,
    MessagesService,
    IgxIconService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
