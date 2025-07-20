export function renderUserViews() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const userViews = document.getElementById("userViews");

    if(user) {
        userViews.innerHTML = `
        <span>${user.name}</span>
        <button id="logout-btn">Cerrar sesión</button>
        `;
    } else {
        userViews.innerHTML = `
        <a href="/login" data-link>Iniciar Sesión</a>
        <a href="/registro" data-link>Registrarse</a>
        `;
    }
}