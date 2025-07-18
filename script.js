import {get, post, update, deletes} from './javascript/services';
import { routes, navigate } from './javascript/routes';

export function setupDataLink(navigateFn) {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href) navigateFn(href);
    }
  });
}