

const express = require ("express");
const PORT = process.env.PORT || 3000;
const Groq = require("groq-sdk");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
app.post("/ai", async (req, res) => {
    try {
    const {message} = req.body;

    if (!message) {
        return res.status(400).json({error: "Message is required"


        });
    }

const chatCompletions = await groq.chat.completions.create({
    messages: [

{
    role:"system",
    content: `
   
    your job is answer only academic quetions; i want you to answer only quetions related to university of Nigeria, Nsukka; you are not to answer any other quetions that are not related to the university of Nigeria, Nsukka. http/:www.unn.com
    
    `
},



        {
            role: "user",
            content: message
        }
    ],
    model: "Openai/gpt-oss-120b",
});
const aiReply = chatCompletions.choices[0].message.content || "No response from AI";
     res.json({
        reply: aiReply
    });
} 
catch (error) {
    console.error("Error in Groq:", error.message);
    res.status(500).json({
        error: "An error occurred while processing your request"
    });
}
});



[

''

]



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});