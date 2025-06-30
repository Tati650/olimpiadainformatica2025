import apiService from './adminapi.js';

export async function loadProductos() {
    try {
        const productos = await apiService.getProductos();
        renderProductos(productos);
    } catch (error) {
        console.error('Error cargando productos:', error);
        alert('Error al cargar los productos');
    }
}

function renderProductos(productos) {
    renderAlojamientos(productos.alojamientos);
    renderViajes(productos.viajes);
    renderAutos(productos.autos);
    
    // Agregar event listeners a los botones de agregar
    document.getElementById('add-alojamiento-btn').addEventListener('click', () => {
        showAlojamientoModal();
    });
    
    document.getElementById('add-viaje-btn').addEventListener('click', () => {
        showViajeModal();
    });
    
    document.getElementById('add-auto-btn').addEventListener('click', () => {
        showAutoModal();
    });
}

function renderAlojamientos(alojamientos) {
    const tbody = document.getElementById('alojamientos-table-body');
    tbody.innerHTML = '';

    if (alojamientos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay alojamientos registrados</td></tr>';
        return;
    }

    alojamientos.forEach(alojamiento => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${alojamiento.Alojamiento_ID}</td>
            <td>${alojamiento.Hotel}</td>
            <td>${alojamiento.Ubicacion}</td>
            <td>${new Date(alojamiento.Fecha_Inicio).toLocaleDateString()} - ${new Date(alojamiento.Fecha_Final).toLocaleDateString()}</td>
            <td>${alojamiento.IncluyeComida ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>
            <td>${alojamiento.Precio}</td>
            <td>
                <button class="btn btn-sm btn-primary action-btn edit-alojamiento-btn" data-id="${alojamiento.Alojamiento_ID}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger action-btn delete-alojamiento-btn" data-id="${alojamiento.Alojamiento_ID}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.edit-alojamiento-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            editAlojamiento(id, alojamientos);
        });
    });

    document.querySelectorAll('.delete-alojamiento-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            showDeleteConfirm('alojamiento', id, deleteAlojamiento);
        });
    });
}

function renderViajes(viajes) {
    const tbody = document.getElementById('viajes-table-body');
    tbody.innerHTML = '';

    if (viajes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay viajes registrados</td></tr>';
        return;
    }

    viajes.forEach(viaje => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${viaje.Viaje_ID}</td>
            <td>${viaje.Tipo_Viaje}</td>
            <td>${viaje.Origen}</td>
            <td>${viaje.Destino}</td>
            <td>${new Date(viaje.FechaIda).toLocaleDateString()} - ${new Date(viaje.FechaVuelta).toLocaleDateString()}</td>
            <td>${viaje.Precio}</td>
            <td>
                <button class="btn btn-sm btn-primary action-btn edit-viaje-btn" data-id="${viaje.Viaje_ID}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger action-btn delete-viaje-btn" data-id="${viaje.Viaje_ID}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.edit-viaje-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            editViaje(id, viajes);
        });
    });

    document.querySelectorAll('.delete-viaje-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            showDeleteConfirm('viaje', id, deleteViaje);
        });
    });
}

function renderAutos(autos) {
    const tbody = document.getElementById('autos-table-body');
    tbody.innerHTML = '';

    if (autos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay autos registrados</td></tr>';
        return;
    }

    autos.forEach(auto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${auto.Alquiler_ID}</td>
            <td>${auto.Proveedor}</td>
            <td>${auto.Tipo_Auto}</td>
            <td>${new Date(auto.Fecha_Inicio).toLocaleDateString()} - ${new Date(auto.Fecha_Final).toLocaleDateString()}</td>
            <td>${auto.Precio || '-'}</td>
            <td>
                <button class="btn btn-sm btn-primary action-btn edit-auto-btn" data-id="${auto.Alquiler_ID}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger action-btn delete-auto-btn" data-id="${auto.Alquiler_ID}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.edit-auto-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            editAuto(id, autos);
        });
    });

    document.querySelectorAll('.delete-auto-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            showDeleteConfirm('auto', id, deleteAuto);
        });
    });
}

// Funciones para mostrar modales de edición/creación
function showAlojamientoModal(alojamiento = null) {
    const modal = new bootstrap.Modal(document.getElementById('alojamientoModal'));
    const form = document.getElementById('alojamiento-form');
    
    if (alojamiento) {
        document.getElementById('alojamientoModalTitle').textContent = 'Editar Alojamiento';
        document.getElementById('alojamiento-id').value = alojamiento.Alojamiento_ID;
        document.getElementById('alojamiento-hotel').value = alojamiento.Hotel;
        document.getElementById('alojamiento-ubicacion').value = alojamiento.Ubicacion;
        document.getElementById('alojamiento-fecha-inicio').value = alojamiento.Fecha_Inicio.split('T')[0];
        document.getElementById('alojamiento-fecha-final').value = alojamiento.Fecha_Final.split('T')[0];
        document.getElementById('alojamiento-precio').value = alojamiento.Precio;
        document.getElementById('alojamiento-comida').checked = alojamiento.IncluyeComida;
        document.getElementById('alojamiento-imagen').value = alojamiento.ImageURL || '';
    } else {
        document.getElementById('alojamientoModalTitle').textContent = 'Agregar Alojamiento';
        form.reset();
    }
    
    document.getElementById('save-alojamiento-btn').onclick = async () => {
        const alojamientoData = {
            Hotel: document.getElementById('alojamiento-hotel').value,
            Ubicacion: document.getElementById('alojamiento-ubicacion').value,
            Fecha_Inicio: document.getElementById('alojamiento-fecha-inicio').value,
            Fecha_Final: document.getElementById('alojamiento-fecha-final').value,
            Precio: parseFloat(document.getElementById('alojamiento-precio').value),
            IncluyeComida: document.getElementById('alojamiento-comida').checked,
            ImageURL: document.getElementById('alojamiento-imagen').value || null
        };
        
        try {
            // Aquí deberías implementar la llamada a la API para guardar el alojamiento
            // if (alojamiento) {
            //     await apiService.updateAlojamiento(alojamiento.Alojamiento_ID, alojamientoData);
            // } else {
            //     await apiService.createAlojamiento(alojamientoData);
            // }
            modal.hide();
            await loadProductos(); // Recargar la lista
        } catch (error) {
            console.error('Error guardando alojamiento:', error);
            alert('Error al guardar el alojamiento');
        }
    };
    
    modal.show();
}

function showViajeModal(viaje = null) {
    const modal = new bootstrap.Modal(document.getElementById('viajeModal'));
    const form = document.getElementById('viaje-form');
    
    if (viaje) {
        document.getElementById('viajeModalTitle').textContent = 'Editar Viaje';
        document.getElementById('viaje-id').value = viaje.Viaje_ID;
        document.getElementById('viaje-tipo').value = viaje.Tipo_Viaje;
        document.getElementById('viaje-origen').value = viaje.Origen;
        document.getElementById('viaje-destino').value = viaje.Destino;
        document.getElementById('viaje-fecha-ida').value = viaje.FechaIda.split('T')[0];
        document.getElementById('viaje-fecha-vuelta').value = viaje.FechaVuelta.split('T')[0];
        document.getElementById('viaje-precio').value = viaje.Precio;
    } else {
        document.getElementById('viajeModalTitle').textContent = 'Agregar Viaje';
        form.reset();
    }
    
    document.getElementById('save-viaje-btn').onclick = async () => {
        const viajeData = {
            Tipo_Viaje: document.getElementById('viaje-tipo').value,
            Origen: document.getElementById('viaje-origen').value,
            Destino: document.getElementById('viaje-destino').value,
            FechaIda: document.getElementById('viaje-fecha-ida').value,
            FechaVuelta: document.getElementById('viaje-fecha-vuelta').value,
            Precio: parseFloat(document.getElementById('viaje-precio').value)
        };
        
        try {
            // Aquí deberías implementar la llamada a la API para guardar el viaje
            // if (viaje) {
            //     await apiService.updateViaje(viaje.Viaje_ID, viajeData);
            // } else {
            //     await apiService.createViaje(viajeData);
            // }
            modal.hide();
            await loadProductos(); // Recargar la lista
        } catch (error) {
            console.error('Error guardando viaje:', error);
            alert('Error al guardar el viaje');
        }
    };
    
    modal.show();
}

function showAutoModal(auto = null) {
    const modal = new bootstrap.Modal(document.getElementById('autoModal'));
    const form = document.getElementById('auto-form');
    
    if (auto) {
        document.getElementById('autoModalTitle').textContent = 'Editar Auto';
        document.getElementById('auto-id').value = auto.Alquiler_ID;
        document.getElementById('auto-proveedor').value = auto.Proveedor;
        document.getElementById('auto-tipo').value = auto.Tipo_Auto;
        document.getElementById('auto-fecha-inicio').value = auto.Fecha_Inicio.split('T')[0];
        document.getElementById('auto-fecha-final').value = auto.Fecha_Final.split('T')[0];
        document.getElementById('auto-precio').value = auto.Precio || '';
    } else {
        document.getElementById('autoModalTitle').textContent = 'Agregar Auto';
        form.reset();
    }
    
    document.getElementById('save-auto-btn').onclick = async () => {
        const autoData = {
            Proveedor: document.getElementById('auto-proveedor').value,
            Tipo_Auto: document.getElementById('auto-tipo').value,
            Fecha_Inicio: document.getElementById('auto-fecha-inicio').value,
            Fecha_Final: document.getElementById('auto-fecha-final').value,
            Precio: document.getElementById('auto-precio').value ? parseFloat(document.getElementById('auto-precio').value) : null
        };
        
        try {
            // Aquí deberías implementar la llamada a la API para guardar el auto
            // if (auto) {
            //     await apiService.updateAuto(auto.Alquiler_ID, autoData);
            // } else {
            //     await apiService.createAuto(autoData);
            // }
            modal.hide();
            await loadProductos(); // Recargar la lista
        } catch (error) {
            console.error('Error guardando auto:', error);
            alert('Error al guardar el auto');
        }
    };
    
    modal.show();
}

// Funciones para editar elementos específicos
function editAlojamiento(id, alojamientos) {
    const alojamiento = alojamientos.find(a => a.Alojamiento_ID == id);
    if (alojamiento) {
        showAlojamientoModal(alojamiento);
    }
}

function editViaje(id, viajes) {
    const viaje = viajes.find(v => v.Viaje_ID == id);
    if (viaje) {
        showViajeModal(viaje);
    }
}

function editAuto(id, autos) {
    const auto = autos.find(a => a.Alquiler_ID == id);
    if (auto) {
        showAutoModal(auto);
    }
}

// Funciones para eliminar elementos (simuladas)
async function deleteAlojamiento(id) {
    // Implementar llamada a la API para eliminar alojamiento
    // await apiService.deleteAlojamiento(id);
    console.log(`Eliminando alojamiento ${id}`);
}

async function deleteViaje(id) {
    // Implementar llamada a la API para eliminar viaje
    // await apiService.deleteViaje(id);
    console.log(`Eliminando viaje ${id}`);
}

async function deleteAuto(id) {
    // Implementar llamada a la API para eliminar auto
    // await apiService.deleteAuto(id);
    console.log(`Eliminando auto ${id}`);
}