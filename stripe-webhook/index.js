const express = require("express");
const dotenv = require("dotenv");
const stripe = require("stripe");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();

app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
console.log(sig);
    let event;
    const product =
      "https://drive.google.com/file/d/1K5LwwK-4875LMuT2978Yw8vr1MU0oPck/view?usp=drive_link";

    try {
      
      event = stripe(process.env.STRIPE_PASSWORD).webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_SIGNING_SECRET
      );
      console.log(event);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    let session = "";

 
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        session = event.data.object;
        console.log(session);
        
        break;
      case "checkout.session.completed":
        session = event.data.object;
        console.log(session);
        // Send invoice email using nodemailer
        const emailTo = session.customer_details.email;

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // Send mail with defined transport object
          const info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: emailTo, // list of receivers
            subject: "Thanks for the payment for the product", // Subject line
            text: "Thanks for the payment for the product", // Plain text body
            html: `
                      Hello ${session.customer_details.email}, thanks for the payment of the product.
                      Here's the link to the product from Google Drive: ${product}. You can download the file by going to this link.
                    `, // HTML body
          });
          console.log("Message sent: %s", info.messageId);
        }
        main().catch(console.error);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.status(200).send();
  }
);

app.get("/", (req, res) => {
  res.send("Hello maannnnnaa");
});

app.listen(5000, () => {
  console.log(`Server is listening on port ${5000}`);
});
