const API_URL = "http://localhost:3000";
const getDBUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
};

const getDBUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
};

const addDBUser = async (newUser) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error('Error al añadir el usuario');
        }

        const addedUser = await response.json();
        return addedUser;
    } catch (error) {
        console.error("Error al añadir el usuario:", error);
    }
};

const removeDBUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
        }

        return `Usuario con ID ${id} eliminado correctamente`;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
    }
};

const changeDBUser = async (updatedUser) => {
    try {
        const response = await fetch(`${API_URL}/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        if (!response.ok) {
            throw new Error('Error al modificar el usuario');
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error al modificar el usuario:", error);
    }
};

const changeDBUserPassword = async (id, newPassword) => {
    try {
        const userResponse = await fetch(`${API_URL}/users/${id}`);
        const user = await userResponse.json();

        user.password = newPassword;

        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Error al modificar la contraseña del usuario');
        }

        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        console.error("Error al modificar la contraseña del usuario:", error);
    }
};

const getDBModules = async () => {
    try {
        const response = await fetch(`${API_URL}/modules`);
        const modules = await response.json();
        return modules;
    } catch (error) {
        console.error("Error al obtener módulos:", error);
    }
};

const getDBBooks = async () => {
    try {
        const response = await fetch(`${API_URL}/books`);
        const books = await response.json();
        return books;
    } catch (error) {
        console.error("Error al obtener libros:", error);
    }
};

const getDBBook = async (id) => {
    try {
        const response = await fetch(`${API_URL}/books/${id}`);
        const book = await response.json();
        return book;
    } catch (error) {
        console.error("Error al obtener el libro:", error);
    }
};

const addDBBook = async (newBook) => {
    try {
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error('Error al añadir el libro');
        }

        const addedBook = await response.json();
        return addedBook;
    } catch (error) {
        console.error("Error al añadir el libro:", error);
    }
};

const removeDBBook = async (id) => {
    try {
        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el libro');
        }

        return `Libro con ID ${id} eliminado correctamente`;
    } catch (error) {
        console.error("Error al eliminar el libro:", error);
    }
};

const changeDBBook = async (updatedBook) => {
    try {
        const response = await fetch(`${API_URL}/books/${updatedBook.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error('Error al modificar el libro');
        }

        const book = await response.json();
        return book;
    } catch (error) {
        console.error("Error al modificar el libro:", error);
    }
};

export {
    getDBUsers,
    getDBUser,
    addDBUser,
    removeDBUser,
    changeDBUser,
    changeDBUserPassword,
    getDBModules,
    getDBBooks,
    getDBBook,
    addDBBook,
    removeDBBook,
    changeDBBook
};
