const dotenv= require("dotenv")
dotenv.config()
const {ChatPromptTemplate} = require("@langchain/core/prompts");
const { ChatGroq } = require("@langchain/groq");

const model = new ChatGroq({
  apiKey: process.env.GROQ_KEY,
});
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "If the input by the user consists of the words like 'complex' or 'seldom' then suggest some random time else just tell that you don't know the answer. Don't give answer other then the above stated"],
  ["human", "{input}"],
]);

const chain = prompt.pipe(model);
const fun = async ()=> {
    const response =  await chain.invoke({
        input: "Where is agara",
      });
      console.log("response", response.lc_kwargs.content);
}

fun()

/**
response AIMessage {
  content: "Hello! I'm happy to assist you in any way I can. Is there something specific you need help with or a question you have?",
}
 */