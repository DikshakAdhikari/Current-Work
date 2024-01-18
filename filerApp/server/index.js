const express= require('express')
const pool= require('./connection/db')
const cors= require('cors')

const dotenv= require('dotenv')
dotenv.config()

const app = express();
app.use(express.json())

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
    // Do any database operations here if needed
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error.message);
  })
  .finally(() => {
    // Close the connection after checking
    pool.end();
  });

app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on port ${process.env.PORT}`);
} )

