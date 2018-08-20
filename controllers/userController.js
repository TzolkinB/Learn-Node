const mongoose = require('mongoose');
//const Store = mongoose.model('Store'); // store schema 
//const multer = require('multer');
//const jimp = require('jimp');
//const uuidv4 = require('uuid/v4');

exports.loginForm = (req, res) => {
	res.render( 'login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
	res.render( 'register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => { //validateRegister middleware
	req.sanitizeBody('name'); //sanitizeBody comes from "expressValidator" app.js
	req.checkBody('name', 'You must enter a name').notEmpty();
	req.checkBody('email', 'Enter valid email').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Password cannot be blank').notEmpty();
	req.checkBody('password-confirm', 'Confirm password cannot be blank').notEmpty();
	req.checkBody('password-confirm', 'You\'re password do not match').equals(req.body.password);

	const errors = req.validationErrors();
	if(errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
		return;
	}
	next(); // when no errors found
};