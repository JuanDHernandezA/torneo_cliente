import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posicion } from '../../models/posicion.model';
import { Tr_crear_equipo } from '../../models/tr_crear_equipo.model';

@Injectable({
  providedIn: 'root'
})
export class TorneoCrudService {

  private url = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  //GET posiciones
  getPosiciones(): Observable<Posicion[]> {
    return this.http.get<Posicion[]>(`${this.url}/posicion`);
  }

  //POST tr_crear_equipo
  postTrCrearEquipo(tr_crear_equipo: Tr_crear_equipo): Observable<any> {
    return this.http.post(`${this.url}/tr_registrar_equipo`, tr_crear_equipo);
  }
}
