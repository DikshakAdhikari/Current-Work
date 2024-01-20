import { getClient } from "./connection/db";

const createTable= async ()=> {
    
    const userTable = `
    CREATE TABLE users (
        id BIGSERIAL PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        email VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    `
    
    try{
        const client= await getClient()
    const userSchema = await client?.query(userTable)
    console.log('Table created successfully!');
    
    }catch(err){
        console.log(err);
        
    }
}


createTable()