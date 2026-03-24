import { MetodoPago } from "./MetodoPago";
import { Procesable } from "../interfaces/Procesable";

export class TarjetaCredito extends MetodoPago implements Procesable {
  private numero: string;
  private marca: string;
  private vencimiento: string;
  private limite: number;
  private disponible: number;

  constructor(
    titular: string,
    numero: string,
    marca: string,
    vencimiento: string,
    limite: number
  ) {
    super(titular);
    this.numero = numero;
    this.marca = marca;
    this.vencimiento = vencimiento;
    this.limite = limite;
    this.disponible = limite;
  }

  public procesarPago(monto: number): boolean {
    if (!this.activo) {
      console.log(`❌ Tarjeta inactiva`);
      return false;
    }
    if (monto > this.disponible) {
      console.log(`❌ Límite insuficiente. Disponible: ${this.formatearMonto(this.disponible)}`);
      return false;
    }
    if (monto <= 0) {
      console.log(`❌ Monto inválido`);
      return false;
    }

    this.disponible -= monto;
    this.incrementarTransacciones();
    console.log(`✅ Pago con tarjeta ${this.marca}: ${this.formatearMonto(monto)}`);
    console.log(`   Nuevo disponible: ${this.formatearMonto(this.disponible)}`);
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
    console.log(`💳 Saldo recargado. Nuevo disponible: ${this.formatearMonto(this.disponible)}`);
  }
}
