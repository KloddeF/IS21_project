const BaseHandler = require('../BaseHandler.js');

class BuyClassHandler extends BaseHandler {
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

        // Проверка существования класса  
        const classItem = await this.db.getPersonClassById(classId);
        if (!classItem) {
            return { error: 3001 };
        }

        // Проверка, не куплен ли уже класс  
        const owned = await this.db.getUserPersonClass(userId, classId);
        if (owned) {
            return { error: 3002 };
        }

        // Проверка достаточности денег  
        if (character.money < classItem.cost) {
            return { error: 3003 };
        }

        // Покупка класса  
        const connection = await this.db.beginTransaction();
        try {
            const moneyUpdated = await this.db.updateCharacterMoneySubtract(character.id, classItem.cost);
            if (!moneyUpdated) {
                await this.db.rollback(connection);
                return { error: 3004 };
            }

            const classAdded = await this.db.addUserPersonClass(userId, classId);
            if (!classAdded) {
                await this.db.rollback(connection);
                return { error: 3004 };
            }

            await this.db.commit(connection);
            return true;

        } catch (error) {
            await this.db.rollback(connection);
            return { error: 3004 };
        }
    }
}

module.exports = BuyClassHandler;