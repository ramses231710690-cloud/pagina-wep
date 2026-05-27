// --- 1. Memoria de vidas y progreso ---
let vidasActuales = localStorage.getItem('vidasChubis') ? parseInt(localStorage.getItem('vidasChubis')) : 10;

// Al cargar, busca si hay progreso. Si no, empieza en 0.
let indicePregunta = localStorage.getItem('preguntaGuardada') ? parseInt(localStorage.getItem('preguntaGuardada')) : 0;

// 2. LA LISTA DE PREGUNTAS (Aquí agregas las 30 que quieras)
const preguntas = [
    {
        frase: "What is the meaning of Hello?",
        opciones: [
            { texto: "Hola", correcta: true },
            { texto: "Adiós", correcta: false },
            { texto: "Gracias", correcta: false },
            { texto: "Perdón", correcta: false }
        ]
    },
    {
        frase: "What is the meaning of Good morning?", // Tu segunda pregunta
        opciones: [
            { texto: "Buenas noches", correcta: false },
            { texto: "Buenas tardes", correcta: false },
            { texto: "Buenos días", correcta: true },
            { texto: "Hola", correcta: false }
        ]
    },
    {
        frase: "What is the meaning of Thank you?",
        opciones: [
            { texto: "Gracias", correcta: true },
            { texto: "Perdon", correcta: false },
            { texto: "Hola", correcta: false },
            { texto: "Si", correcta: false }
        ]
    },
    {
        frase: "What is the meaning of Sorry?",
        opciones: [
            { texto: "Gracias", correcta: false },
            { texto: "Lo siento", correcta: true },
            { texto: "Hola", correcta: false },
            { texto: "Bienvenido", correcta: false }
        ]
    },
    {
        frase: "What is the meaning of Please?",
        opciones: [
            { texto: "Perdon", correcta: false },
            { texto: "Hola", correcta: false },
            { texto: "Por favor", correcta: true },
            { texto: "Adios", correcta: false }
        ]
    },
    {
        frase: "What is Yes in Spanish?",
        opciones: [
            { texto: "No", correcta: false },
            { texto: "Si", correcta: true },
            { texto: "Talvez", correcta: false },
            { texto: "Nunca", correcta: false }
        ]
    },
    {
        frase: "What is No in Spanish?",
        opciones: [
            { texto: "Si", correcta: false },
            { texto: "Tal vez", correcta: false },
            { texto: "No", correcta: true },
            { texto: "Hola", correcta: false }
        ]
    },
    {
        frase: "What is Friend in Spanish?",
        opciones: [
            { texto: "Amigo", correcta: true },
            { texto: "Casa", correcta: false },
            { texto: "Libro", correcta: false },
            { texto: "Perro", correcta: false }
        ]
    },
    {
        frase: "What is House in Spanish?",
        opciones: [
            { texto: "Escuela", correcta: false },
            { texto: "Casa", correcta: true },
            { texto: "Calle", correcta: false },
            { texto: "Parque", correcta: false }
        ]
    },
    {
        frase: "What is Book in Spanish?",
        opciones: [
            { texto: "Mesa", correcta: false },
            { texto: "Libro", correcta: true },
            { texto: "Silla", correcta: false },
            { texto: "Puerta", correcta: false }
        ]
    },
    {
        frase: "What is Water in Spanish?",
        opciones: [
            { texto: "Leche", correcta: false },
            { texto: "Agua", correcta: true },
            { texto: "Cafe", correcta: false },
            { texto: "Te", correcta: false }
        ]
    }
];

// 3. LA FUNCIÓN MÁGICA: Cambia los textos en la pantalla
function cargarPregunta() {
    const data = preguntas[indicePregunta];
    
    // Ahora usamos .innerHTML para que reconozca el texto completo
    // Si quieres que alguna palabra resalte, puedes usar <span> en la frase
    document.getElementById("texto-pregunta-completa").innerHTML = data.frase;
    
    // El resto de la función (contador y botones) se queda igual...
    document.getElementById("contador-preguntas").innerText = (indicePregunta + 1) + " / 30";
    
    const botones = document.querySelectorAll(".btn-respuesta");
    data.opciones.forEach((opcion, i) => {
        botones[i].innerText = opcion.texto;
        botones[i].onclick = () => validarRespuesta(opcion.correcta);
    });
}

// 4. VALIDACIÓN: ¿Qué pasa cuando el usuario hace clic?
function validarRespuesta(esCorrecta) {
    if (esCorrecta) {
        alert("¡Excelente! Es correcto. 😸");
        
        if (indicePregunta < preguntas.length - 1) {
            indicePregunta++; 
            
            // Aquí guardas el progreso en la memoria del navegador
            localStorage.setItem('preguntaGuardada', indicePregunta);
            
            cargarPregunta(); // Esto cambia el texto de la pantalla
        } else {
            alert("¡FELICIDADES! Terminaste el nivel.");
            localStorage.removeItem('preguntaGuardada'); // Se borra porque YA TERMINASTE
            window.location.href = "../niveles.html";
        }
    } else {
        alert("¡Oh no! Inténtalo de nuevo. 👋");
        perderVida(); // Esto quita un gato
    }
}

// 5. FUNCIÓN PERDER VIDA (Mantiene las X aunque vayas al diccionario)
function perderVida() {
    if (vidasActuales > 0) {
        let idGatito = 'vida' + vidasActuales;
        let gatitoElemento = document.getElementById(idGatito);
        if (gatitoElemento) gatitoElemento.src = "../img/gato-vida-x.png";
        
        vidasActuales--;
        localStorage.setItem('vidasChubis', vidasActuales);
        
        if (vidasActuales === 0) {
            alert("GAME OVER");
            localStorage.removeItem('vidasChubis');
            window.location.href = "../niveles.html";
        }
    }
}

// 6. INICIO AL CARGAR LA PÁGINA
window.onload = function() {
    // Ponemos las X que ya traía el usuario de antes
    for (let i = 10; i > vidasActuales; i--) {
        let gatito = document.getElementById('vida' + i);
        if (gatito) gatito.src = "../img/gato-vida-x.png";
    }
    cargarPregunta(); // Carga la primera pregunta automáticamente
};