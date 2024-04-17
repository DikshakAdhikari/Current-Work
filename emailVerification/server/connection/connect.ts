import mongoose from "mongoose"
export const mongooseConnect = async()=> {
    try{
        if(process.env.MONGO_URI){
       await mongoose.connect('mongodb://localhost:27017/assign')
       console.log('Connected Successfully');
        }
       
    }catch(err){
        console.log('Db Error' + err);
        
    }
    
}