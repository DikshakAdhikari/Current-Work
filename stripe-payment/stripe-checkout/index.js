const express= require('express')
const dotenv= require('dotenv')
dotenv.config()
const stripe= require('stripe')(process.env.STRIPE_PASSWORD)

const app= express()


app.get('/', (req,res)=>{
    res.render('index.ejs')
})

app.post('/checkout', async(req,res)=> {
    try{
        const session= await stripe.checkout.sessions.create({
            line_items:[
                {
                    price_data:{
                        currency:'inr',
                        product_data:{ //Here we can add description and image of the product
                            name:'Node.js and Express book'
                        },
                        unit_amount:50*100
                    },
                    quantity:1
                },
                {
                    price_data:{
                        currency:'inr',
                        product_data:{ //Here we can add description and image of the product
                            name:'Golang T-Shirt'
                        },
                        unit_amount:100*100
                    },
                    quantity:2
                },
                
            ],
            mode:'payment',
            shipping_address_collection: {
                allowed_countries:['US','BR']
            },
            success_url: `http://localhost:5000/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:"http://localhost:5000/cancel"
        });
        res.redirect(session.url)
    }catch(err){
        res.json({message:err})
    }
})

app.get('/complete',async(req,res)=> {
    
    const result=await Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id,  {expand:['payment_intent.payment_method']}),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ]);
    console.log(JSON.stringify(await result));
    res.send('your payment was successful')
})

app.get('/cancel', (req,res)=> {
    res.redirect('/')
})

app.listen(5000,()=> {
    console.log(`Listening on port ${5000}`);
})
