import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { PRODUCTS } from '../librerias/products';

const JSON = environment.JSON;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  /**
   * @autor Jhonthan lopez
   * Servicio que se encarga de retornar los productos
   * @returns Productos
   */
  getProducts() {
    return PRODUCTS;
  }

}


