const axios = require('axios');

const meta = {
  name: 'Dog Image',
  path: '/dog',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    res.json({ image: response.data.message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dog image' });
  }
}

module.exports = { meta, onStart };