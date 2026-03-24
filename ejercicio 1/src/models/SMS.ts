import { Notificable } from "../interfaces/Notificable";
import { Renderizador } from "../utils/Renderizador";

export class SMS implements Notificable {
  private numeroTelefono: string;
  private mensajeEnviado: boolean;

  constructor(numeroTelefono: string) {
    this.numeroTelefono = numeroTelefono;
    this.mensajeEnviado = false;
  }

  enviar(mensaje: string): boolean {
    this.mensajeEnviado = true;
    Renderizador.enviado("SMS", this.numeroTelefono, "", mensaje);
    return true;
  }

  obtenerEstado(): string {
    return this.mensajeEnviado
      ? `SMS enviado al ${this.numeroTelefono}`
      : `SMS pendiente para ${this.numeroTelefono}`;
  }
}
