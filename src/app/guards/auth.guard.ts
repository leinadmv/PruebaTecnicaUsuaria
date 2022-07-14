import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService) { }

  canActivate(): boolean{
    if (this.authService.verifyTokent()) {
      return true;
    } else{
        if (this.authService.logOut()) {
          window.location.replace('/login');
          return false;
        }
    }
  }

}
