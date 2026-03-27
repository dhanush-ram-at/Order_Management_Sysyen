const express = require("express");

const jsonParser       = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

module.exports = { jsonParser, urlencodedParser };