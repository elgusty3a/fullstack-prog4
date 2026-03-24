import { Cuenta } from "./Cuenta";

export class CuentaCorriente extends Cuenta {
  private limiteSobregiro: number;
  private sobregiroActual: number;

  constructor(titular: string, saldoInicial: number = 0, limiteSobregiro: number = 500) {
    super(titular, saldoInicial);
    this.limiteSobregiro = limiteSobregiro;
    this.sobregiroActual = 0;
  }

  public extraer(monto: number): boolean {
    if (!this.validarMonto(monto)) {
      console.log(`Monto inválido para extracción`);
      return false;
    }

    const disponible = this.saldo + (this.limiteSobregiro - this.sobregiroActual);

    if (monto > disponible) {
      console.log("Operación denegada");
      console.log(`Fondos insuficientes. Disponible: $${disponible.toFixed(2)}`);
      return false;
    }

    if (monto <= this.saldo) {
      this.saldo -= monto;
      console.log("Extracción exitosa");
      console.log(this.obtenerEstado());
    } else {
      const resto = monto - this.saldo;
      this.saldo = 0;
      this.sobregiroActual += resto;
      console.log(`Extracción exitosa usando sobregiro: $${resto.toFixed(2)}`);
      console.log(this.obtenerEstado());
    }
    return true;
  }

  public getTipo(): string {
    return "CuentaCorriente";
  }

  public getLimiteSobregiro(): number {
    return this.limiteSobregiro;
  }

  public getSobregiroActual(): number {
    return this.sobregiroActual;
  }

  public getDisponible(): number {
    return this.saldo + (this.limiteSobregiro - this.sobregiroActual);
  }

  public override obtenerEstado(): string {
    return (
      super.obtenerEstado() +
      ` - Límite sobregiro: $${this.limiteSobregiro} - En uso: $${this.sobregiroActual.toFixed(2)}`
    );
  }
}
