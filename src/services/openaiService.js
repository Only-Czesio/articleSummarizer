const OpenAI = require("openai");
const { OPENAI_API_KEY } = require('../config');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const callOpenAI = async (text, howManySentences) => {
  try {
    const params = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative and experienced copywriter. Please write a unique summary of the following text using friendly, easy-to-read language.",
        },
        {
          role: "user",
          content: `Please summarize the following text in ${howManySentences} sentences: ${text}`,
        },
      ],
      max_tokens: 500,
    };

    const response = await openai.createChatCompletion(params);
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded. Please try again later.");
    } else {
      console.error("Error calling OpenAI:", error.message);
    }
    throw new Error("Failed to call OpenAI");
  }
};

module.exports = { callOpenAI };