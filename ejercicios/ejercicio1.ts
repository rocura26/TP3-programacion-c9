// Ejercicio 1: Gestión de notas

const nota1: number = 7;
const nota2: number = 5;
const nota3: number = 8;

function calcularPromedio(n1: number, n2: number, n3: number): number {
  return (n1 + n2 + n3) / 3;
}

function determinarEstado(promedio: number): string {
  if (promedio >= 6) {
    return 'Aprobado';
  }
  return 'Desaprobado';
}

const promedio: number = calcularPromedio(nota1, nota2, nota3);
const estado: string = determinarEstado(promedio);

console.log(`Promedio: ${promedio.toFixed(2)}`);
console.log(`Estado: ${estado}`);
