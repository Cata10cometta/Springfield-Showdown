window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".oscurecer").classList.add("activo");
    document.querySelector(".imagen").classList.add("centrado");
  }, 2000); // Espera 2 segundos

  
  setTimeout(() => {
    window.location.href = "bienvenido.html"; 
  }, 5000); 
});
