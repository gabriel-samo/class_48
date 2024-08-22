const OpenAI = require("openai");
const config = require("./config");

const openai = new OpenAI({
  apiKey: config.openAiKey
});

const chatReq = async (req, res) => {
  try {
    const { message } = "Who is I" || req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0,
      max_tokens: 1000
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

chatReq();
