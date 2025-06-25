//index
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Previene que se recargue la página




  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('errorMessage');




  // Validación básica
  if (!username || !password) {
    errorMessage.textContent = 'Por favor, complete todos los campos.';
    return;
  }




  // Aquí puedes conectar con el backend, por ahora simulamos autenticación
  if (username === 'tizi' && password === '1234') {
    // Redirigir al juego o dashboard
    window.location.href = 'catalogo.html'; // Cambia esto a la página real
  } else {
    errorMessage.textContent = 'Usuario o contraseña incorrectos.';
  }
});


let cart = [];


    function addToCart(name, price, image) {
      cart.push({ name, price, image });
      renderCart();
    }


    function removeFromCart(index) {
      cart.splice(index, 1);
      renderCart();
    }


    function emptyCart() {
      cart = [];
      renderCart();
    }


    function checkout() {
      if (cart.length === 0) {
        alert("El carrito está vacío.");
      } else {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Gracias por tu compra. Total: $${total}`);
        emptyCart();
      }
    }


    function renderCart() {
      const container = document.getElementById("cart-items");
      container.innerHTML = "";


      cart.forEach((item, index) => {
        container.innerHTML += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
              <strong>${item.name}</strong><br>
              $${item.price}
            </div>
            <button onclick="removeFromCart(${index})">X</button>
          </div>
        `;
      });
    }


function agregarAlCarrito(nombre, precio) {
      const lista = document.getElementById("lista-carrito");
      const item = document.createElement("li");
      item.textContent = `${nombre} - $${precio}`;
      lista.appendChild(item);


      total += precio;
      document.getElementById("total").textContent = total;
    }


    function vaciarCarrito() {
      const lista = document.getElementById("lista-carrito");
      lista.innerHTML = '';
      total = 0;
      document.getElementById("total").textContent = total;
    }


    function mostrarOpciones() {
      alert("Esta función aún no está disponible.");
    }
  const toggleBtn = document.getElementById("toggleCarrito");
  const contenidoCarrito = document.getElementById("carrito-contenido");


  toggleBtn.addEventListener("click", function () {
    if (contenidoCarrito.style.display === "none") {
      contenidoCarrito.style.display = "block";
      toggleBtn.textContent = "Minimizar";
    } else {
      contenidoCarrito.style.display = "none";
      toggleBtn.textContent = "Expandir";
    }
  });
function toggleOpciones() {
    const opciones = document.getElementById('opciones');
    if (opciones.style.display === 'none' || opciones.style.display === '') {
      opciones.style.display = 'block';
    } else {
      opciones.style.display = 'none';
    }
  }

  //json 
  document.addEventListener("DOMContentLoaded", () => {
  fetch('json.json') // 👈 Ruta al archivo JSON
    .then(response => response.json())
    .then(productos => {
      const contenedor = document.getElementById("contenedor-productos");

      productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio.toLocaleString()}</p>
          <p>${producto.descripcion}</p>
          <button class="btn" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
            Agregar al carrito
          </button>
        `;

        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Error cargando productos.json:", error);
    });
});