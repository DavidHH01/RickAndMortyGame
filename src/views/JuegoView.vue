<template>
    <div class="progress" v-if="porcentaje1">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
    </div>
    <div class="progress" v-else-if="porcentaje2">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 25%"></div>
    </div>
    <div class="progress" v-else-if="porcentaje3">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 50%"></div>
    </div>
    <div class="progress" v-else-if="porcentaje4">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
    </div>
    <div class="progress" v-else-if="porcentaje5">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>

    <div class="form-floating">
        <select name="preguntas" class="form-select" id="floatingSelect" aria-label="Floating label select example"
            @change="ShowSelected">
            <option selected>¿El personaje está vivo?</option>
            <option value="1">¿Es una variante de Rick?</option>
            <option value="2">¿Es una variante de Morty?</option>
            <option value="3">¿Es una variante de Summer?</option>
            <option value="4">¿Es una variante de Jerry?</option>
            <option value="5">¿Es una variante de Beth?</option>
            <option value="6">¿Es un alien?</option>
        </select>

    </div>
    <span></span>
</template>

<script>

export default {
    data: () => ({
        porcentaje1: true,
        porcentaje2: false,
        porcentaje3: false,
        porcentaje4: false,
        porcentaje5: false
    }),
    methods: {
        ShowSelected() {
            var cod = document.getElementById("floatingSelect").value;
            var combo = document.getElementById("floatingSelect");
            var selected = combo.options[combo.selectedIndex].text;
            alert(selected);
        }
    }
}
</script>

<style scoped>
.form-floating {
    margin-top: 4rem;
    margin-left: 23rem;
    width: 70rem;
}
</style>