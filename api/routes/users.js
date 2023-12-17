const express = require('express');
const path = require('node:path');
const { authorize } = require('../utils/auths');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const jsonDbPathCat = path.join(__dirname, '/../data/cats.json');
const jsonDbPathCoffee = path.join(__dirname, '/../data/coffee.json');
const router = express.Router();

router.post('/set', authorize, (req, res) => {
  const { username } = req.user;
  const { score } = req.body;
  const { money } = req.body;

  if (!username) return res.status(400).json({ error: 'Username missing !' });
  if (!score) return res.status(400).json({ error: 'Score missing !' });
  if (!money || money < 0) return res.status(400).json({ error: 'Money missing !' });

  const users = parse(jsonDbPath);
  // find user score or get a new one
  let userScore = users.find((user) => user.username === username);

  if (userScore && userScore.score < score) userScore.score = score;
  else if (!userScore) {
    userScore = { username, score };
    users.push(userScore);
  }
  userScore.money = money;

  serialize(jsonDbPath, users);
  return res.sendStatus(200);
});

router.get('/get', authorize, (req, res) => {
  const { username } = req.user;

  if (!username) return res.status(400).json({ error: 'Username missing !' });

  const users = parse(jsonDbPath);
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ error: 'Player not existing' });
  }

  return res.status(200).json(user.score);
});

router.get('/scores', (req, res) => {
  const users = parse(jsonDbPath);

  if (!users) return res.status(404).json({ error: 'No users found' });

  users.sort((a, b) => b.score - a.score);
  return res.status(200).json(users);
});

router.get('/cats', authorize, (req, res) => {
  const { username } = req.user;

  if (!username) return res.status(400).json({ error: 'Username missing !' });

  const cats = parse(jsonDbPathCat);
  const usersCat = cats.find((c) => c.username === username);

  if (!usersCat) {
    return res.status(404).json({ error: 'Player not existing' });
  }

  return res.status(200).json(usersCat.state);
});

router.post('/cats', authorize, (req, res) => {
  const { username } = req.user;
  const { state } = req.body;

  if (!username) return res.status(400).json({ error: 'Username missing !' });
  if (!state) return res.status(400).json({ error: 'State missing !' });

  const cats = parse(jsonDbPathCat);
  // find user score or get a new one
  let userCat = cats.find((user) => user.username === username);

  if (userCat) userCat.state = state;
  else {
    userCat = { username, state };
    cats.push(userCat);
  }

  serialize(jsonDbPathCat, cats);
  return res.sendStatus(200);
});

router.get('/coffees', authorize, (req, res) => {
  const { username } = req.user;

  if (!username) return res.status(400).json({ error: 'Username missing !' });

  const coffee = parse(jsonDbPathCoffee);
  const usersCoffee = coffee.find((c) => c.username === username);

  if (!usersCoffee) {
    return res.status(404).json({ error: 'Player not existing' });
  }

  return res.status(200).json(usersCoffee.state);
});

router.post('/coffees', authorize, (req, res) => {
  const { username } = req.user;
  const { state } = req.body;

  if (!username) return res.status(400).json({ error: 'Username missing !' });
  if (!state) return res.status(400).json({ error: 'State missing !' });

  const coffee = parse(jsonDbPathCoffee);
  // find user score or get a new one
  let userCoffee = coffee.find((user) => user.username === username);

  if (userCoffee) userCoffee.state = state;
  else {
    userCoffee = { username, state };
    coffee.push(userCoffee);
  }

  serialize(jsonDbPathCoffee, coffee);
  return res.sendStatus(200);
});

module.exports = router;
