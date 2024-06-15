const { CohereClient } = require("cohere-ai");
const { COHERE_API_KEY } = require('../config');

const cohere = new CohereClient({
  apiKey: COHERE_API_KEY
});

const callCohere = async (text, howManySentences = 5) => {
  try {
    const response = await cohere.generate({
      prompt: `You are a creative and experienced copywriter. Please write a unique summary of the following text using friendly, easy-to-read language. Please summarize the following text in 
      ${howManySentences > 1 ? "sentences" : "sentence" }. It's very important that you keep exact amount of sentences i've provided to you!: ${text}`,
      max_tokens: 500,
    });
    return response.generations[0].text.trim();
  } catch (error) {
    console.error("Error calling Cohere:", error.message);
    throw new Error("Failed to call Cohere");
  }
};

module.exports = { callCohere };