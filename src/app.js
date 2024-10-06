const express = require("express");
const { applyMiddleware } = require("./middleware");
const router = require("./routes");
const { errors } = require("./utils");
const app = express();
// app level middleware
applyMiddleware(app);

// routes
app.use(router);
app.get((_req, res) => {
  res.send('Server is running...')
})
// error handler
app.use((_req, _res, next) => {
  const error = errors.notFound('Not found');
  next(error);
})
app.use((err, req, res, next) => {
  if (err) {
      res.status(400).json({ error: err.message });
  } else {
      next();
  }
})
module.exports = app;