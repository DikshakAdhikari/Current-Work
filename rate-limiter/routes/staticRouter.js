const express= require("express")
const router= express.Router()

let url1Items=[]
router.get('/', (req,res)=> {
    res.render('home',{
        url1data: url1Items
    })
});

router.get('/url1', async(req,res)=> {
    try{
        let url1Output ="Dikshak is a master"  //newItem= req.body.name
         url1Items.push(url1Output)
        res.redirect("/")
    }catch(err){
        res.status(403).json({message:err})
    }
})

module.exports= router