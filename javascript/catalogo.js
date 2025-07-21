import {get} from './services';


export async function renderBookCatalog() {
    const url = "http://localhost:3000/phisicalBook"
    try {
        const books = await get(url);

        const catalogContainer = document.getElementById("book-catalog");
        catalogContainer.innerHTML = "";

        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <img src="./public/portadaLibros/cienAñosDeSoledad.png" alt="portada de Cien Años de Soledad">
                <p><strong>Autor:</strong> ${book.author}</p>
                <p><strong>Género:</strong> ${book.genre}</p>
                <p><strong>Año:</strong> ${book.year}</p>
                `;
        catalogContainer.appendChild(bookCard);            
        });
    } catch (error) {
        console.error("Error al cargar los libros", error);
        const catalogContainer = document.getElementById("book-catalog");
        catalogContainer.innerHTML = "<p>No se pudo cargar el catálogo de libros.</p>";
    }
}