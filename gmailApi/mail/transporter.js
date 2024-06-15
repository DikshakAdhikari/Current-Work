const nodemailer= require('nodemailer')
const dotenv= require('dotenv')
dotenv.config()
const path=require('path')
const fs= require('fs')
const { getAccessToken } = require('../services/googleAPIAuthService')

const TOKEN_PATH= path.join(__dirname, '../credentials/token.json')
const content = fs.readFileSync(TOKEN_PATH)
const credentials = JSON.parse(content)
const CLIENT_ID= credentials.client_id
const CLIENT_SECRET= credentials.client_secret
const REFRESH_TOKEN= credentials.refresh_token
const ACCESS_TOKEN= 'ya29.a0AXooCgvrB6Vte8AArUzeqgebCw86wqawpgM0QRlWVHHX7v-LzX8_haMtky1e7Blcs7B9r39kpfecCMNqW2ms4r-ImrDJm0RJ7w75m-yaR_6endPFjQWtOxeRLlK5UtZUbfknkSE3bk5AA2WWjTYKK2Sv4tiY0bH0MgAGsAaCgYKAYYSARISFQHGX2MizmEO1WebBLtWHDoZ9GMICQ0173'

console.log('client id: '+ CLIENT_ID);
console.log('client secret: '+ CLIENT_SECRET);
// console.log('refresh token: '+ REFRESH_TOKEN);
// console.log('access token: '+ ACCESS_TOKEN);

// const transporter = nodemailer.createTransport({
//     service: 'OAuth2',
//     user: 'ddikshakk@gmail.com',
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     refreshToken: '1//0g2GMoD2Krs4sCgYIARAAGBASNwF-L9Irl2odHqitarcO62yxjZnnGMXdq0mGxJCRza2LZJS_kHIIh425lOdfqAkiO1t1GZIV9ps',
//     accessToken: 'ya29.a0AXooCgvrB6Vte8AArUzeqgebCw86wqawpgM0QRlWVHHX7v-LzX8_haMtky1e7Blcs7B9r39kpfecCMNqW2ms4r-ImrDJm0RJ7w75m-yaR_6endPFjQWtOxeRLlK5UtZUbfknkSE3bk5AA2WWjTYKK2Sv4tiY0bH0MgAGsAaCgYKAYYSARISFQHGX2MizmEO1WebBLtWHDoZ9GMICQ0173',
//   });


  

//   //checking connection
// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Mail server is running...");
//   }
// });


async function sendEmail() {
  try {
    // const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ddikshakk@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: 'ya29.a0AXooCgvrB6Vte8AArUzeqgebCw86wqawpgM0QRlWVHHX7v-LzX8_haMtky1e7Blcs7B9r39kpfecCMNqW2ms4r-ImrDJm0RJ7w75m-yaR_6endPFjQWtOxeRLlK5UtZUbfknkSE3bk5AA2WWjTYKK2Sv4tiY0bH0MgAGsAaCgYKAYYSARISFQHGX2MizmEO1WebBLtWHDoZ9GMICQ0173',
      },
    });

    const mailOptions = {
      from: 'dikshak <ddikshakk@gmail.com>',
      to: 'dikshak302000@gmail.com',
      subject: 'Hello',
      text: 'Hello world!',
      html: '<b>Hello world!</b>',
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', result.messageId);
  } catch (error) {
    console.log('Error:', error);
  }
}

sendEmail().catch(console.error);


// module.exports= transporter