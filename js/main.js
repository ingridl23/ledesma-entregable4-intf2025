"use strict"

let runner = new Runner();
const sonido = document.getElementById("sonidoSalto");
  sonido.play(); // para reproducir

//vlogica y manejo para puntaje y temporizador del juego durante la partida 
let puntos = 0;
let vidas = 3;
let tiempoRestante = 300; // en segundos
const VIDAS_MAXIMAS = 5;
let dificultad = 0; // nivel actual de dificultad alcanzado

const puntosSpan = document.getElementById("puntos");
const vidasSpan = document.getElementById("vidas");
const tiempoSpan = document.getElementById("tiempo");

// Temporizador de 1 segundo
let temporizador = setInterval(() => {
  tiempoRestante--;
  tiempoSpan.textContent = tiempoRestante;

  if (tiempoRestante <= 0) {
    clearInterval(temporizador);
    gameOver("⏰ ¡Se acabó el tiempo!");
  }
}, 1000);


const sonidosalto = new Audio("audio/salto.mp3");

document.addEventListener('keydown', (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    sonidosalto.play();
    runner.saltar();
  }
});

/* cada 50 milisegundos verifica estado del juego */

let gameLoopInterval = setInterval(gameLoop, 50);
let enemigoInterval; 
let estrellaInterval;










function ajustarIntervalos() {
  // Limpiar intervalos actuales
  clearInterval(enemigoInterval);
  clearInterval(estrellaInterval);

  // Aumentar velocidad reduciendo intervalo (pero con límite mínimo)
  const baseEnemigo = 4000; // milisegundos
  const baseEstrella = 6000;

  const velocidadEnemigo = Math.max(1000, baseEnemigo - dificultad * 500);
  const velocidadEstrella = Math.max(2000, baseEstrella - dificultad * 300);

  // Iniciar nuevos intervalos con mayor velocidad
  enemigoInterval = setInterval(generarEnemigo, velocidadEnemigo);
  estrellaInterval = setInterval(generarEstrella, velocidadEstrella);

  console.log(`🕹️ Nuevos intervalos: enemigos cada ${velocidadEnemigo}ms, estrellas cada ${velocidadEstrella}ms`);
}












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
  // Verificá si el personaje está saltando o no
  if (!personaje.classList.contains("saltar")) {
        vidas--;
      

    console.log(`💥 Te golpearon. Vidas restantes: ${vidas}`);

    if (vidas <= 0) {
        gameOver("💀 ¡Perdiste! Te quedaste sin vidas.");
    }else {
      console.log(`💥 Te golpearon. Vidas restantes: ${vidas}`);
      vidasSpan.textContent = vidas;

    personaje.classList.add("dañado");
    setTimeout(() => personaje.classList.remove("dañado"), 300);
}
// Remover el enemigo con el que chocó
    enemigo.remove();
}
}

// Limpiar enemigos que salieron de pantalla
enemigos.forEach(enemigo => {
  if (enemigo.getBoundingClientRect().right < 0) {
    enemigo.remove();
  }
});

// Limpiar estrellas que salieron de pantalla
estrellas.forEach(estrella => {
  if (estrella.getBoundingClientRect().right < 0) {
    estrella.remove();
  }
});


    });


    




    /********************** */
    
    estrellas.forEach(estrella => {
  if (colision(personaje, estrella)) {
    if (estrella.classList.contains("gris")) {
      puntos += 5;
      console.log("⭐ ¡Ganaste 5 puntos!");
    } else if (estrella.classList.contains("amarilla")) {
         if (vidas < 3) {
        vidas += 1;
        console.log("💛 ¡Ganaste una vida!");
    } else {
        console.log("💛 Estás saludable, no podés sumar más vidas ahora.");
    }
}
     
    
    puntosSpan.textContent = puntos;
    verificarDificultad(); 
    vidasSpan.textContent = vidas;
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

    // Calcular duración de animación según dificultad
    let duracion = Math.max(1.5, 5.5 - dificultad * 0.3); // mínimo 1.5s
    
    enemigo.style.animationDuration = `${duracion}s`;
    console.log(`🚀 Velocidad enemigo: ${duracion}s`);

    document.body.appendChild(enemigo);
}








// Iniciar generación con intervalos aleatorios
function iniciarGeneracionEnemigos() {
   enemigoInterval= setInterval(generarEnemigo, Math.floor(Math.random() * 8000) + 4000); // Entre 4s y 20s
    
    
}

// Llamar a la función una vez para iniciar el ciclo
iniciarGeneracionEnemigos();





//iniciar generacion de estrellas
function iniciarGeneracionEstrellas() {
    
    //generar estrellas con un intervalo
    
    estrellaInterval= setInterval(generarEstrella, Math.floor(Math.random() * 10000) + 4000); // Entre 4s y 10s
    
    
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
    
    let duracion = Math.max(2, 5.5 - dificultad * 0.25);
    estrella.style.animationDuration = `${duracion}s`;
    console.log(`🚀 Velocidad enemigo: ${duracion}s`);


   
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


//funcion para generar el game over de la partida 
function gameOver(mensaje) {
  // Detener todos los intervalos
  clearInterval(gameLoopInterval);
  clearInterval(temporizador);
  clearInterval(enemigoInterval);
  clearInterval(estrellaInterval);

  // Detener animaciones en el body (opcional)
  document.body.style.overflow = "hidden";

  // Ocultar el contenedor del juego
  document.getElementById("contenedor").style.display = "none";

  // Mostrar la pantalla de Game Over
  const pantalla = document.getElementById("pantalla-gameover");
  pantalla.style.display = "flex";

  // Mostrar el puntaje final
  document.getElementById("puntos-finales").textContent = puntos;

  // Agregar evento para reiniciar el juego
  document.getElementById("btn-reiniciar").addEventListener("click", () => {
    location.reload();
  });
}


//funcion para agregar dificultyad a medida que se va obteniendo puntos en la partida escala ejemplo 10,20,40,60,80 ... etc

function verificarDificultad() {
  const umbral = Math.pow(2, dificultad) * 10; // 10, 20, 40, 80...

  if (puntos >= umbral) {
    dificultad++;
    console.log(`🔥 Dificultad aumentada a nivel ${dificultad}`);

    // Recalcular intervalos
    ajustarIntervalos();
  }
}
