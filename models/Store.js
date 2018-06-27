const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true, //removes whitespace
		required: 'Please enter a store name'
	},
	slug: String,
	description: {
		type: String,
		trim: true
	},
	tags: [String] //tags will be an array of strings
});

storeSchema.pre('save', function(next) { //before saving a store, give it this.name, only run if name changes
	if(!this.isModified('name')) {
		next(); //skip it
		return;
	}
	this.slug = slug(this.name);
	next();
})

module.exports = mongoose.model('Store', storeSchema);