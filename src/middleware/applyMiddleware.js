const express = require("express");
const cors = require("cors");
const applyMiddleWare = (app) => {
    app.use(express.json());
    app.use(cors());
};

module.exports = applyMiddleWare;