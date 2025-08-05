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

// Envía todos los jugadores al backend y luego redirige a la partida
function iniciar() {
  const jugadores = [];

  for (let i = 0; i < contadorJugadores; i++) {
    const input = document.getElementById("jugador" + i);
    if (!input) continue;

    const nombre = input.value.trim();
    if (nombre !== "") {
      jugadores.push({
        userName: nombre,
        profilePicture: "",
        score: 0,
        isCreator: false
      });
    }
  }

  if (jugadores.length === 0) {
    alert("Debe ingresar al menos un nombre.");
    return;
  }

  let errores = 0;
  let respuestas = 0;

  jugadores.forEach((jugador) => {
    fetch("https://localhost:7241/api/Player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jugador)
    })
      .then(response => {
        if (!response.ok) {
          errores++;
          throw new Error("Error al guardar el jugador.");
        }
        return response.json();
      })
      .then(data => {
        console.log("Jugador guardado:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      })
      .finally(() => {
        respuestas++;
        if (respuestas === jugadores.length) {
          if (errores === 0) {
            window.location.href = "partida.html";
          } else {
            alert("Ocurrió un error al registrar algunos jugadores.");
          }
        }
      });
  });
}
