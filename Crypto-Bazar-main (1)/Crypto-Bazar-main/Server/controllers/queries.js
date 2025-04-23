const Query=require("../model/queries");
const GeneratePrompt = require("../uitls/queries");

const Handlequery= async (req,res) => {
    GeneratePrompt(req,res);
    // return res.status(200).json({message: 'query fetched successfully'});
}

module.exports = Handlequery;
