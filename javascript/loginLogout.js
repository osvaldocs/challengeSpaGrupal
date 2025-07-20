import { navigate } from "./routes";
import { get } from "./services";
const urlBooks = "http://localhost:3000/phisicalBook";
const urlEbooks = "http://localhost:3000/digitalBooks";
const urlUsers = "http://localhost:3000/users";


export  async function setupLogin() {
    const form = document.getElementById("login-form");
    const msg = document.getElementById("login-msg");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const users = await get(urlUsers);

        const found = users.find(
            (user) => user.email === email && user.password === password
        );

        if (found) {
            localStorage.setItem("loggedUser", JSON.stringify(found)); // 🧠 Guardar sesión
            navigate("/catalogo");
        } else {
            msg.textContent = "Correo o contraseña incorrectos";
        }
    });
}



//✅ Cerrar sesión (logout)

export function logoutUser() {
  const confirmed = confirm("¿Estás seguro de que querés cerrar sesión?");
  if (!confirmed) return;
  localStorage.removeItem("loggedUser");
  alert("Sesión cerrada.");
  navigate("/login");
}