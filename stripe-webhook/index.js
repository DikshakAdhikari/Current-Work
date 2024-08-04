const express = require("express");
const dotenv= require("dotenv")
dotenv.config()
const stripe = require("stripe")(process.env.STRIPE_PASSWORD);
const bodyParser = require("body-parser");
const app = express();

// Use body-parser's raw middleware for Stripe webhook endpoint
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    let signingSecret = process.env.STRIPE_SIGNING_SECRET;

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Pass the raw body to constructEvent
        event = stripe.webhooks.constructEvent(req.body, sig, signingSecret);
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ success: false });
    }

    console.log(event.type);
    console.log(event.data.object);
    console.log(event.data.object.id);
    res.json({
        success: true
    });
});

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
});
