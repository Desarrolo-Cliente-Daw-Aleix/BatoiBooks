import Module from './module.class';

export default class Modules {
    constructor() {
        this.data = [];
    }

    populate(moduleArray) {
        this.data = moduleArray.map(moduleData => new Module(moduleData.code, moduleData.cliteral, moduleData.vliteral, moduleData.courseId));
    }

    booksFromModule(moduleCode) {
        return this.data.filter(book => book.moduleCode === moduleCode);
    }

    getModuleByCode(moduleCode) {
        const module = this.data.find(module => module.code === moduleCode);
        if (!module) throw new Error("No existe");
        return module;
    }

    toString() {
        return this.data.map(module => module.toString()).join('\n');
    }
}
