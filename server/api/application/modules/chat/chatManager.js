const SendMessageHandler = require('../../router/handlers/chatHandlers/sendMessageHandler.js');
const GetMessagesHandler = require('../../router/handlers/chatHandlers/getMessagesHandler.js');

class ChatManager {
    constructor({ mediator, db }) {
        this.db = db;
        this.mediator = mediator;
        // Получение типов ивентов и триггеров из медиатора
        const events = mediator.getEventTypes();
        const triggers = mediator.getTriggerTypes();

        // Подписка на ивенты
        mediator.subscribe(events.SEND_MESSAGE, this.sendMessage.bind(this));

        // Устанавливаем обработчики для триггеров
        mediator.set(triggers.GET_MESSAGES, this.getMessages.bind(this));
    }

    async sendMessage(params) {
        if (!params.token || !params.message) {
            return { error: 242 };
        }
        const handler = new SendMessageHandler(this.db);
        return await handler.execute(params);
    }

    async getMessages(params) {
        if (!params.token || !params.hash) {
            return { error: 242 };
        }
        const handler = new GetMessagesHandler(this.db);
        return await handler.execute(params);
    }

}

module.exports = ChatManager;