import {get, post, update, deletes} from './javascript/services';
import { routes, navigate } from './javascript/routes';
import { setupLogin } from './javascript/loginLogout';

document.body.addEventListener("click", (e) => {  
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }
});


window.addEventListener("load", () => {
  navigate(window.location.pathname);
});
