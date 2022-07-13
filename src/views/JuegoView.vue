<template >
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="https://1000marcas.net/wp-content/uploads/2022/04/Rick-and-Morty.png" class="imagenlogo">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="juego"></button>
                </div>
                <div class="modal-body">
                    Realiza una serie de preguntas y <br>adivina el personaje de Rick y Morty.<br>
                    ¿Eres un verdadero fan? Descúbrelo.
                    <br>
                    <br>
                    -------------<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;REGLAS <br>
                    -------------<br>
                    <br>
                    <br>
                    * Cada pregunta realizada resta 10 puntos
                    <br>
                    * Cada intento de acierto resta 40 puntos
                    <br>
                    <br>
                    La puntación máxima es de 230 puntos y dispones de 4 intentos para adivinar el personaje. !Buena
                    suerte¡

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click="juego">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="progress" v-if="porcentaje1">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 0%">0/4</div>
    </div>
    <div class="progress" v-else-if="porcentaje2">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 25%">1/4</div>
    </div>
    <div class="progress" v-else-if="porcentaje3">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 50%">2/4</div>
    </div>
    <div class="progress" v-else-if="porcentaje4">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 75%">3/4</div>
    </div>
    <div class="progress" v-else-if="porcentaje5" :titulo="this.titulo">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100" style="width: 100%">4/4</div>
    </div>

    <div class="botones">
        <button id="boton1" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                class="fa fa-info-circle"></i> | Information</button>

        <button id="boton2" class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Preguntas</button>

        <form class="row g-3" id="adivinar" @submit.prevent="adivinarIntento">
            <div class="col-auto">
                <label for="inputPassword2" class="visually-hidden"></label>
                <input type="text" class="form-control" id="inputPassword2" placeholder="Introduce el personaje"
                    v-model="nombreadivina">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Adivinar</button>
            </div>
        </form>
    </div>

    <div class="form-floating">
        <div class="shadow-sm p-3 mb-5 bg-body rounded" id="resultado">Score: {{ this.score }}</div>
        <select name="preguntas" class="form-select" id="floatingSelect" aria-label="Floating label select example">
            <option selected></option>
            <option value="1">¿Es una variante de Rick?</option>
            <option value="2">¿Es una variante de Morty?</option>
            <option value="3">¿Es una variante de Summer?</option>
            <option value="4">¿Es una variante de Jerry?</option>
            <option value="5">¿Es una variante de Beth?</option>
            <option value="6">¿Es un alien?</option>
            <option value="7">¿El personaje está vivo?</option>
        </select>
    </div>

    <button id="boton3" class="btn btn-primary" type="button" @click="ShowSelected">Realizar pregunta</button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">Preguntas y respuestas</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" v-for="seleccion in arrayPreguntas" :key="seleccion.identify">
            <p v-text="seleccion.pregunta"></p>
            <p v-text="seleccion.respuestas"></p>
        </div>
    </div>
    <div class="shadow-none p-3 mb-5 bg-light rounded" id="respuesta">{{ this.respuesta }}</div>




</template>

<script>
import axios from 'axios';

export default {

    data: () => ({
        porcentaje1: true,
        porcentaje2: false,
        porcentaje3: false,
        porcentaje4: false,
        porcentaje5: false,
        arrayPreguntas: [],
        personaje: [],
        respuesta: "",
        seleccion: "",
        contador: 0,
        score: 230,
        nombreadivina: ""

    }),
    methods: {
        adivinarIntento() {
            this.contador = this.contador + 1;
            if (this.contador != 5) {
                if (this.nombreadivina == this.personaje.nombre) {
                    alert('HAS GANADO');
                    window.location.reload();
                }
                else {
                    this.score = this.score - 40;
                }

                if (this.contador == 0) {
                    this.porcentaje1 = true;
                    this.porcentaje2 = false;
                    this.porcentaje3 = false;
                    this.porcentaje4 = false;
                    this.porcentaje5 = false;
                } else if (this.contador == 1) {
                    this.porcentaje1 = false;
                    this.porcentaje2 = true;
                    this.porcentaje3 = false;
                    this.porcentaje4 = false;
                    this.porcentaje5 = false;
                }
                else if (this.contador == 2) {
                    this.porcentaje1 = false;
                    this.porcentaje2 = false;
                    this.porcentaje3 = true;
                    this.porcentaje4 = false;
                    this.porcentaje5 = false;
                }
                else if (this.contador == 3) {
                    this.porcentaje1 = false;
                    this.porcentaje2 = false;
                    this.porcentaje3 = false;
                    this.porcentaje4 = true;
                    this.porcentaje5 = false;
                } else {
                    this.porcentaje1 = false;
                    this.porcentaje2 = false;
                    this.porcentaje3 = false;
                    this.porcentaje4 = false;
                    this.porcentaje5 = true;
                }

            } else {
                this.score = 0;
            }
        },
        ShowSelected() {
            if (this.contador != 5) {
                var value = document.getElementById("floatingSelect");
                var combo = document.getElementById("floatingSelect");
                var selected = combo.options[combo.selectedIndex].text;
                var number = value.options[value.selectedIndex].value;

                if (number == 1) {
                    if (this.personaje.nombre.includes("Rick")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                } else if (number == 2) {
                    if (this.personaje.nombre.includes("Morty")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                } else if (number == 3) {
                    if (this.personaje.nombre.includes("Summer")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                } else if (number == 4) {
                    if (this.personaje.nombre.includes("Jerry")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                } else if (number == 5) {
                    if (this.personaje.nombre.includes("Beth")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                } else if (number == 6) {
                    if (!this.personaje.nombre.includes("Rick") && !this.personaje.nombre.includes("Morty") && !this.personaje.nombre.includes("Summer") && !this.personaje.nombre.includes("Jerry") && !this.personaje.nombre.includes("Beth")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                } else if (number == 7) {
                    if (this.personaje.estado.includes("Vivo")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                } else {
                    this.respuesta = "Por favor seleccione una pregunta";
                }
                this.arrayPreguntas.push(this.seleccion);
            } else {
                this.score = 0;
            }
        }
    },
    created: async function () {
        var num = Math.floor(Math.random() * 824 + 1);
        console.log(num);
        let response = await axios.get("https://rickandmortyapi.com/api/character/" + num);
        this.result = response.data;
        this.personaje = { id: this.result.id, nombre: this.result.name, imagen: this.result.image, estado: this.estado };
        console.log(this.result.name);
    },
    watch: {
        score() {
            if (this.score <= 0) {
                this.score = 0;
                alert('HAS PERDIDO');
                window.location.reload();
            }
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

.botones {
    display: inline-flex;
}

#respuesta {
    margin-top: 1rem;
    margin-left: 23rem;
    width: 70rem;
}

#boton1 {
    margin-left: 1rem;
    margin-top: 2rem;

}

#boton2 {
    margin-left: 3rem;
    margin-top: 2rem;
}

#adivinar {
    margin-top: 1rem;
    margin-left: 55rem;
}

.imagenlogo {
    width: 15rem;
    height: 8rem;
    margin-left: 7rem;
}

.modal fade {
    text-align: center;
}

#boton3 {
    margin-top: 2rem;
    margin-left: 53rem;
}

#resultado {
    width: 9rem;
    margin-left: 30rem;
    margin-top: 2rem;
    text-align: center;
    font-weight: bold;
    border: 5px solid #2660cc;
}
</style>