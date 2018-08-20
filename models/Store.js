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
	tags: [String],  //tags will be an array of strings
	created: {
		type: Date,
		default: Date.now
	},
	location: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [{
			type: Number,
			required: 'Coordinates must be supplied'
		}],
		address: {
			type: String,
			required: 'You must supply an address'
		}
	},
	photo: String
});

storeSchema.pre('save', async function(next) { //before saving a store, give it this.name, only run if name changes
	if(!this.isModified('name')) {
		next(); //skip it
		return;
	}
	this.slug = slug(this.name);
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
	const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
	if(storesWithSlug.length) {
		this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
	}
	next();
})

storeSchema.statics.getTagsList = function() {
	return this.aggregate([
		{ $unwind: '$tags' },
		{ $group: {_id: '$tags', count: { $sum: 1} }},
		{ $sort: { count: -1 }}
	]);
}

module.exports = mongoose.model('Store', storeSchema);