const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
//router.get('/', (req, res) => {
//  res.send('Hey! It works!');
//  res.render('hello');
//});

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add/:id', catchErrors(storeController.updateStore));
router.post('/add', catchErrors(storeController.createStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

//router.get('/hello/:name/:age', (req, res) => {
//  res.send(req.params);
//});

module.exports = router;
