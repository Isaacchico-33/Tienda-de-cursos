// variables
const carrito = document.querySelector('#carrito'); // 
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // aqui se va a injectar el js
const vaciarCarrito = document.querySelector('#vaciar-carrito'); // para vaciar el carrito
const listaCursos = document.querySelector('#lista-cursos'); // aqui estan todos los cursos

let articulosCarrito = [];
//
cargarEventListners();
function cargarEventListners() {
    // Cuando add un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; // resetea el arreglo
        limpiarHTML(); // elimina todo el html
    })
}


// funciones
function agregarCurso(e) {
    e.preventDefault(); // evita que la pag se reinicie
    if (e.target.classList.contains('agregar-carrito')) {
        // console.log(e.target.parentElement.parentElement);
        const cursoSeleccionado = e.target.closest('.card');
        leerDatosCurso(cursoSeleccionado); // copia el valor de la const y la lleva a otra function
    }

}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}


// lee el contenido del HTML al que le dimos click y extrae la informacion del curso
// Se le pone parametro a la function para poder obtener el valor de la const creada dentro del if
function leerDatosCurso(curso) {
    // console.log(curso); // curso es practicamente el <div class="card"></div> del html

    // Crear un objeto con el contenido del curso actual
    // Extrae la informacion de los elementos que se encuentrarn en el div card 
    const infoCurso = {
        imagen: curso.querySelector('img').src, // para seleccionar solo el src se escribe de esa forma
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), // extrae un atributo del elemento a del html
        cantidad: 1
    }
    //console.log(infoCurso);

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizar la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que nos son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregar curso al carrito
        // Agrega elementos al array de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);

    carritoHTML() // Llama la function que injecta js al carro de compras del html
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    
    // Limpiar el HTML
        // forma lenta  contenedorCarrito.innerHTML =``;
        // forma rapida con while
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        
        const { imagen, titulo, precio, cantidad, id } = curso; // destructurador de objeto
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
                <img src="${imagen}" alt="" width="100px" />
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el html del carrito en el tbody
        contenedorCarrito.append(row)
    });
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}