import { NgModule } from '@angular/core';
import { UploadComponent } from '../comps/upload/upload.component';
import { SettingsComponent } from '../comps/settings/settings.component';
import { ChangePasswordComponent } from '../comps/change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { LoadingButtonComponent } from '../comps/loading-button/loading-button.component';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [
        UploadComponent,
        SettingsComponent,
        ChangePasswordComponent,
    ],
    imports: [
        //BrowserModule, 
        FormsModule, 
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        UserRoutingModule,
        Ng2CompleterModule
    ],
    providers: [
        // AuthService,
        MessagesService,
    ]
})
export class UserModule{

}