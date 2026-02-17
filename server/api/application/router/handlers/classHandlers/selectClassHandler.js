const BaseHandler = require('../BaseHandler.js');

class SelectClassHandler extends BaseHandler {
    constructor(db) {
        super(db);
    }

    async execute(params) {
        const { token, classId } = params;
        // Получаем пользователя по токену
        const user = await this.checkUserByToken(token);
        if (user.error) return user;
        const userId = user.id;
        // Проверка персонажа  
        const character = await this.checkCharacterExists(userId);
        if (character.error) return character;
        // Проверка, что класс принадлежит пользователю  
        const owned = await this.db.getUserPersonClass(userId, classId);
        if (!owned) {
            return { error: 3005 };
        }
        // Проверка, что класс уже выбран  
        if (owned.selected === 1) {
            return { error: 3006 };
        }
        // Выбор класса  
        await this.db.clearSelectedUserClasses(userId);
        await this.db.setUserSelectedPersonClass(userId, classId);
        return true;
    }
}

module.exports = SelectClassHandler;