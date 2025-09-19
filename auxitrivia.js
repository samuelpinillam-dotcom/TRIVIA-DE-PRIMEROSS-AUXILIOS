
let respuestasCorrectas = 0; 
let preguntaActual = 0; 

const preguntas = [
    {
        texto: "¿Cuál es el primer paso al atender una persona inconsciente?",
        opciones: ["Verificar si respira", "Dar agua", "Moverla rápidamente", "Llamar a emergencias"],
        correcta: 0
    },
    {
        texto: "Si alguien sangra mucho, ¿qué debes hacer primero?",
        opciones: ["Tapar la herida con presión", "Dar agua", "Mover la parte afectada", "No hacer nada"],
        correcta: 0
    },
    {
        texto: "¿Qué número debes marcar en Colombia en caso de emergencia?",
        opciones: ["123", "911", "321", "999"],
        correcta: 0
    }
];


function mostrarPregunta() {
    const preguntaTexto = document.getElementById("texto-pregunta");
    const listaOpciones = document.querySelector("#trivia ul");
    const resultado = document.getElementById("resultadod");

    resultado.textContent = "";
    listaOpciones.innerHTML = "";

 
    preguntaTexto.textContent = preguntas[preguntaActual].texto;

    preguntas[preguntaActual].opciones.forEach((opcion, index) => {
        const li = document.createElement("li");
        li.textContent = opcion;

       
        li.addEventListener("click", () => seleccionarRespuesta(index));

        listaOpciones.appendChild(li);
    });
}


function seleccionarRespuesta(indice) {
    const resultado = document.getElementById("resultadod");

    if (indice === preguntas[preguntaActual].correcta) {
        resultado.textContent = "✅ ¡Correcto!";
        resultado.style.color = "green";
        respuestasCorrectas++;
    } else {
        resultado.textContent = "❌ Incorrecto. Intenta de nuevo.";
        resultado.style.color = "red";
    }
}


function siguientePregunta() {
    if (preguntaActual < preguntas.length - 1) {
        preguntaActual++;
        mostrarPregunta();
    } else {
        mostrarResultadoFinal();
    }
}


function mostrarResultadoFinal() {
    const trivia = document.getElementById("trivia");
    trivia.innerHTML = `
        <h2>Resultado final</h2>
        <p>Respondiste correctamente ${respuestasCorrectas} de ${preguntas.length} preguntas.</p>
        <button onclick="reiniciarTrivia()">Volver a jugar</button>
    `;
}

function reiniciarTrivia() {
    respuestasCorrectas = 0;
    preguntaActual = 0;
    mostrarPregunta();
}


document.addEventListener("DOMContentLoaded", () => {
   
    mostrarPregunta();

   
    const botonVerificar = document.querySelector(".verificar");
    botonVerificar.addEventListener("click", siguientePregunta);
});

