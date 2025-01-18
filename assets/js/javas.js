function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
}

// Para la rotación de la imagen en la sección de pizzas
window.addEventListener('scroll', function() {
    const scrollImage = document.querySelector('.scroll-image');
    const scrollPosition = window.scrollY; // Obtiene la posición del scroll
    const rotation = scrollPosition * 0.1; // Ajusta el factor de rotación
    scrollImage.style.transform = `rotate(${rotation}deg)`; // Aplica la rotación
});


document.addEventListener("DOMContentLoaded", function() {
    // Seleccionamos el contenedor del logo y el logo en sí
    const logoAnimation = document.getElementById('logoAnimation');
    const logoImage = document.getElementById('logoImage');

    // Función para iniciar la animación
    function animateLogo() {
        // Inicialmente el logo es grande y centrado
        logoImage.style.transform = 'scale(2)';
        logoAnimation.style.opacity = 1;

        // Después de 2 segundos, hacer que el logo se desplace hacia abajo y se desvanezca
        setTimeout(() => {
            logoImage.style.transform = 'scale(1)'; // Volver al tamaño original
            logoAnimation.style.opacity = 0; // Desaparecer el logo

            // Después de que el logo desaparezca, eliminamos el contenedor
            setTimeout(() => {
                logoAnimation.style.display = 'none';
            }, 2000); // Esto coincide con la duración de la animación (2 segundos)
        }, 2000); // Esto también dura 2 segundos, lo que es el tiempo que el logo permanece visible
    }

    // Llamamos a la función de animación
    animateLogo();
});
