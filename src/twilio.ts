require('dotenv').config();

//import * as Twilio from 'twilio';

/**
 * Environment variables
 */
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

/**
 * Start sending sms
 */
const sendSMS = (phone: number, message: string) => {
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: message,
            from: phoneNumber,
            to: phone
        })
        .then((message: { sid: string; }) => console.log(message.sid));
}

module.exports = sendSMS;