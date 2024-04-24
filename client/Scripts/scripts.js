document.getElementById("menu-toggle").addEventListener("click", function() {
    document.querySelector(".nav-items").classList.toggle("active");
});
/*Script para Destinos*/

document.addEventListener("DOMContentLoaded", function() {
    const cardContainer = document.querySelector('.card-container');
    const accessKey = 'gHTABAFdXXK-OCad1TKu58LsyhFwWFN39p6PBgoTqNQ';
    const query = 'place';
    const minWidth = 400; 
    const minHeight = 300; 

    fetch(`https://api.unsplash.com/photos/random?count=9&query=${query}&client_id=${accessKey}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(photo => {
            // Verificar el tamaño de la imagen
            if (photo.width >= minWidth && photo.height >= minHeight) {
                // Crear tarjeta solo si la imagen cumple con los requisitos de tamaño
                const card = document.createElement('div');
                card.classList.add('card');

                const img = document.createElement('img');
                img.src = photo.urls.regular;
                img.alt = photo.alt_description;

                const title = document.createElement('h2');
                title.textContent = photo.alt_description; // Puedes usar otro campo para el título si lo deseas

                // Agregar evento de clic a la tarjeta para abrir el modal
                card.addEventListener('click', function() {
                    openModal(photo);
                });

                card.appendChild(img);
                card.appendChild(title);

                cardContainer.appendChild(card);
            }
        });
    })
    .catch(error => console.error('Error al obtener imágenes:', error));


    // Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

// Función para abrir el modal
function openModal(photo) {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');

    // Limpiar contenido previo del modal
    modalContent.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = photo.alt_description;

    // Agregar título al modal
    modalContent.appendChild(title);

    // Agregar iconos al modal
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');

    const icon1 = document.createElement('i');
    icon1.classList.add('fas', 'fa-plane');
    iconsContainer.appendChild(icon1);

    const icon2 = document.createElement('i');
    icon2.classList.add('fas', 'fa-train');
    iconsContainer.appendChild(icon2);

    const icon3 = document.createElement('i');
    icon3.classList.add('fas', 'fa-hotel');
    iconsContainer.appendChild(icon3);

    // Agregar contenedor de iconos al modal
    modalContent.appendChild(iconsContainer);

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

