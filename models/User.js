const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('password-local-mongoose');

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true, //saves in db as lowercase
		trim: true, //removes whitespace
		validate: [validator.isEmail, 'Invalid Email Address'],
		required: 'Please enter an email address'
	},
	name: {
		type: String,
		required: 'Please enter a name',
		trim: true
	}
});

//password are stores as a hash, not actual password 
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);