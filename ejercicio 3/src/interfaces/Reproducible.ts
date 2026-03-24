export interface Reproducible {
  reproducir(): void;
  pausar(): void;
  detener(): void;
  getDuracion(): number;
  getTiempoActual(): number;
}
