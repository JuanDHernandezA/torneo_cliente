import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { TorneoCrudService } from '../../../core/services/torneo-crud.service';
import { Posicion } from '../../../models/posicion.model';
import { Jugador } from '../../../models/jugador.model';

@Component({
  selector: 'app-crear-jugador',
  standalone: true,
  imports: [ MatInputModule, MatFormFieldModule, FormsModule, MatSelectModule, MatButtonModule, MatCheckboxModule ],
  templateUrl: './crear-jugador.component.html',
  styleUrl: './crear-jugador.component.css'
})
export class CrearJugadorComponent implements OnChanges{

  @Input() jugadorEditado: Jugador | null = null;
  @Output() jugadorAgregado = new EventEmitter<Jugador>();
  @Output() jugadorActualizado = new EventEmitter<Jugador>();

  jugador : Jugador = {//inicializar jugador del formulario
    nombre_jugador: '',
    numero_jugador: undefined,
    id_posicion: 0,
    es_capitan: true,
  };
  
  capitanSeleccionado = false;
  estaEditando = false;

  posiciones ?: Posicion[];//inicilizar variable de posiciones

  constructor(private apiService: TorneoCrudService) { }//inyectar servicio del API

  ngOnInit() {
    this.apiService.getPosiciones().subscribe(data => {//llamar al API para obtener las posiciones
      this.posiciones = data;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jugadorEditado'] && this.jugadorEditado) {
      this.jugador = { ...this.jugadorEditado };
      this.estaEditando = true;
    }
  }

  registrarJugador() {
    if (this.estaEditando) {
      this.jugadorActualizado.emit(this.jugador);
    } else {
      if (this.jugador.es_capitan) {
        this.capitanSeleccionado = true;
      }
      this.jugadorAgregado.emit(this.jugador);
    }
    this.reiniciarFormulario();
  }

  reiniciarFormulario() {
    this.jugador = {
      nombre_jugador: '',
      numero_jugador: undefined,
      id_posicion: 0,
      es_capitan: false,
    };
    this.estaEditando = false;
  }

}
