import Tarea from "./classes/Tarea.js";
import GestorTareas from "./classes/GestorTareas.js";
import { success, error, options } from "./api/Geolocalization.js";

const formularioTarea = document.getElementById("formTareas");
const listarTareas = document.getElementById("listaTareas");
const alertContainer = document.getElementById("alertContainer");

// Crear instancia de GestorTareas y Tareas
const gestorTareas = new GestorTareas();

// Función auxiliar para formatear números a 2 dígitos
const formatearDosDigitos = (num) => num.toString().padStart(2, "0");

// Crear cuenta regresiva
const contadorRegresivo = (fechaLimite) => {
  if (!fechaLimite) return "No hay una fecha límite";

  const fechaActual = new Date().getTime();
  const fechaLimiteMs = new Date(fechaLimite).getTime();
  if (isNaN(fechaLimiteMs)) return "Fecha límite no válida";
  const diferencia = fechaLimiteMs - fechaActual;

  if (diferencia <= 0) return "Tiempo finalizado";

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  return `${dias} días, ${formatearDosDigitos(horas)}:${formatearDosDigitos(minutos)}:${formatearDosDigitos(segundos)}`;
};

const renderizarTareas = () => {
  listarTareas.innerHTML = "";
  gestorTareas.listarTareas().forEach((tarea) => {
    // Crear elemento <li> para rellenarlo con los datos de cada tarea
    const li = document.createElement("li");
    // Asignarle clases al <li> creado
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    );

    // <span> con cuenta regresiva (cuánto falta para fecha limite de la tarea)
    const span = document.createElement("span");
    span.dataset.id = tarea.id;
    span.classList.add("small", "text-muted", "date-countdown");
    span.textContent = contadorRegresivo(tarea.fechaLimite);

    // Obtener detalles de la tarea
    const { descripcion, estado } = tarea;
    li.textContent = `${descripcion} - ${estado ? "Completada" : "Pendiente"}`;
    // Agregar cuenta regresiva al elemento de lista
    li.appendChild(span);

    // Botón de eliminar tarea
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("btn", "btn-danger", "btn-sm");
    buttonDelete.textContent = "Eliminar";
    buttonDelete.dataset.id = tarea.id;
    // Botón de cambiar estado de tarea
    const buttonEstado = document.createElement("button");
    buttonEstado.classList.add("btn", "btn-success", "btn-sm");
    buttonEstado.textContent = "Cambiar Estado";
    buttonEstado.dataset.id = tarea.id;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-group");

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

// Actualizar el contador regresivo 1 vez por segundo
setInterval(() => {
  const countdown = document.querySelectorAll(".date-countdown");
  console.log(countdown);
  countdown.forEach((span) => {
    const id = Number(span.dataset.id);
    const tarea = gestorTareas.listarTareas().find((t) => t.id === id);
    if (!tarea) return;
    span.textContent = contadorRegresivo(tarea.fechaLimite);
  });
}, 1000);

formularioTarea.addEventListener("submit", (event) => {
  event.preventDefault();

  // Deshabilitar botón submit
  document.querySelector('button[type="submit"]').disabled = true;
  // Insertar alert informativa para el usuario (informar tiempo de espera)
  insertAlert("warning", "Agregando tarea, por favor espere..");

  // Simular retardo al agregar tarea
  setTimeout(() => {
    const descripcion = document.getElementById("descripcion").value;
    const fechaLimite = document.getElementById("fechaLimite").value;

    // Si es que se selecciona una fecha limite en el input, la convertimos a milisegundos, si no -> devolvemos undefined
    const tiempoLimite = fechaLimite
      ? new Date(fechaLimite).getTime()
      : undefined;

    gestorTareas.agregarTarea(
      new Tarea(Date.now(), descripcion, false, Date.now(), tiempoLimite),
    );
    console.log(gestorTareas.listarTareas());

    // Renderizar tareas, para actualizar la lista
    renderizarTareas();
    // Limpiar formulario
    event.target.reset();
    insertAlert("success", "Tarea agregada correctamente");
    //Habilitar botón submit luego de finalizado el alert
    document.querySelector('button[type="submit"]').disabled = false;
  }, 2000);
});

// Manejar clicks de botones dentro de cada <li>
listarTareas.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-danger")) {
    const id = Number(event.target.dataset.id);
    gestorTareas.eliminarTarea(id);
    insertAlert("success", "Tarea eliminada exitosamente");
    renderizarTareas();
  } else if (event.target.classList.contains("btn-success")) {
    const id = Number(event.target.dataset.id);
    gestorTareas.cambiarEstado(id);
    renderizarTareas();
  }
});

const insertAlert = (className, message) => {
  alertContainer.innerHTML = "";
  const alert = `
    <div class="alert alert-${className} alert-dismissible fade show" role="alert">
        ${message}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;

  alertContainer.innerHTML = alert;
};

// Usando API Geolocalization
navigator.geolocation.getCurrentPosition(success, error, options);
