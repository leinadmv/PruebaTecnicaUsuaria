import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
//import jwt_decode from 'jwt-decode';
import { USERS } from '..//librerias/users';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


const keyJwt = environment.KEYJWT;

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  Authentification(user: any, password: any){

    let users = USERS;

    let userFind = users.find(item => item.username === user && item.password === password);

    if(userFind){

      localStorage.setItem('token', this.signToken(user, password, keyJwt));

      return true;

    } else{

      return false;
    }

  }

  signToken(user:any, password:any, key:string) {
    var secret = key;
    let token:any = this.encodeToken(user, password);

    var signature:any = CryptoJS.HmacSHA256(token, secret);
    signature = this.base64url(signature);

    var signedToken = token + "." + signature;
    return signedToken;
  }

  encodeToken(user:any, password:any) {
    var header = {
      "alg": "HS256",
      "typ": "JWT"
    };

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = this.base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify({ user: user, password: password }));
    var encodedData = this.base64url(stringifiedData);

    return encodedHeader + "." + encodedData;
  }

  base64url(source: any) {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, '');

    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }

  verifyTokent(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut(): boolean {

    localStorage.clear();
    this.router.navigate(['/login']);

    return true;
  }
}
