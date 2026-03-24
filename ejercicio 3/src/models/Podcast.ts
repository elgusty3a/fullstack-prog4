import { Contenido } from "./Contenido";

export class Podcast extends Contenido {
  private plataforma: string;

  constructor(titulo: string, autor: string, duracion: number, plataforma: string = "Spotify") {
    super(titulo, autor, duracion);
    this.plataforma = plataforma;
  }

  public getPlataforma(): string {
    return this.plataforma;
  }

  public getVolumen(): number {
    return this.volumen;
  }

  public getVelocidad(): number {
    return this.velocidadReproduccion;
  }

  protected simularReproduccion(): void {
    if (this.reproduciendo && !this.pausado) {
      this.tiempoActual = Math.min(this.tiempoActual + this.velocidadReproduccion, this.duracion);
      console.log(`   Reproduciendo a ${this.velocidadReproduccion}x - Minuto: ${this.tiempoActual}/${this.duracion} - Volumen: ${this.volumen}%`);
      if (this.tiempoActual >= this.duracion) {
        console.log(`   Podcast terminado: "${this.titulo}"`);
        this.reproduciendo = false;
        this.tiempoActual = 0;
      }
    }
  }

  public obtenerInfo(): string {
    return `${super.obtenerInfo()} (${this.plataforma})`;
  }
}