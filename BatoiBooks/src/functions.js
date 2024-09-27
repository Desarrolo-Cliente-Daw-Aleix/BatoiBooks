
function getBookById(books, bookId) {
    const book = books.find(book => book.id === bookId);
    if (!book) {
        throw new Error("No existe")
    } else {
        return book
    }
}

function getBookIndexById(books, bookId) {
    const book = books.findIndex(book => book.id === bookId);
    if (book === -1) {
        throw new Error("No existe");
    } else {
        return book;
    }
}

function bookExists(books, userId, moduleCode) {
    const book = books.find(book => book.moduleCode === moduleCode);
    if (book) {
        return book.userId === userId;
    } else {
        return false;
    }
}

function booksFromUser(books, userId) {
    const bookArray = books.filter(function (book) {
        return book.userId === userId;
    });
    return bookArray;
}

function booksFromModule(books, moduleCode) {
    const bookArray = books.filter(function (book) {
        return book.moduleCode === moduleCode;
    });
    return bookArray;
}

function booksCheeperThan(books, price) {
    const bookCheeper = books.filter(function (book) {
        return book.price < price
    })
    return bookCheeper;
}

function booksWithStatus(books, status) {
    const bookStatus = books.filter(function (book) {
        return book.status === status
    })
    return bookStatus;
}

function averagePriceOfBooks(books) {
    if (books.length === 0) {
        return "0.00 €";
    }
    const bookSuma = books.reduce((total, book) => total += book.price, 0);
    const media = bookSuma / books.length;
    return media.toFixed(2) + " €";
}

function booksOfTypeNotes(books) {
    const bookApunts = books.filter(function (book) {
        return book.publisher === "Apunts"
    })
    return bookApunts;
}

function booksNotSold(books) {
    const bookSold = books.filter(function (book) {
        return book.soldDate === ""
    })
    return bookSold;
}

function incrementPriceOfbooks(books, percentage) {
    return Array.from(books, book => book.price + book.price * percentage)
}

function getUserById(users, userId) {
    const user = users.find(user => user.id === userId);
    if (!user) {
        throw new Error("No existe")
    } else {
        return user
    }
}

function getUserIndexById(users, userId) {
    const user = users.findIndex(user => user.id === userId);
    if (user === -1) {
        throw new Error("No existe");
    } else {
        return user;
    }
}

function getUserByNickName(users, nick) {
    const user = users.find(user => user.nick === nick);
    if (!user) {
        throw new Error("No existe")
    } else {
        return user
    }
}

function getModuleByCode(modules, moduleCode) {
    const module = modules.find(module => module.code === moduleCode);
    if (!module) {
        throw new Error("No existe")
    } else {
        return module
    }
}


export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
}