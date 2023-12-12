const express = require('express');
const path = require('node:path');
const { authorize } = require('../utils/auths');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/highScores.json');
const router = express.Router();

router.post('/set', authorize, (req, res) => {
  const { username } = req.user;
  const { score } = req.body;

  if (!username) return res.status(400).json({ error: 'Username missing !' });
  if (!score) return res.status(400).json({ error: 'Score missing !' });

  const highScores = parse(jsonDbPath);
  // find user score or get a new one
  let userScore = highScores.find((highScore) => highScore.username === username);

  if (userScore && userScore.score < score) userScore.score = score;
  else if (!userScore) {
    userScore = { username, score };
    highScores.push(userScore);
  }

  serialize(jsonDbPath, highScores);
  return res.sendStatus(200);
});

router.post('/get', authorize, (req, res) => {
  const { username } = req.user;

  if (!username) return res.status(400).json({ error: 'Username missing !' });

  const highScores = parse(jsonDbPath);
  let userScore = highScores.find((highScore) => highScore.username === username);

  if (!userScore) {
    userScore = { username, score: 0 };
    highScores.push(userScore);
    serialize(jsonDbPath, highScores);
  }

  return res.status(200).json(userScore);
});

router.get('/scores', (req, res) => {
  const scores = parse(jsonDbPath);

  if (!scores) return res.status(404).json({ error: 'No leaderboard found' });

  scores.sort((a, b) => b.score - a.score);
  return res.status(200).json(scores);
});

module.exports = router;
