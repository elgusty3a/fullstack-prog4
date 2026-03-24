export interface Procesable {
  procesarPago(monto: number): boolean;
  obtenerDetalles(): string;
}
