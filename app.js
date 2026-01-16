document.addEventListener("DOMContentLoaded", () => {
  const productos = [
    { nombre: "Fade bajo", precio: 180, imagen: "Cortes/fade-bajo.png" },
    { nombre: "Fade medio", precio: 180, imagen: "Cortes/fade-medio.png" },
    { nombre: "Fade alto", precio: 180, imagen: "Cortes/fade-alto.png" },
    { nombre: "Skin Fade", precio: 180, imagen: "Cortes/skin-fade.png" },
    { nombre: "Buzz cut", precio: 180, imagen: "Cortes/buzz-cut.png" },
    { nombre: "Crew Cut", precio: 180, imagen: "Cortes/crew-cut.png" },
    { nombre: "French Crop", precio: 180, imagen: "Cortes/french-crop.png" },
    { nombre: "Corte César", precio: 180, imagen: "Cortes/corte-cesar.png" },
    { nombre: "Pompadour", precio: 180, imagen: "Cortes/pompadour.png" },
    { nombre: "Quiff", precio: 180, imagen: "Cortes/quiff.png" },
    { nombre: "Peinado hacia atrás", precio: 180, imagen: "Cortes/peinado-hacia-atras.png" },
    { nombre: "Peinado al lado", precio: 180, imagen: "Cortes/peinado-al-lado.png" },
  ];

  let carrito = [];
  let total = 0;

  function aplicarPromociones(producto) {
    return producto.precio;
  }

  // Agregar producto al carrito
  window.agregarAlCarrito = function(nombre, precio, index) {
    const horario = document.getElementById(`horario-${index}`).value;
    carrito.push({ nombre, precio, horario });
    total += precio;
    renderCarrito();
  };

  // Eliminar producto del carrito
  window.eliminarDelCarrito = function(i) {
    total -= carrito[i].precio;
    carrito.splice(i, 1);
    renderCarrito();
  };

  // Vaciar carrito
  window.vaciarCarrito = function() {
    carrito = [];
    total = 0;
    renderCarrito();
  };

  // Finalizar pedido y enviar a WhatsApp
  window.finalizarPedido = function() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const nombreCliente = document.getElementById("nombreCliente").value;
    const telefonoCliente = document.getElementById("telefonoCliente").value;

    let mensaje = `Hola, soy ${nombreCliente} (Tel: ${telefonoCliente}), quiero hacer cita:\n\n`;
    carrito.forEach(item => {
      mensaje += `${item.nombre} - Horario: ${item.horario} = $${item.precio}\n`;
    });
    mensaje += `\nTotal: $${total}`;

    let numero = "528111248290";
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  // Renderizar catálogo
  function renderCatalogo() {
    const catalogoDiv = document.getElementById("catalogo");
    catalogoDiv.innerHTML = "";

    const horarios = ["08:00am","09:00am","10:00am","11:00am","12:00pm","1:00pm",
                      "2:00pm","3:00pm","4:00pm","5:00pm","6:00pm","7:00pm","8:00pm"];

    productos.forEach((p, index) => {
      const precioFinal = aplicarPromociones(p);
      catalogoDiv.innerHTML += `
        <div class="producto">
          <img src="${p.imagen}" alt="${p.nombre}">
          <div class="info">
            <h2>${p.nombre}</h2>
            <p>Precio: $${precioFinal}</p>
            <label>Horarios:</label>
            <select id="horario-${index}">
              ${horarios.map(h => `<option value="${h}">${h}</option>`).join('')}
            </select>
            <button onclick="agregarAlCarrito('${p.nombre}', ${precioFinal}, ${index})">Agregar</button>
          </div>
        </div>
      `;
    });
  }

  // Renderizar carrito en pantalla
  function renderCarrito() {
    let lista = `<h2>Resumen del pedido</h2><ul>`;
    carrito.forEach((item, i) => {
      lista += `<li>${item.nombre} - Horario: ${item.horario} - $${item.precio} 
                  <button onclick="eliminarDelCarrito(${i})">Eliminar</button>
                </li>`;
    });
    lista += `</ul><h3>Total: $${total}</h3>`;
    document.getElementById("total").innerHTML = lista;
  }

  // Inicializar catálogo al cargar
  renderCatalogo();
});
