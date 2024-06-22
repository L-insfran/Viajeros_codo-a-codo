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


//Acá va la logica del form AÑDIR DESTINOS

document.getElementById('destinationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    const destination = {
        name: formData.get('name'),
        description: formData.get('description'),
        categoryId: formData.get('category'),
        provinceId: formData.get('province'),
        image: formData.get('image')
    };

    console.log('Destino agregado:', destination);
    // DE acá los mandamos al back normalmente
    // fetch('/api/destinations', {
    //     method: 'POST',
    //     body: formData,
    // }).then(response => response.json()).then(data => {
    //     console.log(data);
    // }).catch(error => {
    //     console.error('Error:', error);
    // });
});

const categoriesSelect = document.getElementById('categories');
const selectedCategoriesDiv = document.getElementById('selectedCategories');
const selectedCategories = [];

categoriesSelect.addEventListener('change', (event) => {
    const options = event.target.options;
    selectedCategoriesDiv.innerHTML = '';
    selectedCategories.length = 0;
    for (let option of options) {
        if (option.selected) {
            selectedCategories.push(option.value);
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-item');
            categoryItem.textContent = option.text;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => {
                const index = selectedCategories.indexOf(option.value);
                if (index > -1) {
                    selectedCategories.splice(index, 1);
                    option.selected = false;
                    categoryItem.remove();
                }
            });
            categoryItem.appendChild(removeButton);
            selectedCategoriesDiv.appendChild(categoryItem);
        }
    }
});