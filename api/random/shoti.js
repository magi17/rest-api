const axios = require('axios');

const meta = {
  name: 'Shoti',
  path: '/shoti?type=video',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const { type } = req.query;
    const apikey = "";
    const apiUrl = type === 'image' ?
      `https://shoti.fbbot.org/api/get-shoti?type=image` :
      `https://shoti.fbbot.org/api/get-shoti?type=video`;
    
    const response = await axios.get(apiUrl);
    const data = response.data.result;
    
    if (type === 'image') {
      res.json({
        images: data.content,
        region: data.region,
        username: data.user.username,
        nickname: data.user.nickname,
        bio: data.user.signature
      });
    } else {
      res.json({
        video_url: data.content,
        duration_ms: parseInt(data.duration),
        region: data.region,
        username: data.user.username,
        nickname: data.user.nickname,
        instagram: data.user.instagram,
        twitter: data.user.twitter,
        bio: data.user.signature
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}

module.exports = { meta, onStart };
