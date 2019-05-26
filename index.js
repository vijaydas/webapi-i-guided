// step one: add express
// step two: define server as express

const express = require("express");

// express = lightweight
// routers
// middleware -> allows us to expand and customize
// express is a function that returns a server object

const server = express();

// set up endpoints
// we want to make something available to a request:

server.get('/', (req, res) => {
    res.send(`<h2>Hello World</h2>`);
});



// listening
// set up as server method called listen
// syntax for listen: server.listen(port, () => {})
// listening should be the last thing the server 

server.listen(9090, () => {
  console.log("listening on port 9090");
});


