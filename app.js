document.addEventListener("DOMContentLoaded", () => {
  const productos = [
    const productos = [
  { nombre: "Fade bajo", precio: 180, imagen: "Cortes/fade-bajo.jpg" },
  { nombre: "Fade medio", precio: 180, imagen: "Cortes/fade-medio.jpg" },
  { nombre: "Fade alto", precio: 180, imagen: "Cortes/fade-alto.jpg" },
  { nombre: "Skin Fade", precio: 180, imagen: "Cortes/skin-fade.jpg" },
  { nombre: "Buzz cut", precio: 180, imagen: "Cortes/buzz-cut.jpg" },
  { nombre: "Crew Cut", precio: 180, imagen: "Cortes/crew-cut.jpg" },
  { nombre: "French cut", precio: 180, imagen: "Cortes/french-cut.jpg" },
  { nombre: "Caesar Cut", precio: 180, imagen: "Cortes/caesar-cut.jpg" },
  { nombre: "Pompadour", precio: 180, imagen: "Cortes/pompadour.jpg" },
  { nombre: "Quiff", precio: 180, imagen: "Cortes/quiff.jpg" },
  { nombre: "Peinado hacia atras", precio: 180, imagen: "Cortes/slick-back.jpg" },
  { nombre: "Undercut", precio: 180, imagen: "Cortes/undercut.jpg" },
  { nombre: "Peinado al lado", precio: 180, imagen: "Cortes/comb-over.jpg" }

  ];

  let carrito = [];
  let total = 0;

  function aplicarPromociones(producto) {
    return producto.precio;
  }

  function agregarAlCarrito(nombre, precio, index) {
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
    carrito.push({ nombre, precio, cantidad });
    total += precio * cantidad;
    renderCarrito();
  }

  function eliminarDelCarrito(i) {
    total -= carrito[i].precio * carrito[i].cantidad;
    carrito.splice(i, 1);
    renderCarrito();
  }

  function vaciarCarrito() {
    carrito = [];
    total = 0;
    renderCarrito();
  }

  function finalizarPedido() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    let mensaje = "Hola, quiero hacer un pedido:\n\n";
    carrito.forEach(item => {
      mensaje += `${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}\n`;
    });
    mensaje += `\nTotal: $${total}`;

    let numero = "528111248290";
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  }

  function renderCatalogo() {
    const catalogoDiv = document.getElementById("catalogo");
    catalogoDiv.innerHTML = "";
    productos.forEach((p, index) => {
      const precioFinal = aplicarPromociones(p);
      catalogoDiv.innerHTML += `
        <div class="producto">
          <img src="${p.imagen}" alt="${p.nombre}">
          <div class="info">
            <h2>${p.nombre}</h2>
            <p>Precio: $${precioFinal}</p>
            <label>Cantidad:</label>
            <select id="cantidad-${index}">
              ${Array.from({length: 10}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
            </select>
            <button onclick="agregarAlCarrito('${p.nombre}', ${precioFinal}, ${index})">Agregar</button>
          </div>
        </div>
      `;
    });
  }

  function renderCarrito() {
    let lista = `<h2>Total: $${total}</h2><ul>`;
    carrito.forEach((item, i) => {
      lista += `<li>${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad} 
                  <button onclick="eliminarDelCarrito(${i})">Eliminar</button>
                </li>`;
    });
    lista += "</ul>";
    document.getElementById("total").innerHTML = lista;
  }

  // Inicializar catálogo al cargar
  renderCatalogo();
});

