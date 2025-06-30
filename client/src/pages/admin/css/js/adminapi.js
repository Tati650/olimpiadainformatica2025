// Configuración base
const API_BASE_URL = 'http://localhost:3001';

// Funciones de la API
const apiService = {
  // Función para verificar sesión (similar a tu checkAuth)
  async checkSession() {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/check-session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Sesión no válida');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en checkSession:', error);
      throw error;
    }
  },

  // Función para login (similar a tu login.js)
  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: username,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  // Función para logout (similar a tu función en catalogo.html)
  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      return response.ok;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  },

  // Función para obtener paquetes (similar a tu cargarPaquetes)
  async getPaquetes() {
    try {
      const response = await fetch(`${API_BASE_URL}/paquetes`, {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo paquetes:', error);
      throw error;
    }
  },

  // Función para obtener productos (si es necesario)
  async getProductos() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  },

  async getPaqueteById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/paquetes/${id}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo paquete:', error);
      throw error;
    }
  },

  async createPaquete(paqueteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/paquetes`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paqueteData)
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error creando paquete:', error);
      throw error;
    }
  }
};

// Exportamos el servicio para usarlo en otros archivos
export default apiService;