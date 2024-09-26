import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/response/Response';
import { Plant } from 'src/app/model/Plant';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  constructor(private http: HttpClient) { }

  getPlantById(idPlant: number): Observable<ApiResponse<Plant>> {
    return this.http.get<ApiResponse<Plant>>(environment.apiUrlWebAdmin + '/getPlant/' + idPlant)
  }

  getAllPlant(): Observable<ApiResponse<Plant[]>> {
    return this.http.get<ApiResponse<Plant[]>>(environment.apiUrlWebAdmin + '/getAllPlant');
  }

  addPlant(plant: Plant): Observable<ApiResponse<Plant>> {
    return this.http
      .post<ApiResponse<Plant>>(environment.apiUrlWebAdmin + '/savePlant', plant)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updatePlant(plant: Plant) {
    return this.http
      .post<ApiResponse<Plant>>(environment.apiUrlWebAdmin + '/updatePlant', plant)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  deletePlant(idPlant: number) {
    return this.http
      .post<ApiResponse<Plant>>(environment.apiUrlWebAdmin + '/deletePlant/' + idPlant, {})
      .pipe(
        map(response => {
          return response;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

}
