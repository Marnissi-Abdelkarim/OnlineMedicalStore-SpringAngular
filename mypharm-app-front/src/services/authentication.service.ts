import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CatalogueService} from "./catalogue.service";

@Injectable()
export class AuthenticationService {
  public userAuthenticatedName;
  public userAuthenticated;
  private host: string = "http://localhost:8083";
  public jwtToken: string | null = null;
  // @ts-ignore
  private roles: Array<any>;

  constructor(private http: HttpClient,private cataService:CatalogueService) {
  }

  login(user: any) {
    return this.http.post(this.host + "/login", user, {observe: 'response'});
  }

  signup(newuser: any){

    return this.http.post(this.host+"/register",newuser,{observe: 'response'});
  }

  saveToken(jwt: string) {
    this.jwtToken=jwt;
    localStorage.setItem('token', jwt);
    let jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    localStorage.setItem('roles', JSON.stringify(this.roles));
    this.userAuthenticated=jwtHelper.decodeToken(this.jwtToken).sub;
    localStorage.setItem('userAuthenticated', this.userAuthenticated);
    this.cataService.getResource('/getusers/'+this.userAuthenticated).subscribe(data=>{
      // @ts-ignore
      this.userAuthenticatedName=data["username"];
      localStorage.setItem('userAuthenticatedName', this.userAuthenticatedName);
    },err=>{console.log("chkwa lah")})
   /* console.log(this.roles);
    console.log(this.userAuthenticated);*/
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');

    this.roles=JSON.parse(localStorage.getItem('roles'));
    this.userAuthenticated=localStorage.getItem('userAuthenticated');
    this.userAuthenticatedName=localStorage.getItem('userAuthenticatedName');


  }

  /*getTasks() {
    if (this.jwtToken == null) this.loadToken();
    // @ts-ignore
    return this.http.get(this.host + "/tasks", {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }*/

  logout() {
    this.jwtToken = null;
    this.roles=null;
    this.userAuthenticated=null;
    this.userAuthenticatedName=null;
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userAuthenticatedName');
  }

  isAdmin() {
    if(this.roles!=null) {
      for (let r of this.roles) {
        if (r.authority == 'ADMIN') return true;

      }

    }
    return false;
  }

  isAuthenticated()
  {
    this.loadToken();
    if(this.jwtToken!=null) return true;
    return false;
  }

}
