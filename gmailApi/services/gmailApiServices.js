const {google} = require('googleapis')
const Queue= require('bull')

const emailQueue = new Queue("emailQueue", {
    redis: { port: 6379, host: "127.0.0.1" },
  });

async function listOfLabels(auth){
    const gmail= google.gmail({version: 'v1', auth});
    const res= await gmail.users.labels.list({
        userId:'me',
    });

    const labels= res.data.labels;
    if(!labels || labels.length == 0){
        console.log('No labels are found!');
        return;
    }
    

    console.log('Labels:');
    labels.forEach((label => {
        console.log(`- ${label.name}`);
    }));

    return labels;
}


async function sendEmail(auth, content){
    const gmail= google.gmail({version:'v1', auth});
    const encodedMessage= Buffer.from(content).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const res= await gmail.users.messages.send({
        userId: 'me',
        requestBody:{
            raw: encodedMessage
        }
    });

    console.log(res.data);;
    return res.data;
}

async function getLatestMessage(auth){
    const gmail= google.gmail({version:"v1", auth});
    const res= await gmail.users.messages.list({
        userId:'me',
        maxResults: 1,
    });

    let latestMessageId= res.data.messages[0].id;
    console.log(`Latest message id is: ${latestMessageId}`);

    const messageContent= await gmail.users.messages.get({
        userId:"me",
        id: latestMessageId,
    });

    const body= JSON.stringify(messageContent.data.payload.body.data);
    console.log(body);
    const mailBody= new Buffer.from(body, 'base64').toString();
    console.log(mailBody);
    return mailBody
}


async function getMessages(auth){
    const gmail= google.gmail({version:"v1", auth});
    const res= await gmail.users.messages.list({
        userId:'me',
        maxResults: 3,
    });

    for(let i=0; i<3 ; i++){
        let latestMessageIds= res.data.messages[i].id;
        const messageContent= await gmail.users.messages.get({
            userId:"me",
            id: latestMessageIds,
        });
       
        const emailType= JSON.parse(JSON.stringify(messageContent.data.payload.mimeType))
        if(emailType === "text/html"){
            var body= JSON.parse(JSON.stringify(messageContent.data.payload.body.data));
        }else if(emailType === "multipart/alternative"){
            var body= JSON.parse(JSON.stringify(messageContent.data.payload.parts[0].body.data));
        }else{ //multipart/mixed
            var body= JSON.parse(JSON.stringify(messageContent.data.payload.parts[0].parts[0].body.data));
        }
        const mailBody= new Buffer.from(body, 'base64').toString();
        console.log(mailBody);
        
    }
}

const emptyBullQueue= async()=> {
    await emailQueue.obliterate({ force: true });
       console.log('Queue obliterated');
 }

async function test(auth){
    // const gmail= google.gmail({version:"v1", auth});
    // const res= await gmail.users.messages.list({
    //     userId:'me',
    //     maxResults: 3,
    // });

    // for(let i=0; i<3 ; i++){
    //     let latestMessageIds= res.data.messages[i].id;
    //     const messageContent= await gmail.users.messages.get({
    //         userId:"me",
    //         id: latestMessageIds,
    //     });
       
    //     const emailType= JSON.parse(JSON.stringify(messageContent.data.payload.mimeType))
    //     if(emailType === "text/html"){
    //         var body= JSON.parse(JSON.stringify(messageContent.data.payload.body.data));
    //     }else if(emailType === "multipart/alternative"){
    //         var body= JSON.parse(JSON.stringify(messageContent.data.payload.parts[0].body.data));
    //     }else{ //multipart/mixed
    //         var body= JSON.parse(JSON.stringify(messageContent.data.payload.parts[0].parts[0].body.data));
    //     }
    //     const mailBody= new Buffer.from(body, 'base64').toString();
    //     emailQueue.add(
    //         {mailBody},{fifo:true, attempts:1, delay:4000}
    //     ) 
    //     // console.log(mailBody);
    //     console.log('----------------------------------------------------------------------------------');
    // }
    // emptyBullQueue()
}


module.exports= {
    listOfLabels: listOfLabels,
    sendEmail: sendEmail,
    getLatestMessage: getLatestMessage,
    getMessages: getMessages,
    test:test
}


// multipart/alternative -> messageContent.data.payload.parts[0].body.data
// text/html -> messageContent.data.payload.body.data