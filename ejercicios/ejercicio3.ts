// Ejercicio 3: Registro de estudiantes

interface Estudiante {
  nombre: string;
  edad: number;
  activo: boolean;
}

const estudiantes: Estudiante[] = [
  { nombre: 'Ana', edad: 20, activo: true },
  { nombre: 'Bruno', edad: 22, activo: false },
  { nombre: 'Carla', edad: 19, activo: true },
  { nombre: 'Diego', edad: 25, activo: false },
];

function obtenerActivos(lista: Estudiante[]): Estudiante[] {
  return lista.filter((estudiante) => estudiante.activo);
}

function buscarEstudiante(
  lista: Estudiante[],
  nombre: string,
): Estudiante | undefined {
  return lista.find(
    (estudiante) => estudiante.nombre.toLowerCase() === nombre.toLowerCase(),
  );
}

console.log('--- Estudiantes activos ---');
console.log(obtenerActivos(estudiantes));

console.log('--- Búsqueda: "Carla" ---');
console.log(buscarEstudiante(estudiantes, 'Carla'));

console.log('--- Búsqueda: "Pedro" ---');
console.log(buscarEstudiante(estudiantes, 'Pedro'));
