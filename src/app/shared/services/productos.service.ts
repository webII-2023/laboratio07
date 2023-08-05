import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Productos } from '../models/productos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Productos[]> {
    return this.http.get<Productos[]>('http://localhost:3000/productos');
  }
  guardar(producto: Productos): Observable<Productos> {
    return this.http
      .post<Productos>('http://localhost:3000/productos', producto)
      .pipe(catchError(this.handlerError));
  }
  modificar(producto: Productos): Observable<Productos> {
    return this.http
      .patch<Productos>('http://localhost:3000/productos', producto)
      .pipe(catchError(this.handlerError));
  }

  eliminar(id: number): Observable<Productos> {
    return this.http
      .delete<Productos>('http://localhost:3000/productos/' + id)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: any): Observable<never> {
    console.log(error);
    return throwError(error);
  }
}
