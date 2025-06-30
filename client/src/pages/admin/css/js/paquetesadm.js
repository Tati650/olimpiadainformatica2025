import apiService from './adminapi.js';

export async function loadPaquetes() {
    const container = document.getElementById('paquetes-container') || 
                     document.getElementById('paquetes-table-body');
    const errorContainer = document.getElementById('error-container');

    try {
        // Mostrar estado de carga
        if (container) container.innerHTML = '<div class="loading">Cargando...</div>';
        if (errorContainer) errorContainer.style.display = 'none';

        const response = await apiService.getPaquetes();
        
        // Verificar si response es un array válido
        if (!Array.isArray(response)) {
            throw new Error('Formato de datos inválido recibido del servidor');
        }

        if (response.length === 0) {
            if (container) container.innerHTML = '<p class="no-items">No hay paquetes disponibles</p>';
            return;
        }

        renderPaquetes(response);
    } catch (error) {
        console.error("Error cargando paquetes:", error);
        if (container) container.innerHTML = '';
        if (errorContainer) {
            errorContainer.style.display = 'block';
            errorContainer.innerHTML = `
                <p>Error al cargar los paquetes</p>
                <button onclick="window.location.reload()">Reintentar</button>
                <p class="error-detail">${error.message}</p>
            `;
        }
    }
}

function parsePrice(priceStr) {
    try {
        // Eliminar símbolos y espacios, reemplazar coma decimal por punto
        const numericStr = priceStr.replace(/[^\d,]/g, '').replace(',', '.');
        return parseFloat(numericStr);
    } catch (e) {
        console.warn('Error parseando precio:', priceStr, e);
        return 0;
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
}

function renderPaquetes(paquetes) {
    const container = document.getElementById('paquetes-container') || 
                     document.getElementById('paquetes-table-body');
    
    if (!container) {
        console.error('No se encontró el contenedor para paquetes');
        return;
    }

    // Verificar si es tabla (admin) o cards (front)
    if (container.tagName === 'TBODY') {
        // Renderizado para administrador (tabla)
        container.innerHTML = paquetes.map(paquete => {
            const precio = parsePrice(paquete.Precio);
            
            return `
                <tr>
                    <td>${paquete.Paquete_ID}</td>
                    <td>${paquete.Destino}</td>
                    <td>${paquete.CantViajeros}</td>
                    <td>${formatPrice(precio)}</td>
                    <td>
                        <button class="btn-edit" onclick="editPaquete('${paquete.Paquete_ID}')">
                            Editar
                        </button>
                        <button class="btn-delete" onclick="deletePaquete('${paquete.Paquete_ID}')">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    } else {
        // Renderizado para frontend (cards)
        container.innerHTML = paquetes.map(paquete => {
            const precio = parsePrice(paquete.Precio);
            
            return `
                <div class="paquete-card">
                    <div class="paquete-imagen">
                        ${paquete.ImageURL ? 
                            `<img src="${paquete.ImageURL}" alt="${paquete.Destino}">` : 
                            `<div class="imagen-default"></div>`
                        }
                    </div>
                    <div class="paquete-info">
                        <h3>${paquete.Destino}</h3>
                        <p><i class="fas fa-users"></i> ${paquete.CantViajeros} viajeros</p>
                        <p class="precio">${formatPrice(precio)}</p>
                        <p class="descripcion">${paquete.Tipo_Viaje} desde ${paquete.Origen}</p>
                        <p class="hotel"><i class="fas fa-hotel"></i> ${paquete.Hotel}</p>
                        <p class="auto"><i class="fas fa-car"></i> ${paquete.Tipo_Auto} (${paquete.Proveedor})</p>
                        <button class="btn-reservar" onclick="addToCart(
                            '${paquete.Paquete_ID}',
                            '${paquete.Destino}',
                            ${precio},
                            '${paquete.ImageURL || ''}'
                        )">
                            Reservar ahora
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Hacer funciones disponibles globalmente
window.loadPaquetes = loadPaquetes;