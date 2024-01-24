const express=  require("express")
const app= express()
const path= require("path")
const staticRoute= require("./routes/staticRouter")
const userRouter= require("./routes/userRouter")
app.use(express.json())

app.set('view engine', "ejs")
app.set("views", path.resolve('./views')) //app.set("views", path.join(__dirname, 'views'));

app.use('/', staticRoute )
app.use('/user', userRouter)

// app.get('/', (req,res)=> {
//     res.render("home")
// })



app.listen(3000, ()=> console.log('Listening on port 3000'))