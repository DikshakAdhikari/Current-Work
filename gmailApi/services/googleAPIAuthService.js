const fs= require('fs').promises;
const path= require("path")
const process= require("process")
const {authenticate} = require('@google-cloud/local-auth')
const {google}= require('googleapis');

// Define scopes
const SCOPE=['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];

// Fetch and Store token from files
const TOKEN_PATH= path.join(process.cwd(), './credentials/token.json');
const CREDENTIALS_PATH= path.join(process.cwd(), './credentials/credentials.json')
// console.log(CREDENTIALS_PATH);

// Read perviously authorized credentials from saved file

async function loadSavedCredentialsIfExists(){ //It is going to handle- If our token file is already present then convert into json object and finally perform the following operation with the hellp of google auth
    try{ //If token is present or found
        const content= await fs.readFile(TOKEN_PATH);
        const credentials= JSON.parse(content) //let say we have the token already generated and we alerady read the file as well, now we need to have the content of the file inorder to parse and access it
        return google.auth.fromJSON(credentials) //it will require everthing and authenticate inorder to get the information
    }catch(err){
        return null
    }
}


// If let say our token file is not their, then we need to re-generate the token file, so for that we need to call the specific api which can authenticate and then finally can return the token, So that operation we are going to do here.
async function saveCredentials(client){
    const content= await fs.readFile(CREDENTIALS_PATH);
    const keys= JSON.parse(content);
    const key= keys.web || keys.installed;
    const payload= JSON.stringify({
        type: "authorized_user",
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token
    });

    await fs.writeFile(TOKEN_PATH, payload);

}


async function authorize(){ // This is the main method, which helps to trigger the specific api and trigger the token and supply it
    let client= await loadSavedCredentialsIfExists() //It will check if our specific token is already present or not. If token is alerady present then we do not need to regenerate it again, we'll simply assign it to client as a variable.
    if(client){
        return client
    }

    client= await authenticate({
        scopes: SCOPE,
        keyfilePath: CREDENTIALS_PATH,
    });

    if(client.credentials){
        await saveCredentials(client);
    }
    return client;
}

// authorize().catch(console.error)
module.exports= authorize