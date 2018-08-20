const mongoose = require('mongoose');
//const Store = mongoose.model('Store'); // store schema 
//const multer = require('multer');
//const jimp = require('jimp');
//const uuidv4 = require('uuid/v4');

exports.loginForm = (req, res) => {
	res.render( 'login', { title: 'Login'});
};