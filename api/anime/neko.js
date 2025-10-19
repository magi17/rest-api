const axios = require('axios');

const meta = {
  name: 'neko',
  path: '/neko',
  method: 'get',
  category: 'anime',
  description: 'Random neko images API'
};

async function onStart({ req, res }) {
  try {
    const { data } = await axios.get("https://nekos.best/api/v2/neko");
    const imageUrl = data.results[0].url;
    const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
    
    res.setHeader('Content-Type', 'image/jpeg');
    imageResponse.data.pipe(res);
    
  } catch (error) {
    console.error('Neko API Error:', error.message);
    res.status(500).json({
      status: false,
      error: 'Failed to fetch neko image'
    });
  }
}

module.exports = { meta, onStart };