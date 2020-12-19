import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user';
@Injectable({
  providedIn: "root"
})

export class AuthService {
  logged: boolean = false;
  token: string;
  expires_in: number = parseInt(localStorage.getItem("expires_in"));
  access_token: string = null;
  refresh_token: string = null;
  roles:any;
  user: any = null; // Authenticated user

  artist:any
  artistId:number=0;
  artistActive:boolean
  artistUserId:number;

  userEmitter: EventEmitter<any> = new EventEmitter<any>();
  statusEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _http: HttpClient, private _router: Router) {
   this.refresh()
  }

  refresh()
  {
    let expires_in = parseInt(localStorage.getItem("expires_in"));
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    if(this.getUser()) 
    {
      this.artist=this.getUser()
      this.artistActive=this.getUser().active
      this.artistId=this.getUser().artistId
      this.artistUserId=this.getUser().id
      this.roles=this.getUser().roles
      this.getUserRoles().subscribe(
        res=>{
          this.roles=res
          console.log(this.roles)
        }
      )

    }
    if (expires_in > Date.now()) {

      this.logged = true;

      // get user
      let user = JSON.parse(localStorage.getItem("user"));

      this.expires_in = expires_in;
      this.access_token = access_token;
      this.refresh_token = refresh_token;

      this.storeData(expires_in, access_token, refresh_token, true);
    }
    else
    localStorage.clear(); 
  }

  /**
   * Return post request to log the user in
   * @param email string
   * @param password string
   */
  login(email: string, password: string) {

    return this._http.post(
      this.baseURL("api/v1/auth/signin"),
      {
        username: email,
        password: password
      }
    );
  }

  forgot(email:String)
  {
    return this._http.post(this.baseURL("api/v1/auth/forgot"),{
      email:email
    })
  }
  verify(code:String)
  {
    return this._http.post(this.baseURL("api/v1/auth/verify"),code)
  }

  /**
   * Return post request to log the user in
   * @param email string
   * @param password string
   */
  register(username: string, email: string, password: string) {

    return this._http.post(
      this.baseURL("api/v1/auth/signup"),
      {
        username, email, password
      }
    );
  }


  artistRegister(username: string, email: string, password: string) {

    return this._http.post(
      this.baseURL("api/v1/artist/signup"),
      {
        username, email, password
      }
    );
  }

  changePassword(oldPass:string, newPassword:string)
  {
    let fd = new FormData()
    fd.append("oldpass", oldPass);
    fd.append("newpass", newPassword)

    return this._http.post(this.baseURL("api/v1/auth/changepassword"),fd)
  }

  storeData(expires_in: number, access_token: string, refresh_token: string, bootstraping: boolean = false) {
    this.expires_in = expires_in;
    this.access_token = access_token;
    this.refresh_token = refresh_token;

    this.logged = true;
    this.statusEmitter.emit(this.logged);

    // Store in the localstorage
    localStorage.setItem("expires_in", this.expires_in.toString());
    localStorage.setItem("access_token", this.access_token);
    localStorage.setItem("refresh_token", this.refresh_token);

    // Get user info
    this.getUserInfo();

    // Redirect user to home page
    if(!bootstraping){
      this.redirectHome();
    }

  }

  isUser()
  {
    let is=false
    if(this.isLogged()&&this.roles){
      let roles=this.roles
      roles.forEach(element => { if(element=="ROLE_USER")
        is=true
      });
      return is;
    }
    else console.log("admin null")
  }

  isArtist()
  {
    let is=false
    if(this.isLogged()&&this.roles){
      let roles=this.roles
      roles.forEach(element => { if(element=="ROLE_MODERATOR")
        is=true
      });
      return is;
    }
    else console.log("artist null")
  }

  isAdmin()
  {
    let is=false
    console.log(this.isLogged()+this.roles)
    if(this.isLogged()==true&&this.roles!=null){
      let roles=this.roles
      roles.forEach(element => { if(element=="ROLE_ADMIN")
        is=true
      });
      return is;
    }
    else console.log("admin null")
  }

  getUserInfo() {

    this._http
      .post(
        this.baseURL("api/me"),
        {}
      )
      .subscribe(
        (user: any) => {
          this.storeUser(user);
        },
        error => {}
      );
  }

  /**
   * Store user data in localstorage and emit user event
   * @param user
   */
  storeUser(user: any) {
    this.user = user;
    this.userEmitter.emit(this.user);
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  /**
   * Return the full URL to the end point
   * @param url string
   */
  baseURL(url: string = "") {
    return environment.url + url;
  }

  /**
   * Redirect the user to home page
   */
  redirectHome() {
    this._router.navigate(["/start"]);
  }
  /**
   * Redirect the user to profile page
   */
  redirectProfile() {
    this._router.navigate(["/user", this.user.slug]);
  }

  isLogged() {
    return this.logged;
  }

  getUserRoles()
  {
    return this._http.get(`http://localhost:8090/api/v1/auth/get-roles?id=${this.getUser().id}`)
  }

  logout() {
    this.logged = null;
    this.token = null;
    this.expires_in = null;
    this.access_token = null;
    this.refresh_token = null;

    // Store the song player values
    let volume = localStorage.getItem("volume");

    localStorage.clear(); // Clear the storage
    
    // Set the song player values
    if(volume){
      localStorage.setItem("volume", volume);
    }

    this.userEmitter.emit(null);
    this.statusEmitter.emit(null);

    this.redirectHome();
  }

  // changePassword(old: string, newPassword: string, confirm: string) {

  //   return this._http.post(environment.url + "/api/user/password", {
  //     old_password: old,
  //     password: newPassword,
  //     password_confirmation: confirm
  //   });
  // }


  /**
   * Increase user song number
   * @param n number
   */
  addSongNumber(n: number){
    this.user.songs_number -= n;
      
    this.userEmitter.next(this.user);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.logged = true;
    this.statusEmitter.emit(this.logged);
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

}
