"use strict"

let runner = new Runner();
const sonido = document.getElementById("sonidoSalto");
  sonido.play(); // para reproducir




const sonidosalto = new Audio("audio/salto.mp3");

document.addEventListener('keydown', (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    sonidosalto.play();
    runner.saltar();
  }
});

/* cada 50 milisegundos verifica estado del juego */
setInterval(gameLoop, 50);



/* cada 1 segundo genera un enemigo */
setInterval(generarEnemigo, 1000);

function colision(pj, enemigo) {
    const a = pj.getBoundingClientRect();
    const b = enemigo.getBoundingClientRect();

    return (
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
    );
}



/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {

    //console.log(runner.status())

const enemigos = document.querySelectorAll('.enemigo');
    const personaje = document.getElementById("personaje");

    enemigos.forEach(enemigo => {
        if (colision(personaje, enemigo)) {
            console.log("💥 ¡COLISIÓN!");
            // Podés frenar animaciones, terminar el juego, etc.
        }
    });
}

function generarEnemigo() {
    let enemigo = document.createElement("div");
    enemigo.classList.add("enemigo");

    // Posición aleatoria en el eje X
    let posicionX = Math.floor(Math.random() * window.innerWidth);
    enemigo.style.left = `${posicionX}px`;

    document.body.appendChild(enemigo);
}

// Iniciar generación con intervalos aleatorios
function iniciarGeneracionEnemigos() {
    setInterval(generarEnemigo, Math.floor(Math.random() * 1500) + 1000); // Entre 1s y 2.5s
}

// Llamar a la función una vez para iniciar el ciclo
iniciarGeneracionEnemigos();




  document.addEventListener("DOMContentLoaded", function () {
      const audio = document.getElementById("background-music");
      const soundToggle = document.getElementById("sound-toggle");
  
      let isPlaying = true;
  
      soundToggle.addEventListener("click", function () {
          if (isPlaying) {
              audio.pause();
              soundToggle.src = "images/Close_BTN.png"; // Cambia la imagen cuando se mutea
          } else {
              audio.play();
              soundToggle.src = "images/Music_BTN.png"; // Cambia la imagen cuando se activa el sonido
          }
          isPlaying = !isPlaying;
      });
  });