import apiService from './adminapi.js';

export async function loadUsuarios() {
    try {
        const usuarios = await apiService.getUsuarios();
        renderUsuarios(usuarios);
    } catch (error) {
        console.error('Error cargando usuarios:', error);
        alert('Error al cargar los usuarios');
    }
}

function renderUsuarios(usuarios) {
    const tbody = document.getElementById('usuarios-table-body');
    tbody.innerHTML = '';

    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay usuarios registrados</td></tr>';
        return;
    }

    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.Cliente_ID}</td>
            <td>${usuario.Nombres}</td>
            <td>${usuario.Apellidos || '-'}</td>
            <td>${usuario.Nombre_Usuario}</td>
            <td>${usuario.Email || '-'}</td>
            <td>${usuario.IsAdmin ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>
            <td>
                <button class="btn btn-sm btn-primary action-btn edit-user-btn" data-id="${usuario.Cliente_ID}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger action-btn delete-user-btn" data-id="${usuario.Cliente_ID}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.edit-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            editUsuario(id);
        });
    });

    document.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').getAttribute('data-id');
            showDeleteConfirm('usuario', id, deleteUsuario);
        });
    });

    // Agregar evento al botón de agregar usuario
    document.getElementById('add-user-btn').addEventListener('click', () => {
        showUserModal();
    });
}

function showDeleteConfirm(type, id, callback) {
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    document.getElementById('confirm-modal-body').textContent = `¿Estás seguro de que deseas eliminar este ${type}?`;
    
    document.getElementById('confirm-delete-btn').onclick = async () => {
        try {
            await callback(id);
            modal.hide();
            await loadUsuarios(); // Recargar la lista
        } catch (error) {
            console.error(`Error eliminando ${type}:`, error);
            alert(`Error al eliminar el ${type}`);
        }
    };
    
    modal.show();
}

async function deleteUsuario(id) {
    await apiService.deleteUsuario(id);
}

async function editUsuario(id) {
    try {
        const usuario = await apiService.getUsuarioById(id);
        showUserModal(usuario);
    } catch (error) {
        console.error('Error cargando usuario:', error);
        alert('Error al cargar el usuario');
    }
}

function showUserModal(usuario = null) {
    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    const form = document.getElementById('user-form');
    
    if (usuario) {
        document.getElementById('userModalTitle').textContent = 'Editar Usuario';
        document.getElementById('user-id').value = usuario.Cliente_ID;
        document.getElementById('user-nombres').value = usuario.Nombres;
        document.getElementById('user-apellidos').value = usuario.Apellidos || '';
        document.getElementById('user-username').value = usuario.Nombre_Usuario;
        document.getElementById('user-password').value = ''; // No mostrar contraseña
        document.getElementById('user-email').value = usuario.Email || '';
        document.getElementById('user-telefono').value = usuario.Telefono || '';
        document.getElementById('user-isadmin').checked = usuario.IsAdmin || false;
    } else {
        document.getElementById('userModalTitle').textContent = 'Agregar Usuario';
        form.reset();
    }
    
    document.getElementById('save-user-btn').onclick = async () => {
        const userData = {
            Nombres: document.getElementById('user-nombres').value,
            Apellidos: document.getElementById('user-apellidos').value,
            Nombre_Usuario: document.getElementById('user-username').value,
            Contrasena: document.getElementById('user-password').value,
            Email: document.getElementById('user-email').value,
            Telefono: document.getElementById('user-telefono').value,
            IsAdmin: document.getElementById('user-isadmin').checked
        };
        
        try {
            if (usuario) {
                await apiService.updateUsuario(usuario.Cliente_ID, userData);
            } else {
                await apiService.createUsuario(userData);
            }
            modal.hide();
            await loadUsuarios(); // Recargar la lista
        } catch (error) {
            console.error('Error guardando usuario:', error);
            alert('Error al guardar el usuario');
        }
    };
    
    modal.show();
}