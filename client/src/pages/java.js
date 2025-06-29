// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

const API_BASE_URL = 'http://localhost:3001';

async function checkAuth() {
  // Primero verifica si hay datos en sessionStorage
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  
  if (userData) {
    // Muestra la información del usuario desde sessionStorage
    document.getElementById('user-info').textContent = `Bienvenido, ${userData.username}`;
    if (userData.isAdmin) {
      document.getElementById('admin-link').style.display = 'block';
    }
    return userData;
  }

  // Si no hay datos en sessionStorage, verifica con el servidor
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/check-session`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      window.location.href = 'login.html';
      return null;
    }

    const data = await response.json();
    
    if (data.user) {
      // Guarda los datos en sessionStorage
      sessionStorage.setItem('userData', JSON.stringify({
        username: data.user.username,
        isAdmin: data.user.isAdmin,
        lastLogin: new Date().toISOString()
      }));
      
      document.getElementById('user-info').textContent = `Bienvenido, ${data.user.username}`;
      if (data.user.isAdmin) {
        document.getElementById('admin-link').style.display = 'block';
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error en checkAuth:', error);
    window.location.href = 'login.html';
    return null;
  }
}

// Carga de paquetes corregida
async function cargarPaquetes() {
  const contenedor = document.querySelector(".productos");
  const errorContainer = document.getElementById("error-container");

  try {
    contenedor.innerHTML = '<div class="loading-message"><div class="loader"></div><p>Cargando paquetes...</p></div>';
    errorContainer.style.display = 'none';

    // Usamos timestamp para evitar caché
    const timestamp = Date.now();
    const response = await fetch(`http://localhost:3001/paquetes`, {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const paquetes = await response.json();
    
    if (paquetes.length === 0) {
      contenedor.innerHTML = '<p class="no-items">No hay paquetes disponibles</p>';
      return;
    }

    renderizarPaquetes(paquetes);
  } catch (error) {
    console.error("Error cargando paquetes:", error);
    contenedor.innerHTML = '';
    errorContainer.style.display = 'block';
    errorContainer.innerHTML = `
      <p>Error al cargar los paquetes</p>
      <button onclick="cargarPaquetes()">Reintentar</button>
      <p class="error-detail">${error.message}</p>
    `;
  }
}

// Función para renderizar paquetes
function renderizarPaquetes(paquetes) {
  const contenedor = document.querySelector(".productos");
  contenedor.innerHTML = paquetes.map(paquete => {
    // Limpia el precio (elimina '$' y puntos, reemplaza coma por punto)
    const precioLimpio = paquete.Precio
      .replace('$', '')
      .replace(/\./g, '')
      .replace(',', '.');
    
    const precioNumerico = parseFloat(precioLimpio) || 0;
    
    // Formatea el precio nuevamente para mostrar
    const precioFormateado = precioNumerico.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS'
    });

    return `
      <div class="producto">
        <img src="${paquete.ImageURL || 'img/default.jpg'}" alt="${paquete.Destino}">
        <h3>${paquete.Destino}</h3>
        <p>Viajeros: ${paquete.CantViajeros}</p>
        <p>Precio: ${precioFormateado}</p>
        <p>${paquete.Descripcion || 'Paquete turístico completo'}</p>
        <button class="btn" onclick="agregarAlCarrito(
          '${paquete.Destino}', 
          ${precioNumerico}, 
          '${paquete.ImageURL || ''}',
          '${paquete.Paquete_ID}'
        )">
          Agregar al carrito
        </button>
      </div>
    `;
  }).join('');
}

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio, imagen = '', paqueteId = '') {
  cart.push({ 
    nombre, 
    precio,
    imagen,
    id: paqueteId,
    cantidad: 1 // Puedes añadir cantidad si es relevante
  });
  
  localStorage.setItem('cart', JSON.stringify(cart));
  total += precio;
  renderCart();
}
// Renderizar carrito
function renderCart() {
  const lista = document.getElementById("lista-carrito");
  const totalElement = document.getElementById("total");
  
  lista.innerHTML = "";
  total = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    
    const precioFormateado = item.precio.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS'
    });
    
    li.innerHTML = `
      <img src="${item.imagen || 'img/default.jpg'}" alt="${item.nombre}">
      <span>${item.nombre} - ${precioFormateado}</span>
      <button onclick="removerItem(${index})">✕</button>
    `;
    lista.appendChild(li);
    total += item.precio;
  });
  
  totalElement.textContent = total.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });
}
function removerItem(index) {
  if (index >= 0 && index < cart.length) {
    // Resta el precio del item al total
    total -= cart[index].precio;
    
    // Remueve el item del array
    cart.splice(index, 1);
    
    // Actualiza el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Vuelve a renderizar el carrito
    renderCart();
    
    // Muestra feedback visual (opcional)
    mostrarFeedback('Item removido del carrito');
  } else {
    console.error('Índice inválido para remover item');
  }
}
function vaciarCarrito() {
  if (cart.length === 0) {
    mostrarFeedback('El carrito ya está vacío');
    return;
  }
  
  // Confirmación antes de vaciar (opcional pero recomendado)
  if (confirm('¿Estás seguro que deseas vaciar el carrito?')) {
    // Vacía el array
    cart = [];
    
    // Reinicia el total
    total = 0;
    
    // Actualiza el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Vuelve a renderizar el carrito
    renderCart();
    
    // Muestra feedback visual
    mostrarFeedback('Carrito vaciado correctamente');
  }
}
// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  await checkAuth();
  await cargarPaquetes();
  renderCart();
  
  // Configurar evento para toggle carrito
  document.getElementById("toggleCarrito")?.addEventListener("click", () => {
    const contenido = document.getElementById("carrito-contenido");
    contenido.style.display = contenido.style.display === "none" ? "block" : "none";
  });
});