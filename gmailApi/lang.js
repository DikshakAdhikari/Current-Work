const dotenv= require("dotenv")
dotenv.config()
const {ChatPromptTemplate} = require("@langchain/core/prompts");
const { ChatGroq } = require("@langchain/groq");

const model = new ChatGroq({
  apiKey: process.env.GROQ_KEY,
});
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant"],
  ["human", "{input}"],
]);

const chain = prompt.pipe(model);
const fun = async ()=> {
    const response =  await chain.invoke({
        input: "Hello",
      });
      console.log("response", response);
}

fun()

/**
response AIMessage {
  content: "Hello! I'm happy to assist you in any way I can. Is there something specific you need help with or a question you have?",
}
 */