<template>
  <div class="card">
    <img :src="personaje.imagen" alt="Avatar" style="width:100%">
    <div class="container">
      <h1 class="idpersonaje" v-text="'ID:'"></h1>
      <h4 class="nombredelpersonaje" v-text="personaje.nombre"></h4>
      <div class="estadopersonaje">
        <!--
        <p v-if="personaje.estado == 1">Estado: Vivo 🟢</p>
        <p v-else-if="personaje.estado == 2">Estado: Muerto 🔴</p>
        <p v-else-if="personaje.estado == 3">Estado: Desconocido ⚪</p>
        -->
      </div>
      <a name="carta"></a>
    </div>
  </div>
</template>
  
<script>
export default {
  data: () => ({

  }),
  props: {
    identificador: String
  }
}
</script>
  
<style scoped lang="scss">
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
</style>
