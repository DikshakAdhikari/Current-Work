const Pool = require("pg").Pool;

const getClient= async ()=> {

    try{
        const client = new Pool({
            "user": "root",
            "password" : "root",
            "host" : "localhost",
            "port" : 5432,
            "database" : "test_db"
        });
        await client.connect()
        console.log('Postgtes connected successfully!');
        return client
    }catch(err){
        console.log(err);
    }

}

module.exports= getClient
