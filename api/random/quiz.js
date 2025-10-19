const axios = require('axios');

const meta = {
  name: 'Quiz',
  path: '/quiz',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
    const quiz = response.data.results[0];
    res.json({
      question: quiz.question,
      correct_answer: quiz.correct_answer,
      options: [...quiz.incorrect_answers, quiz.correct_answer].sort(() => Math.random() - 0.5)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
}

module.exports = { meta, onStart };