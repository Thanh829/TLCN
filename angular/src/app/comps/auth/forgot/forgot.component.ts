import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  wrongInfo: boolean = false;

  isLoading: boolean = false;
  sentMail: boolean=true

  constructor(private _auth: AuthService, private _msg: MessagesService , private router: Router) { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      code: new FormControl(null, {validators: [Validators.required]})
    });
    this.sentMail=false
  }

  forgotSubmit(){
    let email = this.forgotForm.value.email;

    this.isLoading = true;
    // Log the use in
    if(!this.sentMail)
    {
    this._auth.forgot(email).subscribe(
      (data: any)=>{
        //this._auth.storeData(data.expires_in, data.access_token, data.refresh_token)
        this.sentMail= true;
        console.log(data.status)
      },
      (error: any)=>{
        if(error.status == 400){
          this.wrongInfo = true;
        } else {
          if(error.error.message=="Error: Unauthorized")
          this._msg.danger("Error!", "Wrong email");
          else
          this._msg.danger("Error!", "Check you internet connection or try latter");
        }
        this.isLoading = false;
      },
      ()=>{
        this.isLoading = false;
      }
    );

  }
  else{
    let code = this.forgotForm.value.code;
    this._auth.verify(code).subscribe(
      (data: any)=>{
        console.log(data.status)
      },
      (error: any)=>{
        if(error.status == 400){
          this.wrongInfo = true;
        } else {
          if(error.error.code==500)
          this._msg.danger("Error!", "Wrong email");
          else
          this._msg.danger("Error!", "Check you internet connection or try latter");
        }
        this.isLoading = false;
      },
      ()=>{
        this.isLoading = false;
      }
    );

  }
}

  /**
   * Return whether the control is valid or not
   * @param controlName string
   */
  invalid(controlName){
    let control = this.forgotForm.get(controlName);
    return control.touched && control.value;
  }
}