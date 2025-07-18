//✅ Código del Login + LocalStorage

async function setupLogin() {
    const form = document.getElementById("login-form");
    const msg = document.getElementById("login-msg");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const users = await get("http://localhost:3000/users");

        const found = users.find(
            (user) => user.email === email && user.password === password
        );

        if (found) {
            localStorage.setItem("loggedUser", JSON.stringify(found)); // 🧠 Guardar sesión
            navigate("/users");
        } else {
            msg.textContent = "Correo o contraseña incorrectos";
        }
    });
}

//✅ Validación de sesión en la navegación

async function navigate(pathname) {
    const user = JSON.parse(localStorage.getItem("loggedUser")); // 🔍 Verificar sesión
    const route = routes[pathname];
    const html = await fetch(route).then((res) => res.text());
    history.pushState({}, "", pathname);

    // 🔐 Redirección si ya está logueado e intenta ir al login
    if (pathname === "/" && user) {
        return navigate("/users");
    }

    // 🔐 Bloquear acceso a rutas protegidas si no está logueado
    if (!user && pathname !== "/" && pathname !== "/register") {
        alert("Ups", "Primero iniciá sesión", "warning");
        return navigate("/");
    }

    // 🔐 Acceso restringido a admin
    if (pathname === "/newuser" && user?.role !== "admin") {
        alert("Acceso denegado", "No tienes permisos para entrar aquí", "error");
        return navigate("/users");
    }

    // 👉 Mostrar login
    if (pathname === "/") {
        document.getElementById("app").style.display = "none";
        document.getElementById("login-content").innerHTML = html;
        setupLogin();
        return;
    }

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
