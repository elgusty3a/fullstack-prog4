import { Reproducible } from "../interfaces/Reproducible";

export abstract class Contenido implements Reproducible {
  protected titulo: string;
  protected autor: string;
  protected duracion: number;
  protected fechaPublicacion: Date;
  protected reproduciendo: boolean = false;
  protected pausado: boolean = false;
  protected tiempoActual: number = 0;
  protected velocidadReproduccion: number = 1;
  protected volumen: number = 80;
  private minVel: number = 0.25;
  private maxVel: number = 2;


  constructor(titulo: string, autor: string, duracion: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.duracion = duracion;
    this.fechaPublicacion = new Date();
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getAutor(): string {
    return this.autor;
  }

  public getDuracion(): number {
    return this.duracion;
  }

  public getFechaPublicacion(): string {
    return this.fechaPublicacion.toLocaleDateString();
  }

  public obtenerInfo(): string {
    return `"${this.titulo}" por ${this.autor} - ${this.duracion} min`;
  }

  public reproducir(): void {
    if (this.pausado) {
      this.pausado = false;
      console.log(`Reanudando: "${this.titulo}"`);
    } else {
      this.reproduciendo = true;
      console.log(`Reproduciendo: "${this.titulo}"`);
    }
    this.simularReproduccion();
  }

  public pausar(): void {
    if (this.reproduciendo && !this.pausado) {
      this.pausado = true;
      console.log(`Pausado en el minuto ${this.tiempoActual}`);
    }
  }

  public detener(): void {
    this.reproduciendo = false;
    this.pausado = false;
    this.tiempoActual = 0;
    console.log(`Detenido: "${this.titulo}"`);
  }

  public getTiempoActual(): number {
    return this.tiempoActual;
  }

  public setVelocidad(velocidad: number): void {
    if (velocidad >= this.minVel && velocidad <= this.maxVel) {
      this.velocidadReproduccion = velocidad;
      console.log(`Velocidad de reproducción cambiada a ${velocidad}x`);
    }
  }

  public setVolumen(volumen: number): void {
    if (volumen >= 0 && volumen <= 100) {
      this.volumen = volumen;
      console.log(`Volumen ajustado a ${volumen}%`);
    }
  }

  protected abstract simularReproduccion(): void;
}
