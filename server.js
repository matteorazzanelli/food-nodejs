// create express instance
const express = require('express');
const app = express();

// load database configuration
let dbConfig = require('./config').dbConfig;

// load routes
const routes = require('./routes');
app.use(routes);

// start listen to port 3000
const server = app.listen(3000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log("Example app listening at "+host+":"+port)
})