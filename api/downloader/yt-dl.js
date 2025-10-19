const axios = require("axios");

module.exports = {
  meta: {
    name: "YouTube Downloader",
    version: "1.0.0",
    description: "Download YouTube videos",
    author: "rapido",
    path: "/ytdl?url=https://youtu.be/Rht8rS4cR1s?feature=shared&type=mp4",
    method: "get",
    category: "downloader"
  },
  onStart: async function({ req, res }) {
    const youtubeUrl = req.query.url;
    if (!youtubeUrl || (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be"))) {
      return res.status(400).json({ error: "Valid YouTube URL required" });
    }
    
    try {
      const videoResponse = await axios.post("https://fsmvid.com/api/proxy", {
        url: youtubeUrl,
        platform: "youtube"
      });
      
      const audioResponse = await axios.post("https://fsmvid.com/api/proxy", {
        url: youtubeUrl,
        platform: "youtube"
      });
      
      const videoData = videoResponse.data;
      const audioData = audioResponse.data;
      
      if (videoData.status !== "success" || audioData.status !== "success") {
        return res.status(404).json({ error: "No download links found" });
      }
      
      const mp4720p = videoData.medias.find(m => m.ext === "mp4" && m.quality.includes("720p"));
      const mp3 = audioData.medias.find(m => m.is_audio);
      
      return res.json({
        title: videoData.title,
        thumbnail: videoData.thumbnail,
        duration: videoData.duration,
        url: mp3 ? mp3.url : null
      });
      
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({
          error: "Failed to fetch video data",
          status: error.response.status
        });
      }
      return res.status(500).json({
        error: "Server error",
        message: error.message
      });
    }
  }
};