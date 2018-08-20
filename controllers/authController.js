const passport = require('passport');

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Login failed.',
	successRedirect: '/',
	successFlash: 'You\'re now logged in!'
});