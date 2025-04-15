import { Routes } from '@angular/router';
import { CrearEquipoComponent } from './features/equipo/crear-equipo/crear-equipo.component';
import { CrearJugadorComponent } from './features/equipo/crear-jugador/crear-jugador.component';

export const routes: Routes = [
    {path: '', component: CrearEquipoComponent}
];
