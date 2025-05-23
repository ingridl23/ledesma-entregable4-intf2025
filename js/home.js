
document.addEventListener("DOMContentLoaded", () => {
  const personaje = document.getElementById("personaje");
  const titulo = document.getElementById("welcomegame");
  let despegado = false;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (!despegado && scrollY > 50) {
      despegado = true;
      personaje.style.transform = "translate(200%, -50%) scale(1.2)";
      setTimeout(() => {
        document.getElementById("btn-play").scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }

    if (despegado && scrollY <= 10) {
      despegado = false;
      personaje.style.transform = "translate(-50%, -50%) scale(1)";
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        titulo.classList.add("animado");
      } else {
        titulo.classList.remove("animado");
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(titulo);


  
  
});

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



  

  function generarInfoDejuego(){
      let btninfo= document.createElement("button");
       btninfo.classList.add("btninfo");
 
       // Agregar evento de clic para mostrar instrucciones y redireccionar
    btninfo.addEventListener("click", function() {
      
        window.location.href = "infogame.html"; // Redirigir al home del juego
    });

    // Agregar el botón al cuerpo del documento (o donde necesites)
    document.body.appendChild(btninfo);


}

    // Llamar a la función para crear el botón
  generarInfoDejuego();
