const axios = require("axios");

const fetchHTMLContent = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching HTML content from ${url}:`, error.message);
    throw new Error(`Failed to fetch HTML content from ${url}`);
  }
};

const extractMainContent = (html) => {
    return { text: html };
  };

module.exports = { fetchHTMLContent, extractMainContent };