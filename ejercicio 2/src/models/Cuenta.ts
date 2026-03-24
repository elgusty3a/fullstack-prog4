export abstract class Cuenta {
  protected titular: string;
  protected saldo: number;
  protected numeroCuenta: string;

  constructor(titular: string, saldoInicial: number = 0) {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.numeroCuenta = this.generarNumeroCuenta();
  }

  private generarNumeroCuenta(): string {
    return "CUENTA-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0"); //con esto puedo generar numeros de 6 cifras para los numeros de cuentas
  }

  protected validarMonto(monto: number): boolean {
    return monto > 0; //el monto no puede ser menos a 0 para hacer transacciones en general
  }

  public depositar(monto: number): boolean {
    if (!this.validarMonto(monto)) {
      console.log(`Monto inválido para depósito`);
      return false;
    }
    this.saldo += monto;
    console.log("Depósito exitoso");
    console.log(this.obtenerEstado());
    return true;
  }

  public abstract extraer(monto: number): boolean;

  public getSaldo(): number {
    return this.saldo;
  }

  public getTitular(): string {
    return this.titular;
  }

  public getNumeroCuenta(): string {
    return this.numeroCuenta;
  }

  public abstract getTipo(): string;

  public obtenerEstado(): string {
    return `[${this.getTipo()}] ${this.numeroCuenta} - Titular: ${this.titular} - Saldo: $${this.saldo.toFixed(2)}`;
  }
}
