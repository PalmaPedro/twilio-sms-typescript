"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendSMS = require('./twilio');
const app = express_1.default();
app.use(express_1.default.json());
// test 'database'
const userDatabase = [];
/**
 * Test route to send sms
 * @param phone number to which a message will be sent
 * @param message text to be sent to phone number
 */
app.post('/send-sms', (req, res) => {
    const { phone, message } = req.body;
    const user = {
        phone,
        message
    };
    userDatabase.push(user);
    //const welcomeMessage = 'Welcome to Copenheaven!';
    sendSMS(user.phone, user.message);
    res.status(201).send({
        message: 'Message sent to given phone number!',
        data: user
    });
});
app.listen(3002, () => console.log('Server running'));
