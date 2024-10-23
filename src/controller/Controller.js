import Books from './model/Books.class.js';
import View from './view/View.js';

export default class Controller {
    constructor() {
        this.books = new Books();
        this.view = new View();
    }

    async init() {
        try {
            await this.books.populate();
            this.books.data.forEach(book => this.view.renderBook(book));
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
            this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
        } catch (error) {
            this.view.showMessage('error', 'Error al inicializar la aplicación');
        }
    }

    async handleSubmitBook(newBookData) {
        try {
            const newBook = await this.books.addBook(newBookData);
            this.view.renderBook(newBook);
            this.view.showMessage('info', 'Libro añadido con éxito');
        } catch (error) {
            this.view.showMessage('error', 'Error al añadir el libro');
        }
    }

    async handleRemoveBook(bookId) {
        try {
            await this.books.removeBook(bookId);
            this.view.removeBookFromView(bookId);
            this.view.showMessage('info', 'Libro eliminado con éxito');
        } catch (error) {
            this.view.showMessage('error', 'Error al eliminar el libro');
        }
    }
}
