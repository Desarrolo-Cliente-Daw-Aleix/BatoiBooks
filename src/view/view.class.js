export default class View {
    constructor() {
        this.booksList = document.getElementById('list');
        this.form = document.getElementById('form');
        this.about = document.getElementById('about');
        this.messages = document.getElementById('messages');
        this.remove = document.getElementById('remove');
        this.bookForm = document.getElementById('bookForm');
    }

    renderModulesSelect(modules) {
        const selectUI = document.getElementById("id-module");
        modules.forEach((module) => {
            const option = document.createElement("option");
            option.value = module.code;
            option.textContent = module.cliteral;
            selectUI.appendChild(option);
        });
    }

    renderBook(book) {
        const bookUI = document.createElement('div');
        bookUI.className = 'card';
        bookUI.innerHTML = ` 
          <img src="${book.photo}" alt="Libro: ${book.id}">
          <div>
              <h3>${book.moduleCode} (${book.id})</h3>
              <h4>${book.publisher}</h4>
              <p>${book.pages} páginas</p>
              <p>Estado: ${book.status}</p>
              <p>En venta ${book.soldDate}</p>
              <p>${book.comments}</p>
              <h4>${book.price?.toFixed(2)} €</h4>
              <div class="book-actions">
                <button class="add-cart" data-id="${book.id}">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <button class="edit-book" data-id="${book.id}">
                    <span class="material-icons">edit</span>
                </button>
                <button class="delete-book" data-id="${book.id}">
                    <span class="material-icons">delete</span>
                </button>
              </div>
          </div>
        `;
        bookUI.querySelector(".add-cart").addEventListener("click", () => this.onAddToCart(book.id));
        bookUI.querySelector(".edit-book").addEventListener("click", () => this.onEditBook(book.id));
        bookUI.querySelector(".delete-book").addEventListener("click", () => this.onDeleteBook(book.id));

        this.booksList.appendChild(bookUI);
    }


    removeBookFromView(bookId) {
        const cards = this.booksList.querySelectorAll('.card');
        cards.forEach(card => {
            if (card.querySelector('img').alt.includes(`Libro: ${bookId}`)) {
                card.remove();
            }
        });
    }

    renderMessage(type, message) {
        const messageUI = document.createElement('div');
        messageUI.className = type + ' alertmalert-danger alert-dismissible';
        messageUI.innerHTML = `
          ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
      `;
        this.messages.appendChild(messageUI);
    }

    setBookSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const moduleCode = document.getElementById('id-module').value;
            const publisher = document.getElementById('publisher').value;
            const price = document.getElementById('price').value;
            const pages = document.getElementById('pages').value;
            const status = document.querySelector('input[name="status"]:checked')?.value;

            /*fieldIds.forEach((fieldId) => {
                const field = document.getElementById("id-module");
                const spanError = field.closest("div").querySelector("span.error");
                spanError.textContent = field.validationMessage;*/
            


            let isValid = true;
            let errorMessage = "";
     
            if (!moduleCode) {
                isValid = false;
                errorMessage += "El módulo es obligatorio.\n";
            }
     
            if (!publisher) {
                isValid = false;
                errorMessage += "El editor es obligatorio.\n";
            }
     
            const priceValue = parseFloat(price);
            if (isNaN(priceValue) || priceValue < 0) {
                isValid = false;
                errorMessage += "El precio debe ser un número mayor o igual a 0 y puede incluir céntimos.\n";
            }
     
            const pagesValue = parseInt(pages, 10);
            if (isNaN(pagesValue) || pagesValue < 0) {
                isValid = false;
                errorMessage += "Las páginas deben ser un número entero mayor o igual a 0.\n";
            }
     
            if (!status) {
                isValid = false;
                errorMessage += "El estado es obligatorio.\n";
            }
     
            if (!isValid) {
                this.renderMessage("error", errorMessage.trim());
                return;
            }

            callback({
                moduleCode,
                publisher,
                price: priceValue,
                pages: pagesValue,
                status
            });
        });
    }



    setBookRemoveHandler(callback) {
        this.remove.addEventListener('click', () => {
            const idToRemove = document.getElementById("id-remove").value;
            callback(idToRemove)
        })
    }

    setAddToCartHandler(callback) {
        this.onAddToCart = callback;
    }

    setEditBookHandler(callback) {
        this.onEditBook = callback;
    }

    setDeleteBookHandler(callback) {
        this.onDeleteBook = callback;
    }

    populateFormForEdit(book) {
        document.getElementById("id-module").value = book.moduleCode;
        document.getElementById("publisher").value = book.publisher;
        document.getElementById("price").value = book.price;
        document.getElementById("pages").value = book.pages;
        document.querySelector(`input[name="status"][value="${book.status}"]`).checked = true;
        document.getElementById("comments").value = book.comments;
        document.querySelector("#bookFormTitle").textContent = "Editar libro";
        document.querySelector("#submitButton").textContent = "Cambiar";
        document.getElementById("id-hidden").style.display = "block";
    }

}
