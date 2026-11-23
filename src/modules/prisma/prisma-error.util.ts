// Utilidades para reconocer errores de Prisma por su código.

function tieneCodigo(error: unknown, codigo: string): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === codigo
  );
}

// P2002: se intentó guardar un valor repetido en un campo @unique (por ejemplo, un email).
export function isPrismaUniqueConstraintError(error: unknown): boolean {
  return tieneCodigo(error, 'P2002');
}

// P2003: falla una clave foránea. Pasa al guardar un id relacionado que no existe
// (por ejemplo, un estadoId inexistente) o al borrar un registro que otros usan.
export function isPrismaForeignKeyError(error: unknown): boolean {
  return tieneCodigo(error, 'P2003');
}
