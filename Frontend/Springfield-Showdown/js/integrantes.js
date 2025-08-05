async function iniciar() {
  const cantidad = parseInt(document.getElementById("cantidad").innerText);
  const roomId = parseInt(localStorage.getItem("roomId")); // ya guardado al crear sala

  if (!roomId || cantidad < 2) {
    alert("Selecciona una sala válida y mínimo 2 jugadores");
    return;
  }

  // Guardar cantidad para saber cuántos nombres pedir después
  localStorage.setItem("cantidadJugadores", cantidad);

  for (let i = 0; i < cantidad; i++) {
    const jugador = {
      roomId: roomId
    };

    try {
      const response = await fetch("https://localhost:7241/api/Player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jugador)
      });

      if (!response.ok) {
        console.error(`Error al crear jugador ${i + 1}`);
      }

    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  }

  // Redirigir a la siguiente pantalla
  window.location.href = 'integrantes.html';
}
