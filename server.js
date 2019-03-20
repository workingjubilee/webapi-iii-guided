const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function bouncer(req, res, next) {
  res.status(404).json("Get out!")
}

function teamNamer(req, res, next) {
  req.team = 'Web XVII';
  next();
}

function gandalf(req, res, next) {
  if (Date.now() % 3 === 0) {
    res.status(403).json("You shall not pass!");
  } else {
    next();
  }
}

server.use(express.json());
server.use(helmet());
server.use(teamNamer);
server.use(gandalf);
// server.use(bouncer);

function restricted(req, res, next) {
  const password = req.headers.password;

  if (password === 'mellon') {
    next()
  } else {
    res.status(401).json('You cannot pass! The dark fire will not avail you, flame of Udûn!')
  }

}


server.use('/api/hubs', hubsRouter);

server.get('/', restricted, (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
