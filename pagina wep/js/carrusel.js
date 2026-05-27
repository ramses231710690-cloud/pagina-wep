let slideIndex = 0;
let slides = document.getElementsByClassName("slide");

// Función para mostrar una slide específica
function showSlides(n) {
    // Si llegamos al final, volvemos al inicio
    if (n >= slides.length) { slideIndex = 0; }
    // Si vamos hacia atrás desde el inicio, vamos al final
    if (n < 0) { slideIndex = slides.length - 1; }

    // Ocultamos todas
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    // Mostramos la actual
    slides[slideIndex].classList.add("active");
}

// Función para los botones prev/next
function moveSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

// Cambio automático cada 4 segundos
setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
}, 4000);

// Iniciar el carrusel al cargar la página
window.onload = () => {
    showSlides(slideIndex);
};