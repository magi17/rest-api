const axios = require('axios');

const meta = {
  name: 'Advice',
  path: '/advice',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://api.adviceslip.com/advice');
    res.json({ advice: response.data.slip.advice });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advice' });
  }
}

module.exports = { meta, onStart };