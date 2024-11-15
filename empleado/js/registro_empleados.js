import { getAllEmployees, editRole, deleteEmpleado, registerUser } from './config.js';

let currentEdit = "";
let currentDelete = "";

const containerEmpleados = document.getElementById('container-empleados');
const toast = new bootstrap.Toast(document.getElementById('idNotificacion'));
const mensaje = document.getElementById('idMensaje');

async function renderEmployees() {
    const employees = await getAllEmployees();

    employees.forEach((employee) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('bg-dark');
        div.classList.add('col-12');
        div.classList.add('col-md-6');
        div.classList.add('col-lg-4');

        div.innerHTML = `
        <div class="card-title p-3">
            <h3 class="text-white">${employee.firstName} ${employee.lastName}</h3>
        </div>
        <div class="card-body p-3">
            <p class="text-light">Correo: ${employee.email}</p>
            <p class="text-light">Rol: ${employee.role}</p>
        </div>
        <div class="card-footer">
        <!-- Botón para editar permisos  -->
            <button user-id="${employee.id}" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditarRol">Permisos</button>
            <button user-id="${employee.id}" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalEliminarEmpleado">Eliminar</button>
        </div>
        `;

        const buttonEditRole = div.querySelector('.btn-primary');
        buttonEditRole.addEventListener('click', (e) => {
            currentEdit = e.target.getAttribute('user-id');
        });

        const buttonDelete = div.querySelector('.btn-danger');
        buttonDelete.addEventListener('click', (e) => {
            currentDelete = e.target.getAttribute('user-id');
        });

        containerEmpleados.appendChild(div);
    });
}

const formEditarRol = document.getElementById('formEditarRol');
formEditarRol.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newRole = formEditarRol['rol'].value;

    await editRole(currentEdit, newRole); 
    const modal = document.getElementById('modalEditarRol');
    const m = bootstrap.Modal.getInstance(modal);
    m.hide();

    mensaje.innerText = "Rol actualizado correctamente";
    toast.show();

    containerEmpleados.innerHTML = "";
    renderEmployees();
});

const btnEliminarEmpleado = document.getElementById('btnEliminarEmpleado');
btnEliminarEmpleado.addEventListener('click', async () => {
    const deleted = deleteEmpleado(currentDelete);

    if (!deleted) {
        mensaje.innerText = "Error al eliminar empleado";
        toast.show();
        return;
    }

    const modal = document.getElementById('modalEliminarEmpleado');
    const m = bootstrap.Modal.getInstance(modal);
    m.hide();

    mensaje.innerText = "Empleado eliminado correctamente";
    toast.show();

    containerEmpleados.innerHTML = "";
    renderEmployees();
});

const formRegistroEmpleado = document.getElementById('formRegistroEmpleado');
formRegistroEmpleado.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = formRegistroEmpleado['email'].value;
    const firstName = formRegistroEmpleado['firstName'].value;
    const lastName = formRegistroEmpleado['lastName'].value;
    const password = formRegistroEmpleado['password'].value;
    const role = formRegistroEmpleado['rolCrear'].value;

    await registerUser(email, password, firstName, lastName, role);

    // limpiar formulario
    formRegistroEmpleado.reset();

    mensaje.innerText = "Empleado registrado correctamente";
    toast.show();

    const modal = document.getElementById('modalCrearEmpleado');
    const m = bootstrap.Modal.getInstance(modal);
    m.hide();

    containerEmpleados.innerHTML = "";
    renderEmployees();
});

renderEmployees();
