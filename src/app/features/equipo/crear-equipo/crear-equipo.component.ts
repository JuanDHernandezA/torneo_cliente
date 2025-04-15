import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { CrearJugadorComponent } from "../crear-jugador/crear-jugador.component";
import { Jugador } from '../../../models/jugador.model';
import { Equipo } from '../../../models/equipo.model';
import { CommonModule } from '@angular/common';
import { Tr_crear_equipo } from '../../../models/tr_crear_equipo.model';
import { TorneoCrudService } from '../../../core/services/torneo-crud.service';


@Component({
  selector: 'app-crear-equipo',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatSelectModule, MatButtonModule, CrearJugadorComponent, MatTableModule, CommonModule, MatIconModule],
  templateUrl: './crear-equipo.component.html',
  styleUrl: './crear-equipo.component.css'
})
export class CrearEquipoComponent {

  equipo: Equipo = {
    id_equipo: 0,
    nombre_equipo: ''
  };

  jugadores: Jugador[] = [];
  jugadorEnEdicion: Jugador | null = null;
  displayedColumns: string[] = ['nombre_jugador', 'numero_jugador', 'posicion', 'acciones'];

  mostrar_error = 1;
  mensaje_error = 'El primer jugador registrado debe ser el capitán del equipo.';
  color_mensaje_error = 'white';

  tr_crear_equipo : Tr_crear_equipo = {
    equipo: { id_equipo: 0, nombre_equipo: '' },
    jugadores: []
  };
  
  constructor(private apiService: TorneoCrudService) { }

  ingresarJugador(jugador: Jugador) {
    const dorsalExistente = this.jugadores.some(j => j.numero_jugador === jugador.numero_jugador);

    if (dorsalExistente) { //condicional para validar si el dorsal ya existe
      this.color_mensaje_error = 'red';
      this.mensaje_error = 'El dorsal ya está registrado.';
      this.mostrar_error = 1;
      return;
    }

    if (jugador.nombre_jugador != '' && jugador.numero_jugador != undefined && jugador.id_posicion != 0) { //condicional para validar si los campos están completos

      if (this.jugadores.length === 0) { //si es el primer jugador, será el capitán
        jugador.es_capitan = true;
      }

      this.jugadores = [...this.jugadores, jugador];
      this.mostrar_error = 0;
    } else {
      this.color_mensaje_error = 'red';
      this.mensaje_error = 'Debe completar todos los campos.';
      this.mostrar_error = 1;
    }
  }

  prepararEdicion(jugador: Jugador) {
    this.jugadorEnEdicion = { ...jugador }; // Copia del jugador a editar
    this.mostrar_error = 0;
  }

  actualizarJugador(jugadorActualizado: Jugador) {
    const index = this.jugadores.findIndex(j => j.numero_jugador === this.jugadorEnEdicion?.numero_jugador);

    const dorsalExistente = this.jugadores.some(j => j.numero_jugador === jugadorActualizado.numero_jugador);
    if (dorsalExistente) { //condicional para validar si el dorsal ya existe
      this.color_mensaje_error = 'red';
      this.mensaje_error = 'El dorsal ya está registrado.';
      this.mostrar_error = 1;
      return;
    }

    if (index !== -1) {
      this.jugadores = this.jugadores.map((jugador, i) =>
        i === index ? jugadorActualizado : jugador
      );
    }
    this.jugadorEnEdicion = null;
  }

  eliminarJugador(jugador: Jugador) {
    if (jugador.es_capitan && this.jugadores.length > 1) {
      this.jugadores[1].es_capitan = true;
    }

    this.jugadores = this.jugadores.filter(j => j !== jugador);
  }

  registrarEquipo() {

    if (this.equipo.nombre_equipo != '' && this.jugadores.length > 0) { //condicional para validar si el nombre del equipo y los jugadores están completos
      
      this.tr_crear_equipo.equipo = this.equipo;
      this.tr_crear_equipo.jugadores = this.jugadores;

      this.apiService.postTrCrearEquipo(this.tr_crear_equipo).subscribe(
        response => {
          console.log('Equipo registrado con éxito:', response);
          this.mostrar_error = 0;
          this.equipo = { id_equipo: 0, nombre_equipo: '' };
          this.jugadores = [];
        }
      );
    }
    else {
      this.color_mensaje_error = 'red';
      this.mensaje_error = 'Debe completar todos los campos.';
      this.mostrar_error = 1;
    }
  }
}
