import Modules from '../model/modules.class.js';
import Users from '../model/users.class.js';
import Books from '../model/books.class.js';
import View from '../view/view.class.js';
import Cart from '../model/cart.class.js';;

export default class Controller {
    constructor() {
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books(),
            cart: new Cart()
        }
        this.view = new View();
    }

    async init() {
        await Promise.all([
            this.model.modules.populate(),
            this.model.users.populate(),
            this.model.books.populate(),
            this.model.cart.populate()
        ]);


        this.view.renderModulesSelect(this.model.modules.data);
        this.model.books.data.forEach(book => this.view.renderBook(book));
        this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
        this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
        this.view.setAddToCartHandler(this.handleAddToCart.bind(this));
        this.view.setEditBookHandler(this.handleEditBook.bind(this));
        this.view.setDeleteBookHandler(this.handleDeleteBook.bind(this));
    }

    handleSubmitBook(payload) {
        const bookInDB = this.model.books.addBook(payload)
        this.view.renderBook(bookInDB)
    }

    handleRemoveBook(id) {
        this.model.books.removeBook(id)
        this.view.renderRemoveBook(id)
    }

    handleAddToCart(bookId) {
        const book = this.model.books.getBookById(bookId);
        try {
            this.model.cart.addItem(book);
            this.view.renderMessage("success", `Libro ${bookId} añadido al carrito.`);
        } catch (error) {
            this.view.renderMessage("error", error.message);
        }
    }

    handleEditBook(bookId) {
        const book = this.model.books.getBookById(bookId);
        this.view.populateFormForEdit(book);
    }

    handleDeleteBook(bookId) {
        if (confirm(`¿Seguro que deseas eliminar el libro ${bookId}?`)) {
            this.handleRemoveBook(bookId);
        }
    }
}