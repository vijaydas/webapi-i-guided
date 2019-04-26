const express = require('express');

// similar to: import db from './data/db';
const db = require('./data/db.js');

const server = express();

// Middleware
server.use(express.json()); // teaches express how to parse JSON from the request body

// Endpoints

// introduce `routing` and explain how requests are routed to the correct
// `request handler function` based on the URL and HTTP verb on the request.
// Explain what `req` and `res` are.
server.get('/', (req, res) => {
  // name is not important (could be request, response), position is.
  res.send('Hello World!');
  // .send() is a helper method that is part of the response object
});

server.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

server.get('/hubs', (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.post('/hubs', (req, res) => {
  const hubInfo = req.body;

  db.hubs
    .add(hubInfo)
    .then(hub => {
      res.status(201).json({ success: true, hub });
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  db.hubs
    .remove(id)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.hubs
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({
          success: false,
          message: 'I cannot find the hub you are looking for',
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.get('/hubs/:id', (req, res) => {
  db.hubs
    .findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json({
          success: true,
          hub,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'We cannot find the hub you are looking for',
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
