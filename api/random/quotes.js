const axios = require('axios');

const meta = {
  name: 'Quote',
  path: '/quote',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://dummyjson.com/quotes/random');
    res.json({
      quote: response.data.quote,
      author: response.data.author
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch quote',
      fallback: {
        quote: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
      }
    });
  }
}

module.exports = { meta, onStart };
