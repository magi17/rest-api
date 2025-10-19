const axios = require('axios');

const meta = {
  name: 'Cat Image',
  path: '/cat',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search', { responseType: 'json' });
    res.json({ image: response.data[0].url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cat image' });
  }
}

module.exports = { meta, onStart };