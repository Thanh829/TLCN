import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  wrongInfo: boolean = false;

  isLoading: boolean = false;

  constructor(private _auth: AuthService, private _msg: MessagesService) { }

  ngOnInit() {
    this.changeForm = new FormGroup({
      oldpassword: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      password_confirmation: new FormControl(null, {validators: [Validators.required]}),
    });

  }

  registerSubmit(){

    let oldpass = this.changeForm.value.oldpassword;
    let password = this.changeForm.value.password;

    this.isLoading = true;
    // Log the use in
    this._auth.changePassword(oldpass,password).subscribe(
      (data: any)=>{
        //this._auth.storeData(data.expires_in, data.access_token, data.refresh_token)

        // Sucess message
        this._msg.success("Congratulations!", "Your new account created successfully");
      },
      (error: any)=>{
        if(error.status == 401){
          this.wrongInfo = true;
        } else {
          this._msg.danger("Error!", "Check you internet connection or try latter");
        }
        this.isLoading = false;
      },
      ()=>{
        this.isLoading = false;
      }
    );

  }

  /**
   * Return whether the control is valid or not
   * @param controlName string
   */
  invalid(controlName){
    let control = this.changeForm.get(controlName);
    console.log(control)
    return control.touched && control.invalid;
    
  }

  /**
   * Return true if the control has the specified error, false otherwise
   * @param controlName string
   * @param errorName string
   */
  hasError(controlName, errorName){
    let control = this.changeForm.get(controlName);
    console.log(control)
    if(control.errors && control.errors[errorName] && this.invalid(controlName) ){
      return true;
    }
    return false;
  }

  /**
   * Return true if the passwords don't match, fale otherwise
   */
  passwordsNotMatch(){
    return this.changeForm.value.password !== this.changeForm.value.password_confirmation;
  }

}
