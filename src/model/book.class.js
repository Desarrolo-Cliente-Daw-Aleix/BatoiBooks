export default class Book {
    constructor({ id, pages, price, userId, moduleCode, status, publisher, photo = '', comments = '', soldDate = '' }) {
        this.id = id;
        this.pages = pages;
        this.price = price;
        this.userId = userId;
        this.moduleCode = moduleCode;
        this.status = status;
        this.publisher = publisher;
        this.photo = photo;
        this.comments = comments;
        this.soldDate = soldDate;
    }

    toString() {
    return `Book: ID=${this.id}, Title=${this.title}, Price=${this.price}€, UserID=${this.userId}, ModuleCode=${this.moduleCode}, Status=${this.status}, Publisher=${this.publisher}, Photo=${this.photo ? 'Yes' : 'No'}, Comments=${this.comments}, SoldDate=${this.soldDate ? this.soldDate : 'Not sold'}`;
}

}
