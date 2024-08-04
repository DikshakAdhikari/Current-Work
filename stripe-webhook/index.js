const express= require("express")
const dotenv= require('dotenv')
dotenv.config()
const stripe= require('stripe')(process.env.STRIPE_PASSWORD)

const app=express()

app.use(express.json());
const nodemailer= require("nodemailer")

app.get('/',(req,res)=> {
    res.send("Hello maannnnnaa")
})



app.post('/webhooks', express.raw({type: 'application/json'}), async(request, response) => {
    console.log('faaaaaaaaaaaaaaaa');
    const sig = request.headers['stripe-signature'];
  
    let event;
    let product= "https://drive.google.com/file/d/1K5LwwK-4875LMuT2978Yw8vr1MU0oPck/view?usp=drive_link"
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_SIGNING_SECRET);
      console.log(event);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',err);
      return;
    }

    let session=""
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        session = event.data.object;
        console.log(session);
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
        case 'checkout.session.completed':
        session = event.data.object;
        console.log(session);
        //send invoice email using nodemailer
        let emailto= session.customer_details.email

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
          
          // async..await is not allowed in global scope, must use a wrapper
          async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: process.env.EMAIL, // sender address
              to: emailto, // list of receivers
              subject: "Thanks for the payment for the product", // Subject line
              text: "Thanks for the payment for the product", // plain text body
              html: `
              Hello ${session.customer_details.email} Thanks for the payment of the product
              Here's the link of the product from hte google drive ${product} . you can download the file by going to this link
              `, // html body
            });
            console.log("Message sent: %s", info.messageId);
        }
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });

app.listen(5000, ()=> {
    console.log(`Server is listening on port ${5000}`);
})