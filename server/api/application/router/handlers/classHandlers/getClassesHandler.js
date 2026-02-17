const BaseHandler = require('../BaseHandler.js');

class GetClassesHandler extends BaseHandler {
    constructor(db) {
        super(db);
    }

    async execute() {
        return await this.db.getAllPersonClasses();
    }
}

module.exports = GetClassesHandler;