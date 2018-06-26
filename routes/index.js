const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')

// Do work here
//router.get('/', (req, res) => {
//  res.send('Hey! It works!');
//  res.render('hello');
//});

router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);

router.get('/hello/:name/:age', (req, res) => {
  res.send(req.params);
});

module.exports = router;
