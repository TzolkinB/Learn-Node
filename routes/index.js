const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.send('Hey! It works!');
});

router.get('/hello/:name/:age', (req, res) => {
  res.send(req.params);
});

module.exports = router;
