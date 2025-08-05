const userApiUrl = '';
const playerApiUrl = '';


document.getElementById('userForm').addEventListener('submit', crearPersonaYUsuario);

async function crearPersonaYUsuario(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    if(!email || !password){
        alert("Por favor completa todos los campos requeridos.");
        return;
    }

    const usuarioData ={
        email: email,
        password : password,
        active : true
    };

    try {
    // Paso 1: Crear Usuario
    const usuarioResponse = await fetch(userApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioData)
    });

    if (!usuarioResponse.ok) {
      throw new Error('Error al crear el usuario.');
    }

    const usuarioCreada = await usuarioResponse.json();
    const userId = usuarioCreada.id;

     // Paso 2: Crear player
    const playerData = {
      username : username,
      email: email,
      password: password,
      active: true
    };
   
     const playerResponse = await fetch(playerApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerData)
    });

    if (!playerResponse.ok) {
      throw new Error('Error al crear el jugador.');
    }

    const jugadorCreado = await playerResponse.json();
    const playerId = jugadorCreadoCreado.id;

    alert("¡Registro exitoso!");
    document.getElementById('playerForm').reset();
    window.location.href = "registro.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
    
}