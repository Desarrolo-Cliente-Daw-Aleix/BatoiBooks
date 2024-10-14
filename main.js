import Modules from './modules.class';
import Users from './users.class';
import Books from './books.class';

(async () => {
    const modules = new Modules();
    const users = new Users();
    const books = new Books();

    await modules.populate();
    await users.populate();
    await books.populate();

    const booksFromModule5021 = books.booksFromModule(5021);
    console.log("Libros del módulo 5021:", booksFromModule5021);

    const newBooks = books.booksWithStatus('new');
    console.log("Libros en estado 'new':", newBooks);

    const booksWithIncreasedPrice = books.data.map(book => ({
        ...book,
        price: parseFloat((book.price * 1.1).toFixed(2))
    }));
    console.log("Libros con precio incrementado en 10%:", booksWithIncreasedPrice);
})();
