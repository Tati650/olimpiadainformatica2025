// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
const API_BASE_URL = 'http://localhost:3001';

// Función para actualizar el contador del carrito
function updateCartCounter() {
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById('cart-counter').textContent = totalItems;
}

// Función para mostrar/ocultar el carrito
function toggleCart() {
  document.getElementById('carrito').classList.toggle('open');
}

// Verificación de autenticación
async function checkAuth() {
  // Primero verifica si hay datos en sessionStorage
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  
  if (userData) {
    // Muestra la información del usuario desde sessionStorage
    document.getElementById('user-info').textContent = `Bienvenido, ${userData.username}`;
    if (userData.isAdmin) {
      document.getElementById('admin-link').style.display = 'flex'; // Cambiado a flex para el nuevo diseño
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
        document.getElementById('admin-link').style.display = 'flex'; // Cambiado a flex
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error en checkAuth:', error);
    window.location.href = 'login.html';
    return null;
  }
}

// Carga de paquetes
async function cargarPaquetes() {
  const contenedor = document.querySelector(".productos");
  const errorContainer = document.getElementById("error-container");

  try {
    contenedor.innerHTML = '<div class="loading-message"><div class="loader"></div><p>Cargando paquetes...</p></div>';
    errorContainer.style.display = 'none';

    const response = await fetch(`${API_BASE_URL}/paquetes`, {
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
    const precioLimpio = paquete.Precio
      .replace('$', '')
      .replace(/\./g, '')
      .replace(',', '.');
    
    const precioNumerico = parseFloat(precioLimpio) || 0;
    
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
          '${paquete.Destino.replace(/'/g, "\\'")}', 
          ${precioNumerico}, 
          '${(paquete.ImageURL || '').replace(/'/g, "\\'")}',
          '${paquete.Paquete_ID}'
        )">
          <i class="fas fa-cart-plus"></i> Agregar al carrito
        </button>
      </div>
    `;
  }).join('');
}

// Función para agregar al carrito (mejorada)
function agregarAlCarrito(nombre, precio, imagen = '', paqueteId = '') {
  // Verificar si el item ya está en el carrito
  const existingItem = cart.find(item => item.id === paqueteId);
  
  if (existingItem) {
    existingItem.cantidad += 1;
  } else {
    cart.push({ 
      nombre, 
      precio,
      imagen,
      id: paqueteId,
      cantidad: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  total += precio;
  renderCart();
  updateCartCounter();
  mostrarFeedback(`"${nombre}" agregado al carrito`);
}

// Renderizar carrito (adaptado al nuevo diseño)
function renderCart() {
  const lista = document.getElementById("lista-carrito");
  const totalElement = document.getElementById("total");
  
  lista.innerHTML = "";
  total = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    
    const precioFormateado = (item.precio * item.cantidad).toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS'
    });
    
    li.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.imagen || 'img/default.jpg'}" alt="${item.nombre}">
      </div>
      <div class="cart-item-details">
        <span class="cart-item-name">${item.nombre}</span>
        <span class="cart-item-price">${precioFormateado}</span>
        <div class="cart-item-quantity">
          <button onclick="modificarCantidad(${index}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button onclick="modificarCantidad(${index}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removerItem(${index})">
        <i class="fas fa-times"></i>
      </button>
    `;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });
  
  totalElement.textContent = total.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });
  
  updateCartCounter();
}

// Función para modificar cantidad de items
function modificarCantidad(index, cambio) {
  if (index >= 0 && index < cart.length) {
    const item = cart[index];
    
    if (item.cantidad + cambio < 1) {
      removerItem(index);
      return;
    }
    
    item.cantidad += cambio;
    total += item.precio * cambio;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Función para remover item
function removerItem(index) {
  if (index >= 0 && index < cart.length) {
    total -= cart[index].precio * cart[index].cantidad;
    cart.splice(index, 1);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    mostrarFeedback('Item removido del carrito');
  }
}

// Función para vaciar carrito
function vaciarCarrito() {
  if (cart.length === 0) {
    mostrarFeedback('El carrito ya está vacío');
    return;
  }
  
  if (confirm('¿Estás seguro que deseas vaciar el carrito?')) {
    cart = [];
    total = 0;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    mostrarFeedback('Carrito vaciado correctamente');
  }
}

// Función para mostrar feedback
function mostrarFeedback(mensaje) {
  const feedback = document.createElement('div');
  feedback.className = 'feedback-message';
  feedback.textContent = mensaje;
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    feedback.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 300);
  }, 3000);
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  // Cargar Font Awesome si no está cargado
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);
  }
  
  await checkAuth();
  await cargarPaquetes();
  renderCart();
  updateCartCounter();
  
  // Configurar eventos del carrito
  document.getElementById("toggleCarrito")?.addEventListener("click", toggleCart);
  document.getElementById("closeCarrito")?.addEventListener("click", toggleCart);
});