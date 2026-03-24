import { Cuenta } from "./Cuenta";

export class CuentaAhorro extends Cuenta {
  private tasaInteres: number;

  constructor(titular: string, saldoInicial: number = 0, tasaInteres: number = 0.05) {
    super(titular, saldoInicial);
    this.tasaInteres = tasaInteres;
  }

  public extraer(monto: number): boolean {
    if (!this.validarMonto(monto)) {
      console.log(`Monto inválido para extracción`);
      return false;
    }

    if (monto > this.saldo) {
      console.log(`Saldo insuficiente. Saldo actual: $${this.saldo.toFixed(2)}`);
      return false;
    }
    this.saldo -= monto;
    console.log("Extracción exitosa");
    console.log(this.obtenerEstado());
    return true;
  }

  public getTipo(): string {
    return "CuentaAhorro";
  }

  public calcularInteres(): number {
    return this.saldo * this.tasaInteres;
  }

  public obtenerEstado(): string {
    return (
      super.obtenerEstado() +
      ` - Tasa Interés: ${(this.tasaInteres * 100).toFixed(1)}%`
    );
  }
}
