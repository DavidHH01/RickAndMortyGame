<template>
  <div>
    <nav class="navbar bg-light">
      <div class="container-fluid">
        <form class="d-flex" role="search" @submit.prevent="comprobar('carta')">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
            v-model="nombrepersonaje">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="lastsearch" v-for="personaje in arrayBusqueda" :key="personaje.identify">
          <p v-text="'Última búsqueda:' + personaje.nombre"></p>
        </div>
        <button type="button" class="btn btn-danger" @click="detalles">Jugar</button>
      </div>
    </nav>

    <div class="card" v-for="personaje in arrayPersonaje" :key="personaje.identify">
      <img :src="personaje.imagen" alt="Avatar" style="width:100%">
      <div class="container">
        <h1 class="idpersonaje" v-text="'ID:' + personaje.id"></h1>
        <h4 class="nombredelpersonaje" v-text="personaje.nombre"></h4>
        <div class="estadopersonaje">
          <p v-if="personaje.estado == 1">Estado: Vivo 🟢</p>
          <p v-else-if="personaje.estado == 2">Estado: Muerto 🔴</p>
          <p v-else-if="personaje.estado == 3">Estado: Desconocido ⚪</p>
        </div>
        <a name="carta"></a>
      </div>
    </div>

  <!--<carta-componente />-->
  </div>
</template>

<script>
import axios from "axios";
//import CartaComponente from "@/components/CartaComponente.vue";

export default {

  name: "app",
  //components: {
  //  CartaComponente
  //},
  data: () => ({
    nombrepersonaje: "",
    arrayPersonaje: [],
    estado: 1,
    repetido: false,
    arrayBusqueda: [],
    id:""
  }),
  methods: {
    async comprobar(info) {
      this.repetido = false;
      let response = await axios.get("https://rickandmortyapi.com/api/character/" + this.nombrepersonaje);
      this.result = response.data;

      for (let i = 0; i < this.arrayPersonaje.length; i++) {
        if (this.arrayPersonaje.length != 0) {
          if (this.arrayPersonaje[i].nombre == this.result.name) {
            this.repetido = true;
          }
        }
      }
      console.log(this.repetido);
      if (this.repetido == false) {
        if (this.result.status == "Alive") {
          this.estado = 1;
        }
        else if (this.result.status == "Dead") {
          this.estado = 2;
        }
        else {
          this.estado = 3;
        }

        var personaje = { id: this.result.id, nombre: this.result.name, imagen: this.result.image, estado: this.estado };
        this.id = this.result.id;
        this.arrayPersonaje.push(personaje);

        if (this.arrayBusqueda.length != 0) {
          this.arrayBusqueda.pop();
          this.arrayBusqueda.push(personaje);
        }
        else {
          this.arrayBusqueda.push(personaje);
        }
        window.location.href = "#" + info;
      }
    },
    detalles() {
      this.$router.push({ path: 'juego' });
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 20%;
  border-radius: 5px;
  display: inline-block;
  margin: 20px;
}

.card:hover {
  box-shadow: 0 8px 24px 0 rgba(152, 206, 76, 0.678);
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
  font-family: 'Hanalei Fill', cursive;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.nombredelpersonaje {
  grid-column: 2;
  grid-row: 1;
}

.idpersonaje {
  grid-column: 1;
  grid-row: span 2;
  justify-self: center;
  place-self: center;
}

.estadopersonaje {
  grid-column: 2;
  grid-row: 2;
}

.lastsearch {
  margin-right: 90rem;
  margin-top: 2rem;
  display: inline-block;
}
</style>
