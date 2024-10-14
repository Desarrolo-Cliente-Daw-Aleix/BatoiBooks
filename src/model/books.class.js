import Book from './book.class';
import { getDBBooks, addDBBook, removeDBBook, changeDBBook } from '../services/api.js';

export default class Books {
    constructor() {
        this.data = [];
    }

    async populate() {
        const booksArray = await getDBBooks();
        this.data = booksArray.map(bookData => new Book(bookData));
    }

    async addBook(bookData) {
        const newBook = await addDBBook(bookData);
        this.data.push(new Book(newBook));
        return newBook;
    }

    async removeBook(bookId) {
        await removeDBBook(bookId);
        const index = this.data.findIndex(book => book.id === bookId);
        if (index === -1) throw new Error('No existe');
        this.data.splice(index, 1);
    }

    async changeBook(bookData) {
        const updatedBook = await changeDBBook(bookData);
        const index = this.data.findIndex(book => book.id === updatedBook.id);
        if (index === -1) throw new Error('No existe');
        this.data[index] = new Book(updatedBook);
    }

    getBookById(bookId) {
        const book = this.data.find(book => book.id === bookId);
        if (!book) throw new Error("No existe");
        return book;
    }

    getBookIndexById(bookId) {
        const bookIndex = this.data.findIndex(book => book.id === bookId);
        if (bookIndex === -1) throw new Error("No existe");
        return bookIndex;
    }

    bookExists(userId, moduleCode) {
        const book = this.data.find(book => book.moduleCode === moduleCode);
        return book ? book.userId === userId : false;
    }

    booksFromUser(userId) {
        return this.data.filter(book => book.userId === userId);
    }

    booksFromModule(moduleCode) {
        return this.data.filter(book => book.moduleCode === moduleCode);
    }

    booksCheeperThan(price) {
        return this.data.filter(book => book.price < price);
    }

    booksWithStatus(status) {
        return this.data.filter(book => book.status === status);
    }

    averagePriceOfBooks() {
        if (this.data.length === 0) return "0.00 €";
        const total = this.data.reduce((sum, book) => sum + book.price, 0);
        return (total / this.data.length).toFixed(2) + " €";
    }

    booksOfTypeNotes() {
        return this.data.filter(book => book.publisher === "Apunts");
    }

    booksNotSold() {
        return this.data.filter(book => book.soldDate === "");
    }

    incrementPriceOfBooks(percentage) {
        return this.data.map(book => ({
            ...book,
            price: parseFloat((book.price + book.price * percentage).toFixed(2))
        }));
    }



    toString() {
        return this.data.map(book => book.toString()).join('\n');
    }
}
