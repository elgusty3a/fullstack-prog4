import { MetodoPago } from "./MetodoPago";
import { Procesable } from "../interfaces/Procesable";

export class BilleteraVirtual extends MetodoPago implements Procesable {
  private nombre: string;
  private email: string;
  private saldo: number;
  private bonus: number;

  constructor(titular: string, nombre: string, email: string, saldoInicial: number = 0) {
    super(titular);
    this.nombre = nombre;
    this.email = email;
    this.saldo = saldoInicial;
    this.bonus = 0;
  }

  public procesarPago(monto: number): boolean {
    if (!this.activo) {
      console.log(`❌ Billetera inactiva`);
      return false;
    }

    const totalDisponible = this.saldo + this.bonus;
    if (monto > totalDisponible) {
      console.log(`Saldo insuficiente. Disponible: ${this.formatearMonto(totalDisponible)}`);
      return false;
    }
    if (monto <= 0) {
      console.log(`Monto inválido`);
      return false;
    }

    let montoRestante = monto;

    if (this.bonus > 0) {
      const usoBonus = Math.min(this.bonus, montoRestante);
      this.bonus -= usoBonus;
      montoRestante -= usoBonus;
      console.log(`Se usó ${this.formatearMonto(usoBonus)} de bonus`);
    }

    if (montoRestante > 0) {
      this.saldo -= montoRestante;
    }

    this.incrementarTransacciones();
    console.log(`Pago con ${this.nombre}: ${this.formatearMonto(monto)}`);
    console.log(`\tSaldo: ${this.formatearMonto(this.saldo)} | Bonus: ${this.formatearMonto(this.bonus)}`);
    return true;
  }

  public obtenerDetalles(): string {
    return `[${this.nombre}] Email: ${this.email} | Titular: ${this.titular} | Saldo: ${this.formatearMonto(this.saldo)} | Bonus: ${this.formatearMonto(this.bonus)}`;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  public getBonus(): number {
    return this.bonus;
  }

  public getTotal(): number {
    return this.saldo + this.bonus;
  }

  public recargar(monto: number): void {
    if (monto > 0) {
      this.saldo += monto;
      console.log(`Recarga exitosa: ${this.formatearMonto(monto)}`);
    }
  }

  public agregarBonus(monto: number): void {
    if (monto > 0) {
      this.bonus += monto;
      console.log(`Bonus agregado: ${this.formatearMonto(monto)}`);
    }
  }
}
