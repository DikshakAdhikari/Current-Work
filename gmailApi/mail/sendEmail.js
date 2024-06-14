const path = require('path')
const ejs= require('ejs')
const transporter= require('./transporter.js')


const sendEmail = async ({ name, email }) => {
  try {
    const requiredPath = path.join(__dirname, "../views/AccountCreated.ejs");
    console.log(requiredPath);

    const data = await ejs.renderFile(requiredPath, {
      name: name
    });

    var mainOptions = {
      from: '"Dikshak Adhikari" samm@gmail.com',
      to: email,
      subject: "Account Activated",
      html: data,
    };

    
    await transporter.sendMail(mainOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports= sendEmail