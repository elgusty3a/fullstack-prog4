export abstract class MetodoPago {
  protected titular: string;
  protected activo: boolean;
  protected transacciones: number;

  constructor(titular: string) {
    this.titular = titular;
    this.activo = true;
    this.transacciones = 0;
  }

  public abstract getMontoDisponible(): number;

  public abstract procesarPago(monto: number): boolean;

  public abstract obtenerDetalles(): string;

  protected validarPago(monto: number): { valido: boolean; mensaje?: string } {
    if (!this.activo) {
      return { valido: false, mensaje: "Método de pago inactivo" };
    }
    if (monto <= 0) {
      return { valido: false, mensaje: "Monto inválido" };
    }
    if (monto > this.getMontoDisponible()) {
      return { valido: false, mensaje: `Saldo insuficiente. Disponible: ${this.formatearMonto(this.getMontoDisponible())}` };
    }
    return { valido: true };
  }

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
