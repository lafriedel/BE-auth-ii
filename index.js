require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();
const dbEnv = process.env.DB_ENV || "development";
const knexConfig = require("./knexfile")[dbEnv];
const db = knex(knexConfig);

const secret =
  process.env.SECRET || "peel bananas from the bottom to reduce stringing";

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send("Sanity check!");
});

server.post("/api/register", (req, res) => {
  let newUser = req.body;

  if (newUser) {
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    db("users")
      .insert(newUser)
      .then(userId => {
        const [id] = userId;
        db("users")
          .where("id", id)
          .first()
          .then(user => {
            res.status(201).json(user);
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "There was an error registering the user." });
      });
  } else {
    res.status(404).json({ error: "Provide a username and password." });
  }
});

server.post("/api/login", (req, res) => {
  let { username, password } = req.body;

  if (username && password) {
    db("users")
      .where("username", username)
      .first()
      .then(user => {
        const { username, department } = user;
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ user: {username, department}, token });
        } else {
          res.status(401).json({ error: "You shall not pass!" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error logging in." });
      });
  } else {
    res.status(404).json({ error: "Provide a username and password." });
  }
});

server.get("/api/users", authorize, (req, res) => {

  db("users")
    .select("users.id", "users.username", "users.department")
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error retrieving the data." });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1 hour"
  };

  return jwt.sign(payload, secret, options);
}

function authorize(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "You shall not pass!" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: "You shall not pass!" });
  }
}

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\nServer listening on port ${port}\n`);
});
