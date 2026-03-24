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

  public getMontoDisponible(): number {
    return this.saldo;
  }

  public procesarPago(monto: number): boolean {
    const validacion = this.validarPago(monto);
    if (!validacion.valido) {
      console.log(validacion.mensaje);
      return false;
    }

    this.saldo -= monto;
    this.incrementarTransacciones();
    console.log(`Transferencia desde ${this.banco}: ${this.formatearMonto(monto)}`);
    console.log(`\tNuevo saldo: ${this.formatearMonto(this.saldo)}`);
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
      console.log(`Depósito recibido: ${this.formatearMonto(monto)}`);
    }
  }
}
