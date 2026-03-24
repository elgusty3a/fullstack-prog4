export interface Notificable {
  enviar(mensaje: string): boolean;
  obtenerEstado(): string;
}
