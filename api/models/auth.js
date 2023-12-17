const jwt = require('jsonwebtoken');
const path = require('node:path');
const bcrypt = require('bcrypt');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'NekoCafe';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const jsonDbPathCat = path.join(__dirname, '/../data/cats.json');
const jsonDbPathCoffee = path.join(__dirname, '/../data/coffee.json');

// Default user
const defaultUsers = [
  {
    id: 1,
    username: 'monad',
    password: bcrypt.hashSync('monad', saltRounds),
    score: 0,
    money: 10000,
  },
];

const defaultCoffeeState = [
  {
    name: 'Meowcha Latte',
    picture: '/2a5669c177321388dccd.png',
    level: 0,
    price: 5,
  },
  {
    name: 'Purrista Blend',
    picture: '/b10983e7cb59528b806a.png',
    level: 0,
    price: 10,
  },
  {
    name: 'Pancat Stacks',
    picture: '/e42ec34828ecc93359e0.png',
    level: 0,
    price: 15,
  },
  {
    name: 'Tiramisu Tabby Treat',
    picture: '/2fda355efa67dbfa6b3a.png',
    level: 0,
    price: 20,
  },
  {
    name: 'Purrfectly Sweet Cookie Sundae',
    picture: '/94ede3199fc9ec37a01a.png',
    level: 0,
    price: 25,
  },
  {
    name: 'Red Velvet Kitty Cake',
    picture: '/dbb2026456fe389b6ba5.png',
    level: 0,
    price: 30,
  },
  {
    name: 'Lemon Mew Cheesecake',
    picture: '/db31f4cdd6876f43e3f6.png',
    level: 0,
    price: 35,
  },
  {
    name: 'Cinnamon Swirl Whiskers',
    picture: '/378afc1a9b7dc3aa1d53.png',
    level: 0,
    price: 40,
  },
  {
    name: 'Meowy Christmas Log',
    picture: '/cca8d968eddbedec09a3.png',
    level: 0,
    price: 45,
  },
  {
    name: 'Catini Bliss',
    picture: '/45f9f4956277c3a557fc.png',
    level: 0,
    price: 50,
  },
];
const defaultCatState = [
  {
    name: 'Salem',
    bonusAppearing: 0,
    bonusClick: 0,
    picture: '/bbdedb463bd8017d87a6.png',
    isAdopted: true,
    isActive: true,
    price: 0,
  },
  {
    name: 'Rusty',
    bonusAppearing: 2,
    bonusClick: 0,
    picture: '/709d69658d59b03acaf7.png',
    isAdopted: false,
    isActive: false,
    price: 100,
  },
  {
    name: 'Kali',
    bonusAppearing: 0,
    bonusClick: 2,
    picture: '/577803d05bc0eeebf44b.png',
    isAdopted: false,
    isActive: false,
    price: 400,
  },
  {
    name: 'Atchoum',
    bonusAppearing: 2,
    bonusClick: 2,
    picture: '/b1ba579d5b9aec35f049.png',
    isAdopted: false,
    isActive: false,
    price: 500,
  },
  {
    name: 'Bubbles',
    bonusAppearing: 5,
    bonusClick: 0,
    picture: '/caeb937646515f942934.png',
    isAdopted: false,
    isActive: false,
    price: 1000,
  },
  {
    name: 'Pinkie',
    bonusAppearing: 0,
    bonusClick: 5,
    picture: '/f5f1f93dabef2865ed2e.png',
    isAdopted: false,
    isActive: false,
    price: 10000,
  },
];

const defaultCats = [{
  username: 'monad',
  state: defaultCatState,
},
];
const defaultCoffees = [{
  username: 'monad',
  state: defaultCoffeeState,
},
];

/**
 * Logs a user in
 * @param {string} username The username of the user to log in
 * @param {string} password The password of the user to log in
 * @returns The token of the user and the username, or undefined if login failed
 */
async function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username },
    jwtSecret,
    { expiresIn: lifetimeJwt },
  );

  return {
    username,
    token,
    score: userFound.score,
    money: userFound.money,
  };
}

/**
 * Registers a new user
 * @param {string} username The username of the new user
 * @param {string} password The password of the new user
 * @returns The token of the new user and the username or undefined if the user already exists
 */
async function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  const createdUser = await createOneUser(username, password);
  createUserCats(username);
  createUserCoffees(username);

  const token = jwt.sign(
    { username },
    jwtSecret,
    { expiresIn: lifetimeJwt },
  );
  return {
    username,
    token,
    score: createdUser.score,
    money: createdUser.money,
  };
}

/**
 * search a user from the database by username
 * @param {string} username The username of the user to look for
 * @returns The user or undefined if no user with the given username was found
 */
function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

/**
 * Creates a new user
 * @param {string} username The username of the new user
 * @param {string} password The password of the new user
 * @returns The newly created user
 */
async function createOneUser(username, password) {
  const auth = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: getNextId(),
    username,
    password: hashedPassword,
    score: 1,
    money: 1,
  };

  auth.push(createdUser);

  serialize(jsonDbPath, auth);

  return createdUser;
}

function createUserCats(username) {
  const cats = parse(jsonDbPathCat, defaultCats);
  const createdUserCats = {
    username,
    state: defaultCatState,
  };
  cats.push(createdUserCats);
  serialize(jsonDbPathCat, cats);
}

function createUserCoffees(username) {
  const coffees = parse(jsonDbPathCoffee, defaultCoffees);
  const createdUserCoffees = {
    username,
    state: defaultCoffeeState,
  };
  coffees.push(createdUserCoffees);
  serialize(jsonDbPathCoffee, coffees);
}

/**
 * Generates the next ID for a new user
 * @returns The next ID for a new user
 */
function getNextId() {
  const auth = parse(jsonDbPath, defaultUsers);
  const lastIndex = auth?.length !== 0 ? auth.length - 1 : undefined;
  if (lastIndex === undefined) return 1;
  const lastId = auth[lastIndex]?.id;
  return lastId + 1;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
};
