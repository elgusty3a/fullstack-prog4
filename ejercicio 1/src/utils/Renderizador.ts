export class Renderizador {
  static enviado(tipo: string, destino: string, asunto: string, mensaje: string): void {
    console.log(`\n[ENVIADO - ${tipo}]`);
    console.log(`Destinatario: ${destino}`);
    (asunto !== "") ? console.log(`Asunto: ${asunto}`) : null;
    console.log(`Mensaje: ${mensaje}`);
    console.log("----------------------------");
  }

  static estado(titulo: string, estado: string): void {
    console.log(`\n[${titulo.toUpperCase()}]`);
    console.log(`Estado: ${estado}`);
    console.log("----------------------------");
  }
}
