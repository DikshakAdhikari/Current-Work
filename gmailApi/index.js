const authorize = require('../gmailApi/services/googleAPIAuthService');
require('./processors/index')
const {listOfLabels , sendEmail, getLatestMessage, getMessages, test}= require('../gmailApi/services/gmailApiServices')


async function testing(){
    let auth= await authorize().then().catch(console.error)
    // console.log(auth);
    await listOfLabels(auth).then().catch(console.error)

    let message= 'TO: ddikshakk@gmail.com\n' +
    'Subject: Test Email\n'+
    'Content-Type: text/html; charset=utf-8\n\n' +
    'Hello world!';

    // await sendEmail(auth, message).catch(console.error);
    // await getLatestMessage(auth).catch(console.error)
    // await getMessages(auth).catch(console.error)
    // await test(auth).catch(console.error)
}

testing().catch(console.error);