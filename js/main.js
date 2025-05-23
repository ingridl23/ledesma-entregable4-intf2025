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
/*setInterval(generarEnemigo, 1000);*/

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
   const estrellas = document.querySelectorAll(".estrella");


    enemigos.forEach(enemigo => {
        if (colision(personaje, enemigo)) {
            console.log("💥 ¡COLISIÓN enemigo!");
            // Podés frenar animaciones, terminar el juego, etc.



        }
    });


    
        estrellas.forEach(estrella => {
            if (colision(personaje, estrella)) {
                if (estrella.classList.contains("gris")) {
                    console.log("⭐ ¡Ganaste 5 puntos!");
                } else if (estrella.classList.contains("amarilla")) {
                    console.log("💛 ¡Ganaste una vida!");
                }
                estrella.remove(); // Eliminar la estrella después de la colisión
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
    setInterval(generarEnemigo, Math.floor(Math.random() * 8000) + 4000); // Entre 4s y 20s
    
    
}

// Llamar a la función una vez para iniciar el ciclo
iniciarGeneracionEnemigos();



//iniciar generacion de estrellas
function iniciarGeneracionEstrellas() {
    
    //generar estrellas con un intervalo
    
    setInterval(generarEstrella, Math.floor(Math.random() * 10000) + 4000); // Entre 4s y 10s
    
    
}
iniciarGeneracionEstrellas();
console.log("⏳ Iniciando generación de estrellas...");


//generar las estrellas de puntaje y de vida


function generarEstrella() {
    let estrella = document.createElement("div");

    // Definir si la estrella es gris o amarilla
    const color = Math.random() > 0.5 ? "gris" : "amarilla";
    estrella.classList.add("estrella", color);

    // Posición aleatoria en el eje X
    let posicionX = Math.floor(Math.random() * window.innerWidth);
    estrella.style.left = `${posicionX}px`;
 console.log(`🌟 Generando estrella ${color} en posición X: ${posicionX}`); // Verificar en consola



   
    document.getElementById("contenedor").appendChild(estrella);
}

















// para activar y desactivar sonido de musica
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

  // para desactivar sonido de salto

   document.addEventListener("DOMContentLoaded", function () {
       const audio = document.getElementById("sonidoSalto");
       const soundToggle = document.getElementById("sound-toggle");
    
      let isPlaying = true;
  
      soundToggle.addEventListener("click", function () {
          if (isPlaying) {
              audio.pause();
          
          } else {
              audio.play();
             
          }
          isPlaying = !isPlaying;
      });
  });

  
// generar el boton de retroceder al home del juego
  function generarbackgamehome(){
      let btninfo= document.createElement("button");
       btninfo.classList.add("btnback");
 
       // Agregar evento de clic para mostrar instrucciones y redireccionar
    btninfo.addEventListener("click", function() {
      
        window.location.href = "index.html"; // Redirigir al home del juego
    });

    // Agregar el botón al cuerpo del documento (o donde necesites)
    document.body.appendChild(btninfo);


}

    // Llamar a la función para crear el botón
  generarbackgamehome();


