const loginApiUrl = '';

document.getElementById('loginForm').addEventListener('submit', loginUsuario);

async function loginUsuario(event) {
    event.preventDefault();
}   

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

if(!username || !password){
    alert("Por favor completa todos los campos.");
    return;
}

try{
    const response = await fetch(loginApiUrl,{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username, password})
    });

    if(!response.ok){
        throw new Error("Credenciales invalidas");
    }

    const user = await response.json();
    localStorage
    .setItem('usuario',JSON.stringify(user));

    alert(`¡Bienvenido, ${user,username}!`);
    window.location.href="login.html";
}catch(error){
    console.error(error);
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = error.message;
}

