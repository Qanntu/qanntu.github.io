// Aplicar el tema correcto antes de que la página se renderice


// Función para inicializar el cambio de tema y efectos
export function initializeDarkMode() {
    console.log(" Inicializando el modo oscuro...");

    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.error("Botón de cambio de tema no encontrado.");
        return;
    }

    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const root = document.documentElement;


    // Verificar el tema guardado en localStorage y aplicarlo
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        root.classList.add('dark-theme');

        themeIcon.classList.remove('fa-lightbulb');
        themeIcon.classList.add('fa-solid', 'fa-lightbulb', 'glowing');
    }

    // Agregar evento para alternar el tema al hacer clic
    themeToggle.addEventListener('click', () => {
        body.classList.add('theme-transition'); // Agregar clase para transición suave

        body.classList.toggle('dark-theme');

        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-lightbulb');
            themeIcon.classList.add('fa-solid', 'fa-lightbulb', 'glowing');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-solid', 'glowing');
            themeIcon.classList.add('fa-lightbulb');
            localStorage.setItem('theme', 'light');
        }

        // Eliminar la clase después de la animación
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 500);
    });

    //  Agregar la luz del cursor dinámicamente si no existe
    let cursorLight = document.querySelector(".cursor-light");
    if (!cursorLight) {
        cursorLight = document.createElement("div");
        cursorLight.classList.add("cursor-light");
        document.body.appendChild(cursorLight);
    }

    //  Mover el cursor suavemente y generar rastro con reducción progresiva
    document.addEventListener("mousemove", function (event) {
        requestAnimationFrame(() => {
            cursorLight.style.left = `${event.clientX}px`;
            cursorLight.style.top = `${event.clientY}px`;

            //  Crear rastro del cursor con reducción de tamaño
            createCursorTrail(event.clientX, event.clientY);
        });
    });

    // Para que funcione el menu hamburguesa del navbar

    // Esto se ejecuta inmediatamente, porque ya estás dentro de un módulo
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }



    // Función para crear el rastro del cursor con reducción de tamaño
    function createCursorTrail(x, y) {
        const trail = document.createElement("div");
        trail.classList.add("trail");
        document.body.appendChild(trail);

        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;

        // Eliminar el rastro después de un tiempo
        setTimeout(() => {
            trail.remove();
        }, 1200);
    }

    console.log("Dark mode starting correctly.");
}
