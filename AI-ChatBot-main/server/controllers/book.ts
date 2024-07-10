import express from 'express'
import book from '../models/book';
//@ts-ignore
export const postBook=async(req,res)=>{
try {
    const {name,author,description,price}=req.body;
    const data=await book.create({
        name:name,
        author:author,
        description:description,
        price:price
    })
    await data.save();
    res.json('book uploaded successfully');
} catch (error) {
    
}
}