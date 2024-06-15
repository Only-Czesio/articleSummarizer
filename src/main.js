const { fetchHTMLContent } = require('./utils/htmlFetcher');
const { callOpenAI } = require('./services/openaiService');
const { callCohere } = require('./services/cohereService');

const processArticle = async (url, llm, sentencesCount) => {
  try {
    const html = await fetchHTMLContent(url);
    let summary;
    switch (llm) {
        case 'openai':
            summary = await callOpenAI(html, sentencesCount);
            break;
        case 'cohere':
            summary = await callCohere(html, sentencesCount);
            break;
        default:
            return res.status(400).send({ error: "Invalid LLM choice" });
    }
    return summary;
  } catch (error) {
    console.error("Error processing article:", error.message);
  }
};

module.exports = { processArticle };