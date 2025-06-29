document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:3001/usuarios/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: document.getElementById('username').value,
        password: document.getElementById('password').value
      })
    });
      

    if (response.ok) {
      const data = await response.json();
      
      // Almacena los datos no sensibles en sessionStorage
      sessionStorage.setItem('userData', JSON.stringify({
        username: data.user.username,
        isAdmin: data.user.isAdmin,
        lastLogin: new Date().toISOString()
      }));

      // Verificar la sesión antes de redirigir
      const sessionCheck = await fetch('http://localhost:3001/usuarios/check-session', {
        credentials: 'include'
      });
      
      
      window.location.href = 'catalogo.html';
      
    }
  } catch (error) {
    console.error('Error en login:', error);
    alert('Error de conexión');
  }
});