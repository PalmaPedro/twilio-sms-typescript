import express, { Application, Request, Response } from 'express';
const sendSMS = require('./twilio.ts');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app: Application = express();

app.use(express.json());

// test 'database'
const userDatabase = [];

/**
 * Test route to send sms from twilio
 * @param phone number to which a message will be sent
 * @param message text to be sent to phone number
 */
app.post('/outbound', (req: Request, res:Response) => {
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
    })
});

/**
 * Test route. After user replies back to twilio, this message will be sent back to the user 
 */
app.post('/inbound', (req: Request, res: Response) => {
  const twiml = new MessagingResponse();

  twiml.message('Copenhaven has received you message, and will get back to you shortly. Thank you!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(3002, () => console.log('Server running'));