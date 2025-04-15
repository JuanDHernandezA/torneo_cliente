import { Equipo } from "./equipo.model";
import { Jugador } from "./jugador.model";

export interface Tr_crear_equipo {
    equipo: Equipo;
    jugadores: Jugador[];
}