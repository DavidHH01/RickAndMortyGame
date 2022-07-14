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
        <button id="volver" class="btn btn-secondary" type="button" @click="goBack">Volver</button>

        <button id="boton1" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                class="fa fa-info-circle"></i> | Information</button>

        <button id="boton2" class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Preguntas</button>

        <button v-if="acabado" id="botonreset" type="button" class="btn btn-danger" @click="ResetGame">Reset</button>

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
        <div class="shadow-sm p-3 mb-5 bg-body rounded" id="resultado">Score: {{ this.auxiliarscore }}</div>
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

    <div class="shadow-none p-3 mb-5 bg-light rounded" id="total">Total: {{ this.total }}</div>

    <h3 v-if="this.acabado == 1">¡FELICIDADES HAS GANADO!<br>Tu puntuación: {{ this.auxiliarscore }}</h3>
    <h3 v-if="this.acabado == 2">¡LO SIENTO HAS PERDIDO!</h3>
    <br>
    <br>
    <br>

    <div v-if="this.acabado == 0">
        <div class="card" v-for="lista in arrayLista" :key="lista.identify">
            <img :src="lista.imagen" alt="Avatar" style="width:100%" class="img-fluid">
            <div class="container">
                <h1 class="idpersonaje" v-text="'ID:' + lista.id"></h1>
                <h4 class="nombredelpersonaje" v-text="lista.nombre"></h4>
                <div class="estadopersonaje">
                    <p v-if="lista.estado == 1">Estado: Vivo 🟢</p>
                    <p v-else-if="lista.estado == 2">Estado: Muerto 🔴</p>
                    <p v-else-if="lista.estado == 3">Estado: Desconocido ⚪</p>
                </div>

            </div>
        </div>
    </div>

    <div class="card2" v-for="personajeelegido in arrayEleccion" :key="personajeelegido.identify">
        <img :src="personajeelegido.imagen" alt="Avatar2" style="width:100%" class="img-fluid2">
        <div class="container2">
            <h1 class="idpersonaje2" v-text="'ID:' + personajeelegido.id"></h1>
            <h4 class="nombredelpersonaje2" v-text="personajeelegido.nombre"></h4>
            <div class="estadopersonaje2">
                <p v-if="personajeelegido.estado == 1">Estado: Vivo 🟢</p>
                <p v-else-if="personajeelegido.estado == 2">Estado: Muerto 🔴</p>
                <p v-else-if="personajeelegido.estado == 3">Estado: Desconocido ⚪</p>
            </div>

        </div>
    </div>








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
        nombreadivina: "",
        arrayEleccion: [],
        acabado: 0,
        auxiliarscore: 230,
        arrayLista: [],
        total: 0,
        page: 0,
        contadorpaginas: 0

    }),
    methods: {
        adivinarIntento() {
            this.contador = this.contador + 1;
            if (this.contador < 5 && this.acabado == 0) {
                if (this.nombreadivina.toUpperCase() === this.personaje.nombre.toUpperCase()) {
                    if (this.personaje.estado == "Alive") {
                        this.personaje.estado = 1;
                    }
                    else if (this.personaje.estado == "Dead") {
                        this.personaje.estado = 2;
                    }
                    else {
                        this.personaje.estado = 3;
                    }

                    this.arrayEleccion.push(this.personaje);
                    this.acabado = 1;
                }
                else {
                    this.score = this.score - 40;
                    this.auxiliarscore = this.auxiliarscore - 40;
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
        async ShowSelected() {
            if (this.contador != 5) {
                var value = document.getElementById("floatingSelect");
                var combo = document.getElementById("floatingSelect");
                var selected = combo.options[combo.selectedIndex].text;
                var number = value.options[value.selectedIndex].value;

                if (number == 1) {
                    if (this.personaje.nombre.includes("Rick")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };

                        this.arrayLista.splice(0, this.total);

                        let response1 = await axios.get("https://rickandmortyapi.com/api/character/?name=rick");
                        this.resultado1 = response1.data;
                        this.total = this.resultado1.info.count;
                        this.page = this.resultado1.info.pages;
                        console.log(this.page);

                        for (let i = 1; i <= this.page; i++) {
                            for (let j = 1; j < 20; j++) {
                                var character = { id: this.resultado1.results[j].id, nombre: this.resultado1.results[j].name, imagen: this.resultado1.results[j].image, estado: this.resultado1.results[j].status };
                                this.arrayLista.push(character);
                            }
                        }

                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                    this.auxiliarscore = this.auxiliarscore - 10;
                } else if (number == 2) {

                    if (this.personaje.nombre.includes("Morty")) {

                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };

                        this.arrayLista.splice(0, this.total);

                        let response1 = await axios.get("https://rickandmortyapi.com/api/character/?name=morty");
                        this.resultado1 = response1.data;
                        this.total = this.resultado1.info.count;
                        this.page = this.resultado1.info.pages;
                        console.log(this.page);

                        for (let i = 1; i <= this.page; i++) {
                            for (let j = 1; j < 20; j++) {
                                var character2 = { id: this.resultado1.results[j].id, nombre: this.resultado1.results[j].name, imagen: this.resultado1.results[j].image, estado: this.resultado1.results[j].status };
                                this.arrayLista.push(character2);
                            }
                        }

                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                    this.auxiliarscore = this.auxiliarscore - 10;
                } else if (number == 3) {
                    if (this.personaje.nombre.includes("Summer")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };

                        this.arrayLista.splice(0, this.total);

                        let response1 = await axios.get("https://rickandmortyapi.com/api/character/?name=summer");
                        this.resultado1 = response1.data;
                        this.total = this.resultado1.info.count;
                        this.page = this.resultado1.info.pages;
                        console.log(this.page);

                        for (let i = 1; i <= this.page; i++) {
                            for (let j = 1; j < 20; j++) {
                                var character3 = { id: this.resultado1.results[j].id, nombre: this.resultado1.results[j].name, imagen: this.resultado1.results[j].image, estado: this.resultado1.results[j].status };
                                this.arrayLista.push(character3);
                            }
                        }

                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                    this.auxiliarscore = this.auxiliarscore - 10;
                } else if (number == 4) {
                    if (this.personaje.nombre.includes("Jerry")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };


                        this.arrayLista.splice(0, this.total);

                        let response1 = await axios.get("https://rickandmortyapi.com/api/character/?name=jerry");
                        this.resultado1 = response1.data;
                        this.total = this.resultado1.info.count;
                        this.page = this.resultado1.info.pages;
                        console.log(this.page);

                        for (let i = 1; i <= this.page; i++) {
                            for (let j = 1; j < 20; j++) {
                                var character4 = { id: this.resultado1.results[j].id, nombre: this.resultado1.results[j].name, imagen: this.resultado1.results[j].image, estado: this.resultado1.results[j].status };
                                this.arrayLista.push(character4);
                            }
                        }

                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                    this.auxiliarscore = this.auxiliarscore - 10;
                } else if (number == 5) {
                    if (this.personaje.nombre.includes("Beth")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };

                        this.arrayLista.splice(0, this.total);

                        let response1 = await axios.get("https://rickandmortyapi.com/api/character/?name=beth");
                        this.resultado1 = response1.data;
                        this.total = this.resultado1.info.count;
                        this.page = this.resultado1.info.pages;
                        console.log(this.page);

                        for (let i = 1; i <= this.page; i++) {
                            for (let j = 1; j < 20; j++) {
                                var character5 = { id: this.resultado1.results[j].id, nombre: this.resultado1.results[j].name, imagen: this.resultado1.results[j].image, estado: this.resultado1.results[j].status };
                                this.arrayLista.push(character5);
                            }
                        }
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                    this.auxiliarscore = this.auxiliarscore - 10;
                } else if (number == 6) {
                    if (!this.personaje.nombre.includes("Rick") && !this.personaje.nombre.includes("Morty") && !this.personaje.nombre.includes("Summer") && !this.personaje.nombre.includes("Jerry") && !this.personaje.nombre.includes("Beth")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                    this.auxiliarscore = this.auxiliarscore - 10;
                } else if (number == 7) {
                    if (this.personaje.estado.includes("Vivo")) {
                        this.respuesta = "Sí";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    } else {
                        this.respuesta = "No";
                        this.seleccion = { pregunta: selected, respuestas: this.respuesta };
                    }
                    this.score = this.score - 10;
                    this.auxiliarscore = this.auxiliarscore - 10;
                } else {
                    this.respuesta = "Por favor seleccione una pregunta";
                }
                this.arrayPreguntas.push(this.seleccion);
            } else {
                this.score = 0;
            }
        },
        goBack() {
            if (this.score == 230) {
                this.$router.push({ path: '/' });
            }
            else {
                alert('Debes terminar la partida para regresar');
            }
        },
        ResetGame() {
            window.location.reload();
        }
    },
    mounted: async function () {
        var num = Math.floor(Math.random() * 826 + 1);
        console.log(num);
        let response = await axios.get("https://rickandmortyapi.com/api/character/" + num);
        this.result = response.data;
        this.personaje = { id: this.result.id, nombre: this.result.name, imagen: this.result.image, estado: this.result.status };
        console.log(this.result.name);

        let response1 = await axios.get("https://rickandmortyapi.com/api/character/");
        this.resultado1 = response1.data;
        this.total = this.resultado1.info.count;

        for (let i = 1; i < this.total; i++) {
            let response2 = await axios.get("https://rickandmortyapi.com/api/character/" + i);
            this.resultado2 = response2.data;

            var character = { id: this.resultado2.id, nombre: this.resultado2.name, imagen: this.resultado2.image, estado: this.resultado2.status };
            this.arrayLista.push(character);
        }
    },
    watch: {
        score() {
            if (this.score <= 0) {
                if (this.personaje.estado == "Alive") {
                    this.personaje.estado = 1;
                }
                else if (this.personaje.estado == "Dead") {
                    this.personaje.estado = 2;
                }
                else {
                    this.personaje.estado = 3;
                }
                if (this.acabado == 0) {
                    this.acabado = 2;
                    this.arrayEleccion.push(this.personaje);
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.form-floating {
    margin-top: 4rem;
    margin-left: 23rem;
    width: 70rem;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 20%;
    border-radius: 5px;
    display: inline-block;
    margin: 20px;
    margin-left: 3rem;
}

.card2 {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 20%;
    border-radius: 5px;
    display: inline-block;
    margin: 20px;
    margin-left: 49rem;
}

.card2:hover {
    box-shadow: 0 8px 24px 0 rgba(152, 206, 76, 0.678);
}

.card:hover {
    box-shadow: 0 8px 24px 0 rgba(152, 206, 76, 0.678);
}

img {
    border-radius: 5px 5px 0 0;
}

.container2 {
    padding: 2px 16px;
    font-family: 'Hanalei Fill', cursive;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
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

.nombredelpersonaje2 {
    grid-column: 2;
    grid-row: 1;
}

.idpersonaje {
    grid-column: 1;
    grid-row: span 2;
    justify-self: center;
    place-self: center;
}

.idpersonaje2 {
    grid-column: 1;
    grid-row: span 2;
    justify-self: center;
    place-self: center;
}

.estadopersonaje {
    grid-column: 2;
    grid-row: 2;
}

.estadopersonaje2 {
    grid-column: 2;
    grid-row: 2;
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
    margin-left: 3rem;
    margin-top: 2rem;

}

#boton2 {
    margin-left: 3rem;
    margin-top: 2rem;
}

#botonreset {
    margin-left: 3rem;
    margin-top: 2rem;
    padding: 10px;
}

#adivinar {
    margin-top: 1rem;
    margin-left: 47rem;
}

#volver {
    margin-left: 1rem;
    margin-top: 2rem;
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

#total {
    margin-left: 23rem;
    width: 10rem;
    font-weight: bold;

}

@import url('https://fonts.googleapis.com/css?family=Sarpanch:900');

h3 {
    grid-area: text;
    font-family: 'Sarpanch', sans-serif;
    font-size: 10vmin;
    margin: 0;
    margin-left: 20rem;
    padding: 30px;
    color: #06aecc;
    text-shadow: 0.5vmin 0.5vmin 0 #98ce4cad, -0.5vmin -0.5vmin 0 #95ff00f3;
}
</style>