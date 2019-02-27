require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();
const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\nServer listening on port ${port}\n`);
})