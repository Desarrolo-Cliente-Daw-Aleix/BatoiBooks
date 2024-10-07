import User from './user.class';

export default class Users {
    constructor() {
        this.data = [];
    }

    populate(userArray) {
        this.data = userArray.map(userData => new User(userData.id, userData.nick, userData.email, userData.password));
    }

    addUser(userData) {
        const newUser = new User(this.data.length + 1, userData.nick, userData.email, userData.password);
        this.data.push(newUser);
        return newUser;
    }

    removeUser(userId) {
        const index = this.data.findIndex(user => user.id === userId);
        if (index === -1) throw new Error('No existe');
        this.data.splice(index, 1);
    }

    changeUser(userData) {
        const index = this.data.findIndex(user => user.id === userData.id);
        if (index === -1) throw new Error('No existe');
        this.data[index] = new User(userData.id, userData.nick, userData.email, userData.password);
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
