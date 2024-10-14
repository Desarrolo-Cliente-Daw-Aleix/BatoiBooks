import User from './user.class';
import { getDBUsers, addDBUser, removeDBUser, changeDBUser, changeDBUserPassword } from '../services/api.js';

export default class Users {
    constructor() {
        this.data = [];
    }

    async populate() {
        const usersArray = await getDBUsers();
        this.data = usersArray.map(userData => new User(userData.id, userData.nick, userData.email, userData.password));
    }

    async addUser(userData) {
        const newUser = await addDBUser(userData);
        this.data.push(new User(newUser.id, newUser.nick, newUser.email, newUser.password));
        return newUser;
    }

    async removeUser(userId) {
        await removeDBUser(userId);
        const index = this.data.findIndex(user => user.id === userId);
        if (index === -1) throw new Error('No existe');
        this.data.splice(index, 1);
    }

    async changeUser(userData) {
        const updatedUser = await changeDBUser(userData);
        const index = this.data.findIndex(user => user.id === updatedUser.id);
        if (index === -1) throw new Error('No existe');
        this.data[index] = new User(updatedUser.id, updatedUser.nick, updatedUser.email, updatedUser.password);
    }

    async changeUserPassword(userId, newPassword) {
        const updatedUser = await changeDBUserPassword(userId, newPassword);
        const index = this.data.findIndex(user => user.id === userId);
        if (index === -1) throw new Error('No existe');
    }   

    getUserById(userId) {
        const user = this.data.find(user => user.id === userId);
        if (!user) throw new Error("No existe");
        return user;
    }

    getUserIndexById(userId) {
        const userIndex = this.data.findIndex(user => user.id === userId);
        if (userIndex === -1) throw new Error("No existe");
        return userIndex;
    }

    getUserByNickName(nick) {
        const user = this.data.find(user => user.nick === nick);
        if (!user) throw new Error("No existe");
        return user;
    }

    toString() {
        return this.data.map(user => user.toString()).join('\n');
    }
}
