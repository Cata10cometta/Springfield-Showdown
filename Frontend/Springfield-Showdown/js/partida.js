document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombreUsuario");
  const avatar = localStorage.getItem("avatarUsuario");

  if (!nombre || !avatar) {
    alert("Faltan datos del jugador.");
    window.location.href = "integrantes.html";
    return;
  }

  document.getElementById("nombreUsuario").textContent = nombre;
  document.getElementById("avatar").src = avatar;

  iniciarTemporizador(10); // segundos para lanzar carta
});

function iniciarTemporizador(duracion) {
  let tiempo = duracion;
  const display = document.getElementById("temporizador");

  const intervalo = setInterval(() => {
    display.textContent = tiempo;
    tiempo--;

    if (tiempo < 0) {
      clearInterval(intervalo);
      display.textContent = "¡Tiempo!";
      // Aquí podrías desactivar cartas o pasar turno
    }
  }, 1000);
}
