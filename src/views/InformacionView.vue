<template>

    
<!-- Button trigger modal -->
<button type="button" id="boton1" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="jugar">Jugar</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <img src="https://1000marcas.net/wp-content/uploads/2022/04/Rick-and-Morty.png" class="imagenlogo">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="juego"></button>
      </div>
      <div class="modal-body">
        Realiza una serie de preguntas y <br>adivina el personaje de Rick y Morty.<br>
        ¿Eres un verdadero fan? Descúbrelo.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="juego">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        arrayPersonaje: []
    }),
    methods: {
        async jugar() {
            var num = Math.floor(Math.random() * 824 + 1);
            console.log(num);
            let response = await axios.get("https://rickandmortyapi.com/api/character/" + num);
            this.result = response.data;
            var personaje = { id: this.result.id, nombre: this.result.name, imagen: this.result.image, estado: this.estado };
            this.arrayPersonaje.push(personaje);
        },
        juego(){
            this.$router.push({path: 'juego'});
        }
    }
}
</script>

<style scoped>
h1 {
    color: white;
}
.imagenlogo{
    width: 15rem;
    height: 8rem;
    margin-left: 7rem;
}

#boton1{
    margin-top: 20rem;
    width: 20rem;
    height: 5rem;
}
</style>