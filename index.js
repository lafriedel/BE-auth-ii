require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();
const db = knex(knexConfig.development);

const secret =
  process.env.SECRET || "peel bananas from the bottom to reduce stringing";

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Sanity check!");
});

server.post("/api/register", (req, res) => {
  let newUser = req.body;

  if (newUser) {
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;
    console.log(newUser);

    db("users")
      .insert(newUser)
      .then(userId => {
        const [id] = userId;
        console.log(id);
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

server.post("/api/login", (req, res) => {});

server.get("/api/users", (req, res) => {
  db("users")
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error retrieving the data." });
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\nServer listening on port ${port}\n`);
});
