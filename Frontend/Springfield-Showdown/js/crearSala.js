let cantidad = 2;

function cambiarCantidad(valor) {
  cantidad += valor;
  if (cantidad < 2) cantidad = 2;
  if (cantidad > 7) cantidad = 7;
  document.getElementById('cantidad').innerText = cantidad;
}

async function iniciar() {
  const data = {
  participantsNumber: cantidad,
  timePlayed: new Date().toISOString(),  // <-- formato correcto ISO 8601
  isActive: true,
  result: ""
};

  try {
    const response = await fetch('https://localhost:7241/api/Room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const savedRoom = await response.json();
      console.log('Sala creada:', savedRoom);

      // Guarda el ID de la sala en localStorage para usarlo en la siguiente página
      localStorage.setItem('roomId', savedRoom.id);
      localStorage.setItem('cantidadJugadores', cantidad);

      window.location.href = 'integrantes.html';
    } else {
      console.error('Error al crear sala:', response.status);
      alert('No se pudo crear la sala');
    }
  } catch (error) {
    console.error('Error al conectar con la API:', error);
    alert('Error de conexión');
  }
}
