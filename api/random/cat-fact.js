const axios = require('axios');

const meta = {
  name: 'Cat Fact',
  path: '/catfact',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    res.json({ fact: response.data.fact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cat fact' });
  }
}

module.exports = { meta, onStart };