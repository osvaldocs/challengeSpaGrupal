import { navigate } from './javascript/routes';
import { logoutUser } from './javascript/loginLogout';

window.addEventListener("load", () => {
  navigate(window.location.pathname);
});

document.body.addEventListener("click", (e) => {  
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches("#logout-btn")) logoutUser();
});

