const formulario = document.getElementById('formularioPaquete');
const lista = document.getElementById('listaPaquetes');
let paquetes = [];

function mostrarPaquetes() {
  lista.innerHTML = '';
  paquetes.forEach((p, index) => {
    const div = document.createElement('div');
    div.className = 'paquete';
    div.innerHTML = `
          <strong>${p.nombre}</strong><br>
          ${p.descripcion}<br>
          <em>Precio: $${p.precio}</em><br>
          <button onclick="eliminarPaquete(${index})">Eliminar</button>
        `;
    lista.appendChild(div);
  });
}

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);

  if (nombre && descripcion && !isNaN(precio)) {
    paquetes.push({ nombre, descripcion, precio });
    formulario.reset();
    mostrarPaquetes();
  }
});

function eliminarPaquete(index) {
  paquetes.splice(index, 1);
  mostrarPaquetes();
}

// Mostrar inicialmente
mostrarPaquetes();