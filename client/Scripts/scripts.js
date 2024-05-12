/*Barra desplegable*/ 

document.getElementById("menu-toggle").addEventListener("click", function() {
    document.querySelector(".nav-items").classList.toggle("active");
});

/*Script para Destinos*/

document.addEventListener("DOMContentLoaded", function() {
    const cardContainer = document.querySelector('.card-container');

    // Importar los datos de lugares turísticos desde data.js
    const lugaresTuristicos = window.lugaresTuristicos;

    // Iterar sobre cada lugar turístico y crear una tarjeta para cada uno
    lugaresTuristicos.forEach(lugar => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = lugar.imagen; // Utilizamos la URL de la imagen del lugar turístico
        img.alt = lugar.nombre_lugar;

        const title = document.createElement('h2');
        title.textContent = lugar.nombre_lugar;

        // Agregar evento de clic a la tarjeta para abrir el modal
        card.addEventListener('click', function() {
            openModal(lugar);
        });

        // Crear el botón "Ver más"
        const verMasBtn = document.createElement('button');
        verMasBtn.textContent = 'Ver más';
        verMasBtn.classList.add('ver-mas-btn');

        // Agregar el botón al contenedor deseado
        document.querySelector('.card-container').appendChild(verMasBtn);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(verMasBtn); // Agregar el botón "Ver más" a la tarjeta

        cardContainer.appendChild(card);
    });

    // Función para cerrar el modal
    function closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = "none";
    }

    // Función para abrir el modal
    function openModal(lugar) {
        const modal = document.getElementById('modal');
        const modalContent = modal.querySelector('.modal-content');

        // Limpiar contenido previo del modal
        modalContent.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = lugar.nombre_lugar;

        // Agregar título al modal
        modalContent.appendChild(title);

        const provincia = document.createElement('p');
        provincia.textContent = `Provincia: ${lugar.nombre_provincia}`;
        modalContent.appendChild(provincia);

        const descripcion = document.createElement('p');
        descripcion.textContent = lugar.descripcion;
        modalContent.appendChild(descripcion);

        // Agregar botón de cierre al modal
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.innerHTML = '&times;'; // Utilizamos el carácter '×' para el botón de cerrar
        modalContent.appendChild(closeBtn);

        // Mostrar el modal
        modal.style.display = "block";

        // Asignar evento de clic al botón de cierre
        closeBtn.addEventListener('click', closeModal);
    }
});


