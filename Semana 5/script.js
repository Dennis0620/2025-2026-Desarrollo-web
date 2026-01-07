const inputUrl = document.getElementById('urlInput');
const btnAdd = document.getElementById('addBtn');
const btnDelete = document.getElementById('deleteBtn');
const galleryContainer = document.getElementById('galleryContainer');
const mainImage = document.getElementById('current-image');
const statusText = document.getElementById('image-status');

// 1. FUNCIÓN PRINCIPAL: SELECCIONAR IMAGEN
// Esta función se encarga de la lógica visual al hacer clic en una foto pequeña
function selectImage(imgElement) {
    // a. Deseleccionar todas las imágenes previas
    // Buscamos todas las que tengan la clase .thumb
    const allThumbs = document.querySelectorAll('.thumb');
    
    // Recorremos y quitamos la clase 'active' (el borde azul)
    allThumbs.forEach(thumb => {
        thumb.classList.remove('active');
    });

    // b. Seleccionar la imagen actual
    imgElement.classList.add('active');

    // c. Actualizar el visor grande
    
    mainImage.style.opacity = 0; 
    
    setTimeout(() => {
        mainImage.src = imgElement.src;
        mainImage.style.opacity = 1;
        statusText.textContent = "Imagen visualizada";
        statusText.style.color = "#4da6ff";
    }, 200);
}

// 2. FUNCIÓN: AGREGAR NUEVA IMAGEN (Create)
function addImage() {
    const url = inputUrl.value.trim(); 

    // Validación: Si el input está vacío, no hacemos nada
    if (url === "") {
        alert("⚠️ Por favor, pega una URL válida primero.");
        return;
    }

    // a. Crear el elemento <img> nuevo
    const newImg = document.createElement('img');

    // b. Configurar sus propiedades
    newImg.src = url;
    newImg.classList.add('thumb'); 
    newImg.alt = "Imagen de galería";

    // c. Manejo de error (Si la URL está rota)
    newImg.onerror = function() {
        alert("❌ No se pudo cargar la imagen. Revisa la URL.");
        newImg.remove(); 
    };

    // d. IMPORTANTE: Asignar el evento CLICK a la nueva imagen
    newImg.addEventListener('click', function() {
        selectImage(newImg);
    });

    // e. Insertar en el DOM (dentro del contenedor)
    galleryContainer.appendChild(newImg);

    // f. Limpieza y UX
    inputUrl.value = ""; 
    selectImage(newImg); 
}

// 3. FUNCIÓN: ELIMINAR IMAGEN (Delete)
function deleteImage() {
    const selectedImg = document.querySelector('.thumb.active');

    if (selectedImg) {
        
        selectedImg.remove();
        
        // Resetear la vista principal
        mainImage.src = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000"; 
        statusText.textContent = "Imagen eliminada. Selecciona otra.";
        statusText.style.color = "#da3633"; 
    } else {
        alert("⚠️ No hay ninguna imagen seleccionada para eliminar.");
    }
}

// 4. ASIGNACIÓN DE EVENTOS (Listeners)

btnAdd.addEventListener('click', addImage);
btnDelete.addEventListener('click', deleteImage);

// Atajo de teclado: ENTER en el input para agregar
inputUrl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addImage();
    }
});

// Atajo de teclado: SUPR (Delete) para borrar la seleccionada
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        deleteImage();
    }
});

// 5. INICIALIZACIÓN (Para imágenes que ya existan en el HTML)
const initialImages = document.querySelectorAll('.thumb');
initialImages.forEach(img => {
    img.addEventListener('click', function() {
        selectImage(img);
    });
});