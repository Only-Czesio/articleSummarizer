const express = require("express");
const { processArticle } = require("./main");

const app = express();
const HOSTNAME = "localhost";
const PORT = 3000;

app.use(express.json());

app.post("/summarize", async (req, res) => {
  const { url, llm, sentencesCount } = req.body;

  const urlRegex = /^https?:\/\/(.*)/;

  if (!url.match(urlRegex)) {
    return res.status(400).send({ error: "Invalid URL!" });
  }

  if (!llm) {
    return res.status(400).send({ error: "LLM choice is required" });
  }

  try {
    const summary = await processArticle(url, llm, sentencesCount);
    res.send({ summary });
  } catch (error) {
    console.error("Error in /summarize:", error);
    res
      .status(500)
      .send({ error: "Error fetching text from URL or generating summary" });
  }
});

app.use((error, request, response, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return response.status(400).send({ error: "Invalid JSON" });
  }
  next();
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, (error) => {
    if (error) {
      console.error(error);
    }
    console.log(`App is running on http://${HOSTNAME}:${PORT}`);
  });
}

module.exports = app;
