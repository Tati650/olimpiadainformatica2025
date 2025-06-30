import apiService from './adminapi.js';

export async function loadPedidos() {
    try {
        const pedidos = await apiService.getPedidosCompra();
        renderPedidos(pedidos);
    } catch (error) {
        console.error('Error cargando pedidos:', error);
        alert('Error al cargar los pedidos');
    }
}

function renderPedidos(pedidos) {
    const tbody = document.getElementById('pedidos-table-body');
    tbody.innerHTML = '';

    if (pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay pedidos pendientes</td></tr>';
        return;
    }

    pedidos.forEach(pedido => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pedido.PC_ID}</td>
            <td>${pedido.Cliente_ID}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td>${new Date(pedido.Vencimiento).toLocaleDateString()}</td>
            <td><span class="badge bg-warning text-dark">Pendiente</span></td>
            <td>
                <button class="btn btn-sm btn-primary action-btn view-pedido-btn" data-id="${pedido.PC_ID}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-success action-btn approve-pedido-btn" data-id="${pedido.PC_ID}">
                    <i class="fas fa-check"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.view-pedido-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            viewPedidoDetails(id);
        });
    });

    document.querySelectorAll('.approve-pedido-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            approvePedido(id);
        });
    });
}

function viewPedidoDetails(id) {
    // Implementar lógica para ver detalles del pedido
    alert(`Mostrando detalles del pedido ${id}`);
}

async function approvePedido(id) {
    try {
        // Implementar lógica para aprobar pedido
        alert(`Pedido ${id} aprobado`);
        await loadPedidos(); // Recargar la lista
    } catch (error) {
        console.error('Error aprobando pedido:', error);
        alert('Error al aprobar el pedido');
    }
}