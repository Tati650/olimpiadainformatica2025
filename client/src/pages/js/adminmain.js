import apiService from './adminapi.js';

// Función para verificar autenticación
async function checkAuth() {
  try {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData && userData.isAdmin) {
      return userData;
    }

    const sessionData = await apiService.checkSession();
    if (sessionData.user && sessionData.user.isAdmin) {
      sessionStorage.setItem('userData', JSON.stringify({
        username: sessionData.user.username,
        isAdmin: true,
        lastLogin: new Date().toISOString()
      }));
      return sessionData.user;
    }

    throw new Error('Acceso no autorizado');
  } catch (error) {
    console.error('Error en checkAuth:', error);
    window.location.href = '../login.html';
    return null;
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await checkAuth();
    
    // Cargar módulos según la página actual
    const path = window.location.pathname.split('/').pop();
    
    switch(path) {
      case 'paquetes.html':
        const { loadPaquetes } = await import('./paquetesadm.js');
        await loadPaquetes();
        break;
      case 'usuarios.html':
        const { loadUsuarios } = await import('./useradm.js');
        await loadUsuarios();
        break;
      case 'pedidos.html':
        const { loadPedidos } = await import('./pedidosadm.js');
        await loadPedidos();
        break;
      case 'productos.html':
        const { loadProductos } = await import('./productosadm.js');
        await loadProductos();
        break;
      default:
        // Página principal del admin
        break;
    }

  } catch (error) {
    console.error('Error inicializando admin:', error);
    window.location.href = '../login.html';
  }
});