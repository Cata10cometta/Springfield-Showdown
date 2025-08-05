// juego.js


var atributos = ["humor", "fuerza", "popularidad", "inteligencia", "carisma", "caos"];
var cantidadJugadores = parseInt(localStorage.getItem('cantidadJugadores'));
let jugadores = [];
let nombre = ["Cata", "Maria", "Luisa", "Sergio"]
let jugadorActual = 0;
let ronda = 1;
let cartaSeleccionada = null;
let atributoSeleccionado = null;
let ganadores = Array(cantidadJugadores).fill(0);

// Generar cartas únicas
function generarCartas() {
  let usadas = new Set();
  let cartas = [];

  while (cartas.length < 8) {
    let carta = {};
    for (let attr of atributos) {
      carta[attr] = Math.floor(Math.random() * 100) + 1;
    }
    var clave = Object.values(carta).join("-");
    if (!usadas.has(clave)) {
      usadas.add(clave);
      cartas.push(carta);
    }
  }

  return cartas;
}

function inicializarJugadores() {
  for (let i = 0; i < cantidadJugadores; i++) {
    jugadores.push({
      nombre: `${nombre[i]}`,
      cartas: generarCartas(),
      puntos: 0
    });
  }
}

function mostrarCartas(jugadorIndex) {
  var contenedor = document.getElementById("cartasJugador");
  contenedor.innerHTML = "";
  var cartas = jugadores[jugadorIndex].cartas;

  cartas.forEach((carta, index) => {
    var div = document.createElement("div");
    div.classList.add("carta");
    div.innerHTML = `
      <strong>Carta ${index + 1}</strong><br>

      ${atributos.map(attr => `${attr}: ${carta[attr]}`).join("<br>")}
    `;
    div.onclick = () => seleccionarCarta(index);
    contenedor.appendChild(div);
  });

  document.getElementById("jugadorActual").innerText = `${jugadores[jugadorIndex].nombre}: elige una carta`;
  document.getElementById("atributos").style.display = jugadorIndex === 0 ? "block" : "none";
}

function seleccionarCarta(index) {
  cartaSeleccionada = index;
  document.querySelectorAll('.carta').forEach(c => c.classList.remove('seleccionada'));
  document.querySelectorAll('.carta')[index].classList.add('seleccionada');
}

function seleccionarAtributo(attr) {
  atributoSeleccionado = attr;

  // Guardar carta del jugador 1
  var carta1 = jugadores[0].cartas.splice(cartaSeleccionada, 1)[0];

  // Mostrar jugador 2 para que elija
  jugadorActual = 1;
  mostrarCartas(jugadorActual);

  // Cambiar click de cartas para el jugador 2
  document.getElementById("atributos").style.display = "none";
  document.querySelectorAll('.carta').forEach((c, i) => {
    c.onclick = () => {
      var carta2 = jugadores[1].cartas.splice(i, 1)[0];

      // Comparar
      var valor1 = carta1[atributoSeleccionado];
      var valor2 = carta2[atributoSeleccionado];

      let ganadorRonda = -1;
      if (valor1 > valor2) {
        ganadores[0]++;
        ganadorRonda = 0;
      } else if (valor2 > valor1) {
        ganadores[1]++;
        ganadorRonda = 1;
      }

      alert(`Jugador 1 (${valor1}) vs Jugador 2 (${valor2})\nGanó ${ganadorRonda >= 0 ? jugadores[ganadorRonda].nombre : "Empate"}`);

      // Siguiente ronda
      ronda++;
      cartaSeleccionada = null;
      atributoSeleccionado = null;

      if (ronda > 8) {
        terminarJuego();
      } else {
        jugadorActual = 0;
        mostrarCartas(jugadorActual);
      }
    };
  });
}

function terminarJuego() {
  let resumen = ganadores.map((p, i) => `${jugadores[i].nombre}: ${p} puntos`).join("\n");
  var maxPuntos = Math.max(...ganadores);
  var ganadoresFinales = jugadores.filter((_, i) => ganadores[i] === maxPuntos);

  resumen += `\n\nGanador: ${ganadoresFinales.map(j => j.nombre).join(", ")}`;
  alert(resumen);
  location.reload();
}

// Inicialización
inicializarJugadores();
mostrarCartas(jugadorActual);
