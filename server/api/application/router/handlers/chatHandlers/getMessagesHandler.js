const BaseHandler = require('../BaseHandler.js'); 
    
class getMessagesHandler extends BaseHandler {
    constructor(db) {
        super(db);
    }

    async execute(params) {
        if (!params.hash) {
            return { error: 242 };
        }
        const hash = params.hash;
        const currentHash = (await this.db.getChatHash()).chat_hash;
        if (hash === currentHash) { // если хэши совпадают - возвращаем только хэш
            return {
                hash: hash,
                unchanged: true
            };
        }
        const messages = await this.db.getMessages();  // получаем сообщения при разных хэшах
        return {
            messages: messages,
            hash: currentHash.chat_hash,
            updated: true
        };
    }
}
   
module.exports = getMessagesHandler;