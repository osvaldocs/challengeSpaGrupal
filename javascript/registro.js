import {get, post} from './services';
import { navigate } from './routes';

export async function setupRegister() {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const password = form.elements["password"].value.trim();
    const phone = form.elements["phone"].value.trim();

    if (!name || !email || !password || !phone) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const existingUsers = await get("http://localhost:3000/users");

    const alreadyExists = existingUsers.some(user => user.email === email);

    if (alreadyExists) {
      alert("Este correo ya está registrado");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      phone,
      role: "user", // Por defecto, se registra como usuario normal
    };

    const response = await post("http://localhost:3000/users", newUser);

    if (response) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login"); // Redirige al login
    } else {
      alert("Error al registrar. Inténtalo de nuevo.");
    }
  });
}
