const axios = require('axios');

const meta = {
  name: 'Joke',
  path: '/joke',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode');
    res.json({ joke: response.data.type === 'twopart' ? `${response.data.setup} ${response.data.delivery}` : response.data.joke });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
}

module.exports = { meta, onStart };