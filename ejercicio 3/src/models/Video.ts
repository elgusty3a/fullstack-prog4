import { Contenido } from "./Contenido";

export class Video extends Contenido {
  private resolucion: string;

  constructor(titulo: string, autor: string, duracion: number, resolucion: string = "1080p") {
    super(titulo, autor, duracion);
    this.resolucion = resolucion;
  }

  public setResolucion(nuevaResolucion: string): void {
    this.resolucion = nuevaResolucion;
    console.log(`Resolución cambiada a ${this.resolucion}`);
  }

  public getResolucion(): string {
    return this.resolucion;
  }

  public getVelocidad(): number {
    return this.velocidadReproduccion;
  }

  public getVolumen(): number {
    return this.volumen;
  }

  protected simularReproduccion(): void {
    if (this.reproduciendo && !this.pausado) {
      const avance = this.velocidadReproduccion;
      this.tiempoActual = Math.min(this.tiempoActual + avance, this.duracion);
      console.log(`   Reproduciendo [${this.resolucion}] a ${this.velocidadReproduccion}x - Minuto: ${this.tiempoActual}/${this.duracion}`);
      if (this.tiempoActual >= this.duracion) {
        console.log(`   Video terminado: "${this.titulo}"`);
        this.reproduciendo = false;
        this.tiempoActual = 0;
      }
    }
  }

  public obtenerInfo(): string {
    return `${super.obtenerInfo()} [${this.resolucion}]`;
  }
}