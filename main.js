const taskForm = document.getElementById("task-form");
const tituloInput = document.getElementById("titulo");
const descripcionInput = document.getElementById("descripcion");
const tareasPendientesList = document.getElementById("tareas-pendientes");
const tareasCompletadasList = document.getElementById("tareas-completadas");

const tareas = [];

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = tituloInput.value;
    const descripcion = descripcionInput.value;
    const estado = "pendiente";

    if (titulo && descripcion) {
        const tarea = { titulo, descripcion, estado };
        tareas.push(tarea);
        actualizarTareas();
        tituloInput.value = "";
        descripcionInput.value = "";
    }
});

function actualizarTareas() {
    console.log(tareas[0].descripcion);
    tareasPendientesList.innerHTML = "";
    tareasCompletadasList.innerHTML = "";

    tareas.forEach((tarea, index) => {
        const listItem = document.createElement("li");
        const acciones = document.createElement("div");
        
        acciones.innerHTML = `
            <button class="editar" data-index="${index}">Editar Descripción</button>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
        
        if (tarea.estado === "pendiente") {
            acciones.innerHTML += `<button class="cambiar-estado" data-index="${index}">Cambiar Estado</button>`;
        }

        listItem.innerHTML = `
        <div id="tk">
            <p>${index+1}. ${tarea.titulo}</p>
            <p>Descripcion: ${tarea.descripcion}</p>
        </div>
        `;
        
        listItem.appendChild(acciones);

        listItem.querySelector(".editar").addEventListener("click", () => editarDescripcion(index));
        listItem.querySelector(".eliminar").addEventListener("click", () => eliminarTarea(index));
        
        if (tarea.estado === "pendiente") {
            listItem.querySelector(".cambiar-estado").addEventListener("click", () => cambiarEstado(index));
            tareasPendientesList.appendChild(listItem);
        } else {
            tareasCompletadasList.appendChild(listItem);
        }
    });
}

function editarDescripcion(index) {
    const nuevaDescripcion = prompt("Editar Descripción:", tareas[index].descripcion);
    if (nuevaDescripcion !== null) {
        tareas[index].descripcion = nuevaDescripcion;
        actualizarTareas();
    }
}

function eliminarTarea(index) {
    const confirmacion = confirm("¿Estás seguro de eliminar esta tarea?");
    if (confirmacion) {
        tareas.splice(index, 1);
        actualizarTareas();
    }
}

function cambiarEstado(index) {
    if (tareas[index].estado === "pendiente") {
        tareas[index].estado = "completada";
    } else {
        tareas[index].estado = "pendiente";
    }
    actualizarTareas();
}

actualizarTareas();