import { Notificable } from "../interfaces/Notificable";
import { Renderizador } from "../utils/Renderizador";

export class Email implements Notificable {
  private destinatario: string;
  private asunto: string;
  private mensajeEnviado: boolean;

  constructor(destinatario: string, asunto: string) {
    this.destinatario = destinatario;
    this.asunto = asunto;
    this.mensajeEnviado = false;
  }

  enviar(mensaje: string): boolean {
    this.mensajeEnviado = true;
    Renderizador.enviado("EMAIL", this.destinatario, this.asunto, mensaje);
    return true;
  }

  obtenerEstado(): string {
    return this.mensajeEnviado
      ? `Email enviado a ${this.destinatario} - Asunto: ${this.asunto}`
      : `Email pendiente para ${this.destinatario}`;
  }
}
