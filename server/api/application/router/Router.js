const express = require('express');
const Answer = require('./Answer.js');

function Router(mediator) {
    const router = express.Router();

    // ============ USER ROUTES ============
    //LOGIN
    router.post('/login{/:login}{/:passwordHash}', async (req, res) => {
        const params = {
            login: req.params.login,
            passwordHash: req.params.passwordHash
        };
        const response = await mediator.call(mediator.getEventTypes().LOGIN, params);
        res.json(Answer.response(response));
    });

    //LOGOUT
    router.post('/logout{/:token}', async (req, res) => {
        const params = {
            token: req.params.token
        };
        const response = await mediator.call(mediator.getEventTypes().LOGOUT, params);
        res.json(Answer.response(response));
    });

    //REGISTATION
    router.post('/registration{/:login}{/:passwordHash}{/:nickname}', async (req, res) => {
        const params = {
            login: req.params.login,
            passwordHash: req.params.passwordHash,
            nickname: req.params.nickname
        };
        const response = await mediator.call(mediator.getEventTypes().REGISTRATION, params);
        res.json(Answer.response(response));
    });

    //DELETE_USER
    router.post('/deleteUser{/:token}', async (req, res) => {
        const params = {
            token: req.params.token
        };
        const response = await mediator.call(mediator.getEventTypes().DELETE_USER, params);
        res.json(Answer.response(response));
    });

    //GET_USER_INFO
    router.get('/getUserInfo{/:token}', async (req, res) => {
        const params = {
            token: req.params.token
        };
        const response = await mediator.get(mediator.getTriggerTypes().GET_USER_INFO, params);
        res.json(Answer.response(response));
    });

    //GET_RATING_TABLE
    router.get('/getRatingTable{/:token}', async (req, res) => {
        const params = {
            token: req.params.token
        };
        const response = await mediator.get(mediator.getTriggerTypes().GET_RATING_TABLE, params);
        res.json(Answer.response(response));
    });

    // ============ ITEMS ROUTES ============
    //BUY_ITEM
    router.post('/buyItem{/:token}{/:itemId}', async (req, res) => {
        const params = {
            token: req.params.token,
            itemId: req.params.itemId
        };
        const response = await mediator.call(mediator.getEventTypes().BUY_ITEM, params);
        res.json(Answer.response(response));
    });

    //SELL_ITEM
    router.post('/sellItem{/:token}{/:itemId}', async (req, res) => {
        const params = {
            token: req.params.token,
            itemId: req.params.itemId
        };
        const response = await mediator.call(mediator.getEventTypes().SELL_ITEM, params);
        res.json(Answer.response(response));
    });

    //USE_ARROW
    router.post('/useArrow{/:token}', async (req, res) => {
        const params = {
            token: req.params.token
        };
        const response = await mediator.call(mediator.getEventTypes().USE_ARROW, params);
        res.json(Answer.response(response));
    });

    //USE_POTION
    router.post('/usePotion{/:token}', async (req, res) => {
        const params = {
            token: req.params.token
        };
        const response = await mediator.call(mediator.getEventTypes().USE_POTION, params);
        res.json(Answer.response(response));
    });

    //GET_ITEMS_DATA
    router.get('/getItemsData{/:token}', async (req, res) => {
        const params = {
            token: req.params.token
        };
        const response = await mediator.get(mediator.getTriggerTypes().GET_ITEMS_DATA, params);
        res.json(Answer.response(response));
    });

    //BUY_CLASS
    router.get('/buyClass{/:token}{/:classId}', async (req, res) => {
        const params = {
            token: req.params.token,
            classId: req.params.classId
        };
        const response = await mediator.call(mediator.getEventTypes().BUY_CLASS, params);
        res.json(Answer.response(response));
    });

    //SELECT_CLASS
    router.get('/selectClass{/:token}{/:classId}', async (req, res) => {
        const params = {
            token: req.params.token,
            classId: req.params.classId
        };
        const response = await mediator.call(mediator.getEventTypes().SELECT_CLASS, params);
        res.json(Answer.response(response));
    });

    //GET_CLASSES
    router.get('/getClasses{/:token}', async (req, res) => {
        const params = {
            token: req.params.token
        };
        const response = await mediator.get(mediator.getTriggerTypes().GET_CLASSES, params);
        res.json(Answer.response(response));
    });

    //GET_MESSAGES
    router.get('/getMessages{/:token}{/:hash}', async (req, res) => {
        const params = {
            token: req.params.token,
            hash: req.params.hash
        };
        const response = await mediator.get(mediator.getTriggerTypes().GET_MESSAGES, params);
        res.json(Answer.response(response));
    });

    //SEND_MESSAGE
    router.get('/sendMessage{/:token}{/:message}', async (req, res) => {
        const params = {
            token: req.params.token,
            message: req.params.message
        };
        const response = await mediator.call(mediator.getEventTypes().SEND_MESSAGE, params);
        res.json(Answer.response(response));
    });

    // ============ NOT FOUND ============
    router.get('/*path', (req, res) => {
        res.json(Answer.response({ error: 404 }));
    });

    router.post('/*path', (req, res) => {
        res.json(Answer.response({ error: 404 }));
    });

    return router;
}

module.exports = Router;