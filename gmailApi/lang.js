const dotenv= require("dotenv")
dotenv.config()
const {ChatPromptTemplate} = require("@langchain/core/prompts");
const { ChatGroq } = require("@langchain/groq");

const model = new ChatGroq({
  apiKey: process.env.GROQ_KEY,
});
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "Give answer in one line"],
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
