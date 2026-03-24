import { TarjetaCredito } from "./models/TarjetaCredito";
import { TransferenciaBancaria } from "./models/TransferenciaBancaria";
import { BilleteraVirtual } from "./models/BilleteraVirtual";
import { Procesable } from "./interfaces/Procesable";

console.log("=== EJERCICIO 4: DISEÑO LIBRE - MÉTODOS DE PAGO ===\n");

console.log("--- Creando métodos de pago ---\n");

const tarjeta = new TarjetaCredito("Juan Pérez", "1234567890123456", "Visa", "12/27", 50000);
console.log(tarjeta.obtenerDetalles());

const transferencia = new TransferenciaBancaria("María García", "Santander", "12345678", "0000123456789012345678", "maria.garcia");
console.log(transferencia.obtenerDetalles());

const billetera = new BilleteraVirtual("Carlos López", "MercadoPago", "carlos@email.com", 10000);
billetera.agregarBonus(500);
console.log(billetera.obtenerDetalles());

console.log("\n--- Realizando pagos ---\n");

console.log("Pago con Tarjeta de Crédito ($15.000):");
tarjeta.procesarPago(15000);

console.log("\nPago con Tarjeta de Crédito ($40.000):");
tarjeta.procesarPago(40000);

console.log("\nTransferencia Bancaria ($25.000):");
transferencia.procesarPago(25000);

console.log("\nTransferencia Bancaria ($10.000):");
transferencia.procesarPago(10000);

console.log("\nPago con Billetera Virtual ($3.000):");
billetera.procesarPago(3000);

console.log("\nPago con Billetera Virtual ($8.000):");
billetera.procesarPago(8000);

console.log("\n--- Estados finales ---\n");
console.log(tarjeta.obtenerDetalles());
console.log(transferencia.obtenerDetalles());
console.log(billetera.obtenerDetalles());

console.log("\n--- Estadísticas ---\n");
console.log(`Tarjeta: ${tarjeta.getTransacciones()} transacciones`);
console.log(`Transferencia: ${transferencia.getTransacciones()} transacciones`);
console.log(`Billetera: ${billetera.getTransacciones()} transacciones`);
