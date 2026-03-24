import { MetodoPago } from "./MetodoPago";
import { Procesable } from "../interfaces/Procesable";

export class TarjetaCredito extends MetodoPago implements Procesable {
  private numero: string;
  private marca: string;
  private vencimiento: string;
  private limite: number;
  private disponible: number;

  constructor(titular: string, numero: string, marca: string, vencimiento: string, limite: number ) {
    super(titular);
    this.numero = numero;
    this.marca = marca;
    this.vencimiento = vencimiento;
    this.limite = limite;
    this.disponible = limite;
  }

  public getMontoDisponible(): number {
    return this.disponible;
  }

  public procesarPago(monto: number): boolean {
    const validacion = this.validarPago(monto);
    if (!validacion.valido) {
      console.log(validacion.mensaje);
      return false;
    }

    this.disponible -= monto;
    this.incrementarTransacciones();
    console.log(
      `Pago con tarjeta ${this.marca}: ${this.formatearMonto(monto)}`,
    );
    console.log(`\tNuevo disponible: ${this.formatearMonto(this.disponible)}`);
    return true;
  }

  public obtenerDetalles(): string {
    return `[Tarjeta ${this.marca}] ****${this.numero.slice(-4)} | Titular: ${this.titular} | Vence: ${this.vencimiento} | Disponible: ${this.formatearMonto(this.disponible)}`;
  }

  public getLimite(): number {
    return this.limite;
  }

  public getDisponible(): number {
    return this.disponible;
  }

  public recargarSaldo(monto: number): void {
    this.disponible = Math.min(this.disponible + monto, this.limite);
    console.log(
      `Saldo recargado. Nuevo disponible: ${this.formatearMonto(this.disponible)}`,
    );
  }
}
