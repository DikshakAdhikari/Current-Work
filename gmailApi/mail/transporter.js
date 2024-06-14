const nodemailer= require('nodemailer')
const dotenv= require('dotenv')
dotenv.config()
const path=require('path')
const fs= require('fs')
const { log } = require('console')

const TOKEN_PATH= path.join(__dirname, '../credentials/token.json')
const content = fs.readFileSync(TOKEN_PATH)
const credentials = JSON.parse(content)
console.log(credentials.type);

// // const transporter = nodemailer.createTransport({
// //     service: 'OAuth2',
// //     user: 'ddikshakk@gmail.com',
// //     clientId: CLIENT_ID,
// //     clientSecret: CLIENT_SECRET,
// //     refreshToken: REFRESH_TOKEN,
// //     accessToken: ACCESS_TOKEN,
// //   });

// //   //checking connection
// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.log(error);
// //   } else {
// //     console.log("Mail server is running...");
// //   }
// });


module.exports= transporter