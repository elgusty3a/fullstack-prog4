import { MetodoPago } from "./MetodoPago";
import { Procesable } from "../interfaces/Procesable";

export class TransferenciaBancaria extends MetodoPago implements Procesable {
  private banco: string;
  private numeroCuenta: string;
  private cbu: string;
  private alias: string;
  private saldo: number;

  constructor(
    titular: string,
    banco: string,
    numeroCuenta: string,
    cbu: string,
    alias: string,
    saldoInicial: number = 0
  ) {
    super(titular);
    this.banco = banco;
    this.numeroCuenta = numeroCuenta;
    this.cbu = cbu;
    this.alias = alias;
    this.saldo = saldoInicial;
  }

  public procesarPago(monto: number): boolean {
    if (!this.activo) {
      console.log(`❌ Cuenta inactiva`);
      return false;
    }
    if (monto > this.saldo) {
      console.log(`❌ Saldo insuficiente. Disponible: ${this.formatearMonto(this.saldo)}`);
      return false;
    }
    if (monto <= 0) {
      console.log(`❌ Monto inválido`);
      return false;
    }

    this.saldo -= monto;
    this.incrementarTransacciones();
    console.log(`✅ Transferencia desde ${this.banco}: ${this.formatearMonto(monto)}`);
    console.log(`   Nuevo saldo: ${this.formatearMonto(this.saldo)}`);
    return true;
  }

  public obtenerDetalles(): string {
    return `[Transferencia] Banco: ${this.banco} | Cuenta: ${this.numeroCuenta} | Alias: ${this.alias} | Saldo: ${this.formatearMonto(this.saldo)}`;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  public getBanco(): string {
    return this.banco;
  }

  public getAlias(): string {
    return this.alias;
  }

  public depositar(monto: number): void {
    if (monto > 0) {
      this.saldo += monto;
      console.log(`💰 Depósito recibido: ${this.formatearMonto(monto)}`);
    }
  }
}
