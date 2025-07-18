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

        const users = await get(url);

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

document.addEventListener("click", (e) => {
    if (e.target.id === "logout-btn") {
        Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Tu sesión actual se cerrará",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("loggedUser");  // 🧹 Cerrar sesión
                navigate("/");
            }
        });
    }
});
