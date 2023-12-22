const productos = {
  1: { nombre: "Gorras", precio: 30 },
  2: { nombre: "Camisetas", precio: 45 },
  3: { nombre: "Buzos", precio: 90 },
};

const mensajes = {
  bienvenida:
    "¡Bienvenido a la tienda de Sauce boys!\n\n" +
    "Descuentos disponibles:\n" +
    " - Si llevas 2 productos, obtendrás un 10% de descuento.\n" +
    " - Si llevas 3 productos, obtendrás un 15% de descuento.\n" +
    " - Si llevas 4 o más productos, obtendrás un 25% de descuento.",

  seleccionProducto:
    "Ingrese el código del producto que deseas, o escriba 'buscar' para buscar un producto:\n1 - Gorras $ 30\n2 - Camisetas $ 45\n3 - Buzos $ 90\nEscribe 'finalizar' para terminar la compra.",

  ingresarCantidad: "¿Cuántas unidades de",
  mensajeCantidadInvalida: "Ingrese una cantidad válida.",

  agradecimiento: "¡Gracias por comprar en Sauce boys!",
};

const carrito = [];

alert(mensajes.bienvenida);

// Búsqueda
function buscarProductoPorNombre(nombre) {
  const resultados = [];

  for (const codigo in productos) {
    const producto = productos[codigo];

    if (producto.nombre.toLowerCase().includes(nombre.toLowerCase())) {
      resultados.push({ codigo, ...producto });
    }
  }

  return resultados;
}

while (true) {
  seleccion = prompt(
    `${mensajes.seleccionProducto}\n${mostrarProductosEnCarrito()}`
  );

  if (seleccion.toLowerCase() === "buscar") {
    const terminoBusqueda = prompt("Ingrese el nombre del producto a buscar:");
    const resultados = buscarProductoPorNombre(terminoBusqueda);

    if (resultados.length > 0) {
      alert("Resultados de la búsqueda:");
      for (const resultado of resultados) {
        alert(
          `Código: ${resultado.codigo}, Nombre: ${resultado.nombre}, Precio: $${resultado.precio}`
        );
      }

      const codigoSeleccionado = prompt(
        "Ingrese el código del producto que desea comprar:"
      );
      seleccion = codigoSeleccionado;
    } else {
      alert("No se encontraron resultados para la búsqueda.");
      continue;
    }
  }

  if (seleccion === "1" || seleccion === "2" || seleccion === "3") {
    const cantidad = parseInt(
      prompt(
        `${mensajes.ingresarCantidad} ${productos[seleccion].nombre} deseas comprar?`
      ) || 0
    );

    if (cantidad > 0) {
      carrito.push({ codigo: seleccion, cantidad: cantidad });
    } else {
      alert(mensajes.mensajeCantidadInvalida);
      continue;
    }

    const comprarOtro = confirm("¿Deseas comprar otro producto?");
    if (!comprarOtro) {
      break;
    }
  } else if (seleccion.toLowerCase() === "finalizar") {
    break;
  } else {
    alert("Ingrese una opción válida.");
  }
}

let descuento;
let cantidadTotalProductos = carrito.reduce(
  (total, item) => total + item.cantidad,
  0
);

if (cantidadTotalProductos === 2) {
  descuento = 0.1;
} else if (cantidadTotalProductos === 3) {
  descuento = 0.15;
} else if (cantidadTotalProductos >= 4) {
  descuento = 0.25;
} else {
  descuento = 0;
}

let subtotal = 0;

for (let i = 0; i < carrito.length; i++) {
  const item = carrito[i];
  subtotal += obtenerValor(item.codigo) * item.cantidad;
}

let cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

const totalConDescuento = subtotal * (1 - descuento);

alert(
  `Cantidad total de productos: ${cantidadTotal}\nSubtotal: $${subtotal.toFixed(
    1
  )}\nDescuento: ${
    descuento * 100
  }%\nTotal a pagar: $${totalConDescuento.toFixed(1)}`
);

function obtenerValor(seleccion) {
  switch (seleccion) {
    case "1":
      return 30;

    case "2":
      return 45;

    case "3":
      return 90;

    default:
      return 0;
  }
}

function mostrarProductosEnCarrito() {
  let productosEnCarrito = "Productos en el carrito: ";

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    productosEnCarrito += `${productos[item.codigo].nombre} (x${
      item.cantidad
    })`;

    if (i < carrito.length - 1) {
      productosEnCarrito += ", ";
    }
  }

  return carrito.length === 0 ? "Carrito vacío" : productosEnCarrito;
}

alert(mensajes.agradecimiento);
