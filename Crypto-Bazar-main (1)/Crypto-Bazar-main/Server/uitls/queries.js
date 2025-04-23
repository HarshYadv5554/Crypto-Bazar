const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require('dotenv');
dotenv.config();
const Query=require("../model/queries");
// Access your API key as an environment variable (see "Set up your API key" above)
// console.log(process.env.GEMINI_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const GeneratePrompt=async (req,res) =>{
    const {prompt} = req.body;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // const id= req.cookies?._id;
    // console.log(id);
    // await Query.create({prompt:prompt,content:JSON.stringify(response),user:id});
    res.status(200).json({response});
}

module.exports= GeneratePrompt;