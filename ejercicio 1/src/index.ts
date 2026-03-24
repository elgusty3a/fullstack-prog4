import { Email } from "./models/Email";
import { SMS } from "./models/SMS";
import { Renderizador as Renderizador } from "./utils/Renderizador";

console.log("=== EJERCICIO 1: INTERFACES Y HERENCIA ===\n");

const email1 = new Email("usuario@ejemplo.com", "Bienvenida");
const email2 = new Email("admin@sistema.com", "Alerta de seguridad");

const sms1 = new SMS("+54 11 1234-5678");
const sms2 = new SMS("+54 11 9876-5432");

console.log("--- Estados iniciales ---");
Renderizador.estado("Email 1", email1.obtenerEstado());
Renderizador.estado("Email 2", email2.obtenerEstado());
Renderizador.estado("SMS 1", sms1.obtenerEstado());
Renderizador.estado("SMS 2", sms2.obtenerEstado());

console.log("\n--- Enviando notificaciones ---\n");
email1.enviar("¡Bienvenido a nuestra plataforma!");
email2.enviar("Se detecto un acceso sospechoso en su cuenta.");
sms1.enviar("Tu codigo de verificacion es: 123456");
sms2.enviar("Tu pedido ha sido enviado. Seguimiento: 789123");

console.log("\n--- Estados finales ---");
Renderizador.estado("Email 1", email1.obtenerEstado());
Renderizador.estado("Email 2", email2.obtenerEstado());
Renderizador.estado("SMS 1", sms1.obtenerEstado());
Renderizador.estado("SMS 2", sms2.obtenerEstado());

console.log("\n=== EJERCICIO COMPLETADO ===");
