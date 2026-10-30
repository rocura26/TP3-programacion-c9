// Ejercicio 2: Gestión de productos

type Producto = {
  nombre: string;
  precio: number;
  stock: number;
};

const productos: Producto[] = [
  { nombre: 'Teclado', precio: 25000, stock: 5 },
  { nombre: 'Mouse', precio: 12000, stock: 10 },
  { nombre: 'Monitor', precio: 180000, stock: 3 },
];

function mostrarProductos(lista: Producto[]): void {
  lista.forEach((producto) => {
    console.log(
      `Nombre: ${producto.nombre} | Precio: $${producto.precio} | Stock: ${producto.stock}`,
    );
  });
}

function buscarProducto(lista: Producto[], nombre: string): Producto | undefined {
  return lista.find(
    (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase(),
  );
}

console.log('--- Lista de productos ---');
mostrarProductos(productos);

console.log('--- Búsqueda: "Mouse" ---');
console.log(buscarProducto(productos, 'Mouse'));

console.log('--- Búsqueda: "Parlante" ---');
console.log(buscarProducto(productos, 'Parlante'));
