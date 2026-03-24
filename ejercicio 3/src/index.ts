import { Video } from "./models/Video";
import { Podcast } from "./models/Podcast";
import { Reproducible } from "./interfaces/Reproducible";

console.log("=== EJERCICIO 3: INTERFACE + HERENCIA ===\n");

console.log("--- Creando contenidos ---\n");

const video1 = new Video("Tutorial TypeScript", "Mouredev", 15, "4K");
const video2 = new Video("Aprende React", "Midudev", 30, "1080p");

const podcast1 = new Podcast("Teorias sobre Vientos de invierno", "El Maestre de Antigua", 45, "Spotify");
const podcast2 = new Podcast("Cancion de hielo y fuego, Juego de Tronos, Jon 1", "Littlefinger", 60, "Youtube music");

console.log(video1.obtenerInfo());
console.log(video2.obtenerInfo());
console.log(podcast1.obtenerInfo());
console.log(podcast2.obtenerInfo());

console.log("\n--- Reproduciendo Video ---\n");

console.log(`Video: "${video1.getTitulo()}"`);
video1.reproducir();
video1.pausar();
video1.reproducir();
video1.setVelocidad(1.5);
video1.reproducir();
video1.detener();

console.log("\n--- Cambiando resolución del video ---");
video1.setResolucion("720p");
console.log(`Nueva resolución: ${video1.getResolucion()}`);

console.log("\n--- Reproduciendo Podcast ---\n");

console.log(`Podcast: "${podcast1.getTitulo()}"`);
podcast1.reproducir();
podcast1.pausar();
podcast1.reproducir();
podcast1.setVolumen(50);
podcast1.reproducir();
podcast1.detener();

console.log("\n--- Cambiando velocidad del podcast ---");
podcast1.setVelocidad(2);
console.log(`Nueva velocidad: ${podcast1.getVelocidad()}x`);

console.log("\n--- Estados finales ---\n");
console.log(video1.obtenerInfo());
console.log(video2.obtenerInfo());
console.log(podcast1.obtenerInfo());
console.log(podcast2.obtenerInfo());
