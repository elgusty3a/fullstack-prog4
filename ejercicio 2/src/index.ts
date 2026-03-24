import { CuentaAhorro } from "./models/CuentaAhorro";
import { CuentaCorriente } from "./models/CuentaCorriente";

console.log("=== EJERCICIO 2: HERENCIA ===\n");

console.log("--- Creando cuentas ---\n");

const cuentaAhorro = new CuentaAhorro("Juan Pérez", 1000);
console.log(`Cuenta de Ahorro creada: ${cuentaAhorro.getNumeroCuenta()}`);

const cuentaCorriente = new CuentaCorriente("María García", 500, 1000);
console.log(`Cuenta Corriente creada: ${cuentaCorriente.getNumeroCuenta()}`);

console.log("\n--- Estados iniciales ---\n");
console.log(cuentaAhorro.obtenerEstado());
console.log(cuentaCorriente.obtenerEstado());

console.log("\n--- Operaciones en Cuenta de Ahorro ---\n");

console.log("Depósito de $200:");
cuentaAhorro.depositar(200);

console.log("\nExtracción de $150:");
cuentaAhorro.extraer(150);

console.log("\nExtracción de $100:");
cuentaAhorro.extraer(100);

console.log(`\nInterés mensual estimado: $${cuentaAhorro.calcularInteres().toFixed(2)}`);

console.log("\n--- Estados finales Cuenta de Ahorro ---\n");
console.log(cuentaAhorro.obtenerEstado());

console.log("\n--- Operaciones en Cuenta Corriente ---\n");

console.log("Depósito de $300:");
cuentaCorriente.depositar(300);

console.log("\nExtracción de $600 (usa $400 del saldo + $200 de sobregiro):");
cuentaCorriente.extraer(600);

console.log("\nExtracción de $500:");
cuentaCorriente.extraer(500);

console.log("\nIntento de extracción que excede límite ($1000):");
cuentaCorriente.extraer(1000);

console.log("\n--- Estados finales Cuenta Corriente ---\n");
console.log(cuentaCorriente.obtenerEstado());
console.log(`Disponible: $${cuentaCorriente.getDisponible().toFixed(2)}`);
