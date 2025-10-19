const axios = require('axios');

const meta = {
  name: 'website screenshot',
  path: '/screenshot?url=https://example.com',
  method: 'get',
  category: 'tools'
};

async function onStart({ req, res }) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({
      error: 'url parameter is required',
      example: '/screenshot?url=https://example.com'
    });
  }
  
  try {
    const apiurl = `https://api.pikwy.com/?tkn=125&d=3000&fs=0&w=1280&h=1200&s=100&z=100&f=jpg&rt=jweb&u=${encodeURIComponent(url)}`;
    const response = await axios.get(apiurl);
    
    if (!response.data || !response.data.iurl) {
      throw new Error('no image url found in response');
    }
    
    res.json({
      status: true,
      url: response.data.iurl
    });
    
  } catch (error) {
    res.status(500).json({
      status: false,
      error: 'failed to capture screenshot'
    });
  }
}

module.exports = { meta, onStart };