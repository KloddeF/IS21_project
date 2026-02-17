const BaseHandler = require('../BaseHandler.js'); 
    
class sendMessageHandler extends BaseHandler {
    constructor(db) {
        super(db);
    }

    async execute(params) {
        const { token, message } = params;
        const user = await this.db.getUserByToken(token);
        await this.db.addMessage(user.id, message); // Добавляем сообщение
        const hash = this.md5(Math.random().toString());
        await this.db.updateChatHash(hash); // Обновляем хэш чата
        return true;
    }

    // Доп функция для создания хеша
    md5(input) {
        const crypto = require('crypto');
        return crypto.createHash('md5').update(input).digest('hex');
    }
}
   
module.exports = sendMessageHandler;