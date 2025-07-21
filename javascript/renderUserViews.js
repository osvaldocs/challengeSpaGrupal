import { logoutUser } from "./loginLogout";

export function renderUserViews() {

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const userViews = document.getElementById("userViews");

  if (user) {
    userViews.innerHTML = `
      <div class="dropdown">
        <button class="dropdown-toggle header-button" id="dropdownToggle">${user.name} ⌄</button>
        <ul class="dropdown-menu" id="dropdownMenu">
          <li><a href="/perfil" data-link>Perfil</a></li>
        </ul>
        <button class="header-button" id="logout-btn">Cerrar sesión</button>
      </div>
    `;

    document.getElementById("logout-btn").addEventListener("click", logoutUser);

    // Abrir/cerrar el dropdown con click
    const toggleBtn = document.getElementById("dropdownToggle");
    const menu = document.getElementById("dropdownMenu");

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que se cierre inmediatamente
      menu.classList.toggle("show");
    });

    // Cerrar el dropdown si se hace clic fuera
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== toggleBtn) {
        menu.classList.remove("show");
      }
    });

  } else {
    userViews.innerHTML = `
      <a href="/login" data-link>Iniciar Sesión</a>
      <a href="/registro" data-link>Registrarse</a>
    `;
  }
}