let contadorJugadores = 1;

// Agrega un nuevo campo de entrada para otro jugador
function agregarCampo() {
  const formulario = document.getElementById("formulario");

  const nuevoInput = document.createElement("input");
  nuevoInput.type = "text";
  nuevoInput.placeholder = "Ingrese su nombre";
  nuevoInput.id = "jugador" + contadorJugadores;

  formulario.appendChild(nuevoInput);
  contadorJugadores++;
}

// Envía los nombres al localStorage y redirige a la partida
function iniciar() {
  const jugadores = [];

  for (let i = 0; i < contadorJugadores; i++) {
    const input = document.getElementById("jugador" + i);
    if (!input) continue;

    const nombre = input.value.trim();
    if (nombre !== "") {
      jugadores.push({
        userName: nombre
      });
    }
  }

  if (jugadores.length === 0) {
    alert("Debe ingresar al menos un nombre.");
    return;
  }

  // Guardar en localStorage
  localStorage.setItem("jugadores", JSON.stringify(jugadores));

  // Redirigir a la partida
  window.location.href = "partida.html";
}
