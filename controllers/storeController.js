const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // store schema 
const multer = require('multer');
const jimp = require('jimp');
const uuidv4 = require('uuid/v4');

//don't want to same image file, but save resized version
const multerOptions = {
	storage: multer.memoryStorage(), //store in memory
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if(isPhoto) {
			next(null, true); //callback
		} else {
			next({ message: 'That filetype is not accepted.'}, false);
		}
	}
};

exports.myMiddleware = (req, res, next) => {
	req.name = 'Kim';
	next();
};

exports.homePage = (req, res) => {
	console.log(req.name); //logs 'Kim' in the terminal
	res.render('index');
};

exports.addStore = (req, res) => {
	//res.send('it works'); //quickly check to see that route works
	res.render('editStore', {title: 'Add Store'});
};

exports.editStore = async (req, res) => {
	const store = await Store.findOne({ _id: req.params.id });
	//res.json(req.params.id) //to make sure json store data is correct
	res.render('editStore', {title: 'Edit Store', store });
};

exports.updateStore = async (req, res) => {
	// set location data to be a point
	req.body.location.type = 'Point';
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {new:true, runValidators: true}).exec();
	req.flash('success', `Successfully updated ${store.name} <a href="/stores/${store.slug}">View Store</a>`);
	res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
	// Query the db for list of all stores
	const stores = await Store.find();
	res.render('stores', {title: 'Stores', stores });
};

exports.getStoreBySlug = async (req, res, next) => {
	//res.json(req.params);
	const store = await Store.findOne({ slug: req.params.slug });
	if(!store) return next();
	res.render('store', {title: store.name, store});
};

exports.getStoresByTag = async (req, res) => {
	const tags = await Store.getTagsList();
	const tag = req.params.tag;
	res.render('tag', {tags, title: 'Tags', tag });
}

exports.upload = multer(multerOptions).single('photo'); //looking for single photo input

exports.resize = async (req, res, next) => {
	if(!req.file) {
		next(); //if no new file to resize, skip to next middleware which is createStore
		return;
	}
	const extension = req.file.mimetype.split('/')[1]; //get extension from mimetype
	req.body.photo = `${uuidv4()}.${extension}`;
	//now resize
	//read from buffer bc img stored in memory prior to resizing
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./public/uploads/${req.body.photo}`);
	next();
}

exports.createStore = async (req, res) => {
	console.log(req.body);
	const store = await (new Store(req.body)).save();
	//.save(); //fires off connection to mongoDB database and eii//ther returns store info or error message
	req.flash('success', `Successfully created ${store.name}. Want to leave a review?`);
	res.redirect(`/store/${store.slug}`);
};
		/* using a promise from mongoose.Promise
		store
		.save() //fires off connection to mongoDB database and either returns store info or error message
		.then(store => {
			res.json(store);
		})
		.catch(err => {
			throw Error(err);
		})
		*/

		/* using a callback (before async/await/promise were available)
		store.save(function(err, store) {
			if(!err){
				console.log('it worked!');
				res.redirect('/');
			}
		});
		*/