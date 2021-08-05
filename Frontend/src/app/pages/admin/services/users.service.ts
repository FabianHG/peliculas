import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from '@app/shared/models/rol.interface';
import { PeliculaResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  lista(): Observable<PeliculaResponse[]> {
    return this.http.get<PeliculaResponse[]>(`${environment.URL_API}/usuario`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${environment.URL_API}/general/rol`).
    pipe(catchError((error) => 
      this.handleError(error)));
  }

  getById(): void {}

  new(pelicula: PeliculaResponse): Observable<any> {
    return this.http.put<any>(`${environment.URL_API}/pelicula`, pelicula)
    .pipe(catchError((error) => this.handleError(error)));
  }

  update(): void {}

  private handleError(err: any): Observable<never> {
    let errorMessage = "Ocurrio un error";

    if(err){
      errorMessage = `Error: ${ typeof err.error.message == 'undefined' ? err.message : err.error.message }`;
      this._snackBar.open(errorMessage, '', {
        duration: 6000
      });
    }
    return throwError(errorMessage);
  }

}
