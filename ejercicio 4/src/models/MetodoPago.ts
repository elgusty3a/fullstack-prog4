export abstract class MetodoPago {
  protected titular: string;
  protected activo: boolean;
  protected transacciones: number;

  constructor(titular: string) {
    this.titular = titular;
    this.activo = true;
    this.transacciones = 0;
  }

  public abstract procesarPago(monto: number): boolean;

  public abstract obtenerDetalles(): string;

  public estaActivo(): boolean {
    return this.activo;
  }

  public setActivo(estado: boolean): void {
    this.activo = estado;
  }

  public getTransacciones(): number {
    return this.transacciones;
  }

  protected incrementarTransacciones(): void {
    this.transacciones++;
  }

  protected formatearMonto(monto: number): string {
    return monto.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  }
}
