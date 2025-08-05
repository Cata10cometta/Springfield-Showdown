const jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    const contenedor = document.getElementById('jugadores');

    jugadores.forEach((nombre, index) => {
      const div = document.createElement('div');
      div.className = 'jugador';
      div.innerText = `Jugador ${index + 1}: ${nombre}`;
      contenedor.appendChild(div);
    });