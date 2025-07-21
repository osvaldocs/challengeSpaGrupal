import { setupLogin } from "./loginLogout";
import { setupRegister } from "./registro";
import { renderUserViews } from "./renderUserViews";
import { renderBookCatalog } from "./catalogo";
export const routes = {
    "/": "./javascript/views/inicio.html",
    "/catalogo": "./javascript/views/catalogo.html",
    "/funciona": "./javascript/views/como-funciona.html",
    "/cargar":  "./javascript/views/cargarLibros.html",
    "/login": "./javascript/views/login.html",
    "/editar": "./javascript/views/editarLibro.html",
    "/registro": "./javascript/views/registro.html",
    "/render": "./javascript/views/renderUserViews"

}

export async function navigate(pathnameWithQuery) {
  const urlObj = new URL(pathnameWithQuery, window.location.origin);
  const pathname = urlObj.pathname;
  const route = routes[pathname];
  const user = JSON.parse(localStorage.getItem("loggedUser")); // Recupero el usuario logueado

  if (!route) {
    console.error("Ruta no encontrada:", pathname);
    return;
  }

  const html = await fetch(route).then((res) => res.text());
  document.getElementById("dinamic-content").innerHTML = html;
  history.pushState({}, "", pathnameWithQuery);
  

  // Protejo la vista /users para que solo sea accesible si hay un usuario logueado
  if (pathname === "/cargar") {
    if (!user) {
      alert("Debes iniciar sesión para ver esta página.");
      return navigate("/login");
    }
    setTimeout(renderEvents, 0);

  // Solo el rol admin puede acceder al formulario para crear nuevos libros
  } else if (pathname === "/create") {
    if (!user || user.role !== "admin") {
      alert("Acceso denegado. Solo administradores.");
      return navigate("/home");
    }
    setTimeout(setupForm, 0);

  // Solo admin puede editar libros
  } else if (pathname === "/editar") {
    if (!user || user.role !== "admin") {
      alert("Acceso denegado. Solo administradores.");
      return navigate("/home");
    }
    const id = urlObj.searchParams.get("id");
    setTimeout(() => editEvent(id), 0);

  } else if (pathname === "/login") {
    setTimeout(setupLogin, 0);
  } else if (pathname === "/registro") {
    setTimeout(setupRegister, 0);
  } else if (pathname === "/catalogo") {
    setTimeout(renderBookCatalog, 0);
  }
  renderUserViews();
}
