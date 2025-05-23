


class Estrella extends Personaje {
   
      

    constructor() {
        super();
        
        this.enemigo = document.createElement("div");
        this.enemigo.classList.add("estrella");
        document.getElementById("contenedor").appendChild(this.estrella);


    }

    status() {
        super.status();
    }

}