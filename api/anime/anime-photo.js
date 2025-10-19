const axios = require('axios');

const meta = {
  name: 'Anime Image',
  path: '/anime-photo',
  method: 'get',
  category: 'anime'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('http://pic.re/image', {
      responseType: 'arraybuffer'
    });

    res.set('Content-Type', response.headers['content-type'] || 'image/jpeg');
    res.end(response.data, 'binary');
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch anime image' });
  }
}

module.exports = { meta, onStart };