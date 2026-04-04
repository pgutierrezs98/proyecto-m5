import Tarea from "./classes/Tarea.js"
import GestorTareas from "./classes/GestorTareas.js"

const formularioTarea = document.getElementById('formTareas');
const listarTareas = document.getElementById('listaTareas');
const alertContainer = document.getElementById('alertContainer');

// Crear instancia de GestorTareas y Tareas
const gestorTareas = new GestorTareas()
//Agregar tareas
gestorTareas.agregarTarea(new Tarea(1, 'Tarea 1', true, new Date()));
gestorTareas.agregarTarea(new Tarea(2, 'Tarea 2', true, new Date()));
gestorTareas.agregarTarea(new Tarea(3, 'Tarea 3', false, new Date()));

const renderizarTareas = () => {
    listarTareas.innerHTML = ''
    gestorTareas.listarTareas().forEach(tarea => {
        // Crear elemento <li> para rellenarlo con los datos de cada tarea
        const li = document.createElement('li');
        // Asignarle clases al <li> creado
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        // TO-DO: <span> con cuenta regresiva (cuánto falta para fecha limite de la tarea)
        const span = document.createElement('span');
        span.dataset.id = tarea.id;

        // Obtener detalles de la tarea
        const { descripcion, estado } = tarea;
        li.textContent = `${descripcion} - ${estado ? 'Completada' : 'Pendiente'}`;

        // Botón de eliminar tarea
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-danger', 'btn-sm');
        buttonDelete.textContent = 'Eliminar';
        buttonDelete.dataset.id = tarea.id;
        // Botón de cambiar estado de tarea
        const buttonEstado = document.createElement('button');
        buttonEstado.classList.add('btn', 'btn-success', 'btn-sm');
        buttonEstado.textContent = 'Cambiar Estado';
        buttonEstado.dataset.id = tarea.id;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('btn-group');

        
        // Agregar botones al contenedor de botones
        buttonContainer.appendChild(buttonDelete);
        buttonContainer.appendChild(buttonEstado);

        // Agregar contenedor de botones al <li>
        li.appendChild(buttonContainer);

        //Agregar <li> a la lista de tareas <ul>
        listarTareas.appendChild(li);
    });
};

// Renderizar tareas para la primera carga de la página
renderizarTareas();

formularioTarea.addEventListener('submit', (event) => {
    event.preventDefault();

    // Simular retardo al agregar tarea
    insertAlert('warning', 'Agregando tarea, por favor espere..');
    setTimeout(() => {
        const descripcion = document.getElementById('descripcion').value;
        const fechaLimite = document.getElementById('fechaLimite').value;

    // Si es que se selecciona una fecha limite en el input, la convertimos a milisegundos, si no -> devolvemos undefined
        const tiempoLimite = fechaLimite
            ? new Date(fechaLimite).getTime()
            : undefined;

        gestorTareas.agregarTarea(new Tarea(Date.now(), descripcion, false, new Date(), tiempoLimite),
        );
        console.log(gestorTareas.listarTareas());

        // Renderizar tareas, para actualizar la lista
        renderizarTareas();
        insertAlert('success', 'Tarea agregada correctamente')
    }, 2000);
});

// Manejar clicks de botones dentro de cada <li>
listarTareas.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-danger')) {
        const id = Number(event.target.dataset.id);
        gestorTareas.eliminarTarea(id);
        renderizarTareas();
    } else if (event.target.classList.contains('btn-success')) {
        const id = Number(event.target.dataset.id);
        gestorTareas.cambiarEstado(id);
        renderizarTareas();
    }
});

const insertAlert = (className, message) => {
    alertContainer.innerHTML = '';
    const alert = `
    <div class="alert alert-${className} alert-dismissible fade show" role="alert">
        ${message}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;

    alertContainer.innerHTML = alert;
}