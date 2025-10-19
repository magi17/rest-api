const axios = require('axios');

const meta = {
  name: 'Anime GIF',
  path: '/animegif',
  method: 'get',
  category: 'anime'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://otaku-anime-gif.vercel.app/?reaction=random', { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/gif');
    res.end(response.data, 'binary');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime GIF' });
  }
}

module.exports = { meta, onStart };