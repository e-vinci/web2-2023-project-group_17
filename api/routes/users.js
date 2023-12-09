const express = require('express');
const path = require("node:path");
const {authorize} = require('../utils/auths');
const {parse, serialize} = require("../utils/json");

const jsonDbPath = path.join(__dirname, '/../data/highScores.json');

const router = express.Router();

/**
 * set the score of the specified user to the new score
 * @param {midlleware} authorize this middleware verify if the request is authorized before allowing it to proceed
 */
// eslint-disable-next-line consistent-return
router.post('/set', authorize, (req, res) => {
    const {username} = req.user;
    if ( req?.body?.score === undefined) return res.status(400).json({error: 'Score missing !'}); // Bad Request

    if (!username) return res.status(400).json({error: 'Username missing !'}); // Bad Request

    const highScores = parse(jsonDbPath);

    highScores.forEach((highScore) => {
        if (highScore.username === username) {
            // eslint-disable-next-line no-param-reassign
            highScore.score = req.body.score;
        }
    });

    serialize(jsonDbPath, highScores);
    return res.sendStatus(200); // OK
});
/**
 * get the Score of the specified user
 * @param {midlleware} authorize this middleware verify if the request is authorized before allowing it to proceed
 * @returns the score at wich he user is or 0 if the user has never played
 */
// eslint-disable-next-line consistent-return
router.post('/get', authorize, (req, res) => {
    const {username} = req.user;

    if (!username) return res.status(400).json({error: 'Username missing !'}); // Bad Request

    const highScores = parse(jsonDbPath);

    let found;
    // eslint-disable-next-line consistent-return
    highScores.forEach((highScore) => {
        if (highScore.username === username) {
            found = highScore;
        }
    });

    if (found) {
        return res.status(200).json(found); // OK
    }
    const newhighScore = {
        username,
        score: 0,
    };
    highScores.push(newhighScore);
    serialize(jsonDbPath, highScores);
    return res.status(200).json(newhighScore); // OK
});

/**
 * @returns the leaderboard sorted by score or an error if there is no score registered in the leaderboard
 */

router.get('/scores', (req, res) => {
    const scores = parse(jsonDbPath);

    if (scores) {
        scores.sort((a, b) => b.score - a.score);
        return res.status(200).json(scores); // OK
    }
    return res.status(404).json({error: 'No leaderboard found'}); // Not Found

});

module.exports = router;