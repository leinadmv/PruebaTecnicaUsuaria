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

  getProducts() {
    return PRODUCTS;
  }

  /**
   * @author Daniel Martinez
   * @fecha 12/05/2022
   * Servicio delete que se encarga de eliminar un post
   * @returns codigo de servicio exitoso
   */
  deletePost(id): Observable<any> {
    return this.http.delete<any>(`${JSON}posts/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * @author Daniel Martinez
   * @fecha 12/05/2022
   * Servicio post que se encarga de guardar un post
   * @param post: el post que se guardar como json con los datos iduser, title, body
   * @returns retorna el post creado
   */
  savePost(post): Observable<any> {
    return this.http.post<any>(`${JSON}posts`, post)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * @author Daniel Martinez
   * @fecha 12/05/2022
   * Servicio put que se encarga de editar un post
   * @param id: id del post a editar
   * @param post: el post que se guardar como json con los datos id, iduser, title, body
   * @returns retorna el post creado
   */
  updatePost(id, post): Observable<any> {
    return this.http.put<any>(`${JSON}posts/${id}`,post)
      .pipe(
        catchError(this.handleError)
      );
  }

}


